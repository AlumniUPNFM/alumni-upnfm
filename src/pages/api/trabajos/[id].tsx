import { supabase } from "@/lib/supabase-client";
import { Trabajo } from "@/services/trabajos.types";
import { ApiResponse } from "@/types/api-response";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
  } = req;

  const idAsString = id as string;

  if (req.method === "GET") {
    return GET_ONE(idAsString, res);
  }

  return res.status(405).json({ message: "Method not allowed" });
}

async function GET_ONE(id: string, res: NextApiResponse) {
  const { data: trabajo, error } = await supabase
    .from("trabajos")
    .select("*, degree: degrees(*), empresa: empresas(*)")
    .eq("id", id)
    .single();

  console.log({ trabajo, id });

  if (error) {
    return res.status(500).json({
      isSuccess: false,
      data: null,
      message: error?.message || "Ocurrió un error inesperado.",
    });
  }

  if (!trabajo) {
    return res.status(404).json({
      isSuccess: false,
      data: null,
      message: "Trabajo no encontrada.",
    });
  }

  const customRes: ApiResponse<Trabajo> = {
    isSuccess: true,
    data: trabajo,
    message: "Trabajo obtenida correctamente.",
  };

  return res.status(200).json(customRes);
}
