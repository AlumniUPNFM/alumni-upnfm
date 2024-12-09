import { supabase } from "@/lib/supabase-client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return GET(req, res);
  }

  return res.status(405).json({ message: "Method not allowed" });
}

async function GET(req: NextApiRequest, res: NextApiResponse) {
  const page = req.query.page || "0";
  const limit = req.query.limit || "25";
  const dni = req.query.dni;

  const { error, data } = await supabase
    .from("users")
    .select("*, degree:degrees(*)")
    .order("created_at", { ascending: false })
    .range(Number(page) - 1, Number(page) + Number(limit))
    // si se envia dni se filtra por dni
    .eq(dni ? "dni" : "", dni);

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  return res.status(200).json({ message: "Usuarios obtenidos", data });
}
