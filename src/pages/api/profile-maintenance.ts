import { supabase } from "@/lib/supabase-client";
import { ApiResponse } from "@/types/api-response";
import { decode } from "base64-arraybuffer";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    return PUT(req, res);
  }

  return res.status(405).json({ message: "Method not allowed" });
}

async function PUT(req: NextApiRequest, res: NextApiResponse) {
  const body = await req.body;
  const {
    dni,
    names,
    last_names,
    email,
    phone,
    address,
    birthdate,
    degree_id,
    avatar_url,
    new_avatar_base64,
  } = body;

  // Validar los datos
  if (!dni || !names || !last_names || !degree_id) {
    return res.status(400).json({
      isSuccess: false,
      data: null,
      message: "Todos los campos son obligatorios.",
    });
  }

  // Actualizar el perfil del usuario en Supabase
  const { error } = await supabase
    .from("users")
    .update({
      names,
      last_names,
      email,
      phone,
      address,
      birthdate,
      avatar_url,
      degree_id,
    })
    .eq("dni", dni);

  if (error) {
    return res.status(500).json({
      isSuccess: false,
      data: null,
      message: error?.message || "Ocurrió un error inesperado.",
    });
  }

  // Actualizar la imagen de perfil
  // Subir la nueva imagen de perfil
  if (new_avatar_base64) {
    const [, base64] = new_avatar_base64.split(",");
    const ArrayBufferImage = decode(base64);
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("UPN")
      .upload(`${dni}.jpeg`, ArrayBufferImage, {
        contentType: "image/jpeg",
        upsert: true,
      });

    console.log({ uploadData });

    if (uploadError) {
      return res.status(500).json({
        isSuccess: false,
        data: null,
        message: uploadError?.message || "Ocurrió un error inesperado.",
      });
    }

    // Actualizar la URL de la imagen de perfil
    const { error: updateError } = await supabase
      .from("users")
      .update({ avatar_url: uploadData.fullPath })
      .eq("dni", dni);

    if (updateError) {
      return res.status(500).json({
        isSuccess: false,
        data: null,
        message: updateError?.message || "Ocurrió un error inesperado.",
      });
    }
  }

  const customRes: ApiResponse<boolean> = {
    isSuccess: true,
    data: true,
    message: "Perfil actualizado correctamente.",
  };

  return res.status(200).json(customRes);
}
