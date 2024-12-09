import { supabase } from "@/lib/supabase-client";
import { ApiResponse } from "@/types/api-response";
import { decode } from "base64-arraybuffer";
import { v4 as uuid } from "uuid";
import { NextApiRequest, NextApiResponse } from "next";
import { Empresa } from "@/services/empresas.types";

interface EmpreesaPost {
  id?: number;
  name: string;
  image_url: string;
  image_base64: string;
  color_rgb: string;
  text_color: string;
  url: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    return POST(req, res);
  }

  if (req.method === "GET") {
    return GET(res);
  }

  if (req.method === "DELETE") {
    return DELETE(req, res);
  }

  return res.status(405).json({ message: "Method not allowed" });
}

async function POST(req: NextApiRequest, res: NextApiResponse) {
  const body = await req.body;
  const { name, image_url, image_base64, color_rgb, text_color, url, id } =
    body as EmpreesaPost;

  // Validar los datos
  if (
    !name ||
    (!image_url && !image_base64) ||
    !color_rgb ||
    !text_color ||
    !url
  ) {
    return res.status(200).json({
      isSuccess: false,
      data: null,
      message: "Todos los campos son obligatorios.",
    });
  }

  let imageUrl = image_url;

  // Subir la imagen de la empresa
  if (image_base64) {
    const [, base64] = image_base64.split(",");
    const ArrayBufferImage = decode(base64);
    const randomUUID = uuid();

    const { data, error } = await supabase.storage
      .from("UPN")
      .upload(`${randomUUID}.jpeg`, ArrayBufferImage, {
        contentType: "image/jpeg",
        upsert: true,
      });

    imageUrl = data?.fullPath || "";

    if (error || !data) {
      return res.status(500).json({
        isSuccess: false,
        data: null,
        message:
          error?.message || "Ocurrió un error inesperado al subir la imagen.",
      });
    }
  }

  const shouldUpdate = (id || 0) > 0;

  // Actualiza la empresa en la base de datos
  if (shouldUpdate) {
    const { error: updateError } = await supabase
      .from("empresas")
      .update({
        id,
        name,
        image_url: imageUrl,
        color_rgb,
        text_color,
        url,
      })
      .eq("id", id);

    if (updateError) {
      return res.status(500).json({
        isSuccess: false,
        data: null,
        message: updateError?.message || "Ocurrió un error inesperado.",
      });
    }

    const customRes: ApiResponse<boolean> = {
      isSuccess: true,
      data: true,
      message: "Empresa actualizada correctamente.",
    };

    return res.status(200).json(customRes);
  }

  const { error: insertError } = await supabase.from("empresas").insert([
    {
      name,
      image_url: imageUrl,
      color_rgb,
      text_color,
      url,
    },
  ]);

  if (insertError) {
    return res.status(500).json({
      isSuccess: false,
      data: null,
      message: insertError?.message || "Ocurrió un error inesperado.",
    });
  }

  const customRes: ApiResponse<boolean> = {
    isSuccess: true,
    data: true,
    message: "Empresa creada correctamente.",
  };

  return res.status(200).json(customRes);
}

export async function GET(res: NextApiResponse) {
  const { data: companies, error } = await supabase
    .from("empresas")
    .select("*, plazas: trabajos(*)");

  if (error) {
    return res.status(500).json({
      isSuccess: false,
      data: null,
      message: error?.message || "Ocurrió un error inesperado.",
    });
  }

  const customRes: ApiResponse<Empresa[]> = {
    isSuccess: true,
    data: companies,
    message: "Empresas obtenidas correctamente.",
  };

  return res.status(200).json(customRes);
}

// DELETE
export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string;

  if (!id) {
    return res.status(403).json({
      isSuccess: false,
      data: null,
      message: "El ID de la empresa es obligatorio.",
    });
  }

  const { error } = await supabase.from("empresas").delete().eq("id", id);

  if (error) {
    return res.status(500).json({
      isSuccess: false,
      data: null,
      message: error?.message || "Ocurrió un error inesperado.",
    });
  }

  const customRes: ApiResponse<boolean> = {
    isSuccess: true,
    data: true,
    message: "Empresa eliminada correctamente.",
  };

  return res.status(200).json(customRes);
}
