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

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const body = await req.body;
  const { dni, email, password } = body;

  // Validar los datos
  if (!dni || !email || !password) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios." });
  }

  // Validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ message: "Por favor ingrese un email válido." });
  }

  // Buscar el usuario en Supabase
  const { data, error } = await supabase.rpc("login", {
    p_props: { dni, email, password },
  });

  if (error) {
    return res.status(500).json({
      isSuccess: false,
      data: null,
      message: error?.message || "Ocurrió un error inesperado.",
    });
  }

  console.log({ data });

  if (!data) {
    return res.status(400).json({
      isSuccess: false,
      data: null,
      message: "El DNI, email o contraseña son incorrectos.",
    });
  }

  // Recuperar el usuario
  const { data: user, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("dni", dni)
    .single();

  if (userError) {
    return res.status(500).json({
      isSuccess: false,
      data: null,
      message: "No se pudo recuperar el usuario.",
    });
  }

  const customRes: ApiResponse<boolean> = {
    isSuccess: true,
    data: user,
    message: "Login exitoso.",
  };

  return res.status(200).json(customRes);
}
