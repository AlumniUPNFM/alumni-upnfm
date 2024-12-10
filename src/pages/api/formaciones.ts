import { supabase } from "@/lib/supabase-client";
import { ApiResponse } from "@/types/api-response";
import { NextApiRequest, NextApiResponse } from "next";
import { Empresa } from "@/services/empresas.types";
import { Formacion } from "@/services/formaciones.types";

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
  const {
    id,
    degree_id,
    modalidad,
    capacidad,
    duracion,
    name,
    descripcion,
    fecha,
    id_tipo,
    lugar,
    facultad,
    institucion,
    instructor,
    url,
  } = body as Formacion;

  // Validar los datos
  if (
    !degree_id ||
    !modalidad ||
    !lugar ||
    !capacidad ||
    !duracion ||
    !name ||
    !descripcion ||
    !fecha ||
    !id_tipo ||
    !url
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
      .from("formaciones")
      .update({
        degree_id,
        modalidad,
        capacidad,
        duracion,
        name,
        descripcion,
        fecha,
        id_tipo,
        lugar,
        facultad,
        institucion,
        instructor,
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
      message: "Formación actualizada correctamente.",
    };

    return res.status(200).json(customRes);
  }

  const { error: insertError } = await supabase.from("formaciones").insert({
    degree_id,
    modalidad,
    capacidad,
    duracion,
    name,
    descripcion,
    fecha,
    id_tipo,
    lugar,
    facultad,
    institucion,
    instructor,
    url,
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
    message: "Formación creada correctamente.",
  };

  return res.status(200).json(customRes);
}

export async function GET(res: NextApiResponse) {
  const { data: formaciones, error } = await supabase
    .from("formaciones")
    .select("*, tipo: tipos_formaciones(*), degree: degrees(*)");

  if (error) {
    return res.status(500).json({
      isSuccess: false,
      data: null,
      message: error?.message || "Ocurrió un error inesperado.",
    });
  }

  const customRes: ApiResponse<Empresa[]> = {
    isSuccess: true,
    data: formaciones,
    message: "Formaciones obtenidas correctamente.",
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
      message: "El ID de la formacion es obligatorio.",
    });
  }

  const { error } = await supabase.from("formaciones").delete().eq("id", id);

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
    message: "formacion eliminada correctamente.",
  };

  return res.status(200).json(customRes);
}
