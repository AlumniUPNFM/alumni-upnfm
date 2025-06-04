import { supabase } from "@/lib/supabase-client";
import { type ApiResponse } from "@/types/api-response";
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

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const body = await req.body;
  console.log({ body });
  const { dni, names, last_names, email, password, degree_id } = body;

  // Validar los datos
  if (!dni || !names || !last_names || !email || !password || !degree_id) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios." });
  }

  // Validar formato de email
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res
      .status(400)
      .json({ message: "Por favor, ingresa un correo electrónico válido." });
  }

  // Crear el usuario en Supabase
  const { error } = await supabase.rpc("register", {
    p_props: { dni, names, last_names, email, password, degree_id },
  });

  const customRes: ApiResponse<boolean> = {
    isSuccess: Boolean(error),
    data: Boolean(error),
    message: error?.message || "Registro exitoso.",
  };

  if (error) {
    return res.status(500).json(customRes);
  }

  return res.status(200).json(customRes);
}
