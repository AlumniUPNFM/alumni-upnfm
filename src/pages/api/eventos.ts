import { supabase } from "@/lib/supabase-client";
import { ApiResponse } from "@/types/api-response";
import { NextApiRequest, NextApiResponse } from "next";
import { Evento } from "@/services/eventos.types";

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
  const { id, name, fecha } = body as Evento;

  // Validar los datos
  if (!name || !fecha) {
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
      .from("eventos")
      .update({
        name,
        fecha,
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

  const { error: insertError } = await supabase.from("eventos").insert({
    name,
    fecha,
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
  const { data: eventos, error } = await supabase.from("eventos").select("*");

  if (error) {
    return res.status(500).json({
      isSuccess: false,
      data: null,
      message: error?.message || "Ocurrió un error inesperado.",
    });
  }

  const customRes: ApiResponse<Evento[]> = {
    isSuccess: true,
    data: eventos,
    message: "Eventos obtenidas correctamente.",
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
      message: "El ID de la evento es obligatorio.",
    });
  }

  const { error } = await supabase.from("eventos").delete().eq("id", id);

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
    message: "evento eliminada correctamente.",
  };

  return res.status(200).json(customRes);
}
