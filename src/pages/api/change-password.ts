import { supabase } from "@/lib/supabase-client";
import { ApiResponse } from "@/types/api-response";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    return POST(req, res);
  }

  return res.status(405).json({ message: "Method not allowed" });
}

async function POST(req: NextApiRequest, res: NextApiResponse) {
  const body = await req.body;
  const { dni, current_password, new_password } = body;

  // Validar los datos
  if (!dni || !current_password || !new_password) {
    return res.status(400).json({
      isSuccess: false,
      data: null,
      message: "Todos los campos son obligatorios.",
    });
  }

  // Cambiar la contraseña usando el procedimiento almacenado
  const { error } = await supabase.rpc("change_password", {
    p_props: { dni, current_password, new_password },
  });

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
    message: "Contraseña actualizada correctamente.",
  };

  return res.status(200).json(customRes);
} 