import { supabase } from "@/lib/supabase-client";
import { ApiResponse } from "@/types/api-response";
import { NextApiRequest, NextApiResponse } from "next";
import { Trabajo } from "@/services/trabajos.types";

type TrabajoPost = Trabajo;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return GET(req, res);
  }

  if (req.method === "POST") {
    return POST(req, res);
  }

  if (req.method === "DELETE") {
    return DELETE(req, res);
  }

  return res.status(405).json({ message: "Method not allowed" });
}

async function POST(req: NextApiRequest, res: NextApiResponse) {
  const body = await req.body;
  const {
    id,
    puesto,
    degree_id,
    empresa_id,
    salario,
    ubicacion,
    tipo_oferta,
    jornada,
    contrato,
    experiencia_laboral,
    idiomas,
    description,
  } = body as TrabajoPost;

  // Validar los datos
  if (
    !puesto ||
    !degree_id ||
    !empresa_id ||
    !salario ||
    !ubicacion ||
    !tipo_oferta ||
    !jornada ||
    !contrato ||
    experiencia_laboral < 0 ||
    !idiomas ||
    !description
  ) {
    return res.status(400).json({
      isSuccess: false,
      data: null,
      message: "Todos los campos son obligatorios.",
    });
  }

  const shouldUpdate = (id || 0) > 0;

  // Actualiza la empresa en la base de datos
  if (shouldUpdate) {
    const { error: updateError } = await supabase
      .from("trabajos")
      .update({
        puesto,
        degree_id,
        empresa_id,
        salario,
        ubicacion,
        tipo_oferta,
        jornada,
        contrato,
        experiencia_laboral,
        idiomas,
        description,
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
      message: "Trabajo actualizada correctamente.",
    };

    return res.status(200).json(customRes);
  }

  const { error: insertError } = await supabase.from("trabajos").insert({
    puesto,
    degree_id,
    empresa_id,
    salario,
    ubicacion,
    tipo_oferta,
    jornada,
    contrato,
    experiencia_laboral,
    idiomas,
    description,
  });

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
    message: "Trabajo creada correctamente.",
  };

  return res.status(200).json(customRes);
}

export async function GET(_req: NextApiRequest, res: NextApiResponse) {
  const { data: trabajos, error } = await supabase
    .from("trabajos")
    .select("*, degree: degrees(*), empresa: empresas(*)");

  if (error) {
    return res.status(500).json({
      isSuccess: false,
      data: null,
      message: error?.message || "Ocurrió un error inesperado.",
    });
  }

  const customRes: ApiResponse<Trabajo[]> = {
    isSuccess: true,
    data: trabajos,
    message: "trabajos obtenidas correctamente.",
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

  const { error } = await supabase.from("trabajos").delete().eq("id", id);

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
    message: "Trabajo eliminada correctamente.",
  };

  return res.status(200).json(customRes);
}
