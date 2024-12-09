import { supabase } from "@/lib/supabase-client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return GET(res);
  }

  return res.status(405).json({ message: "Method not allowed" });
}

async function GET(res: NextApiResponse) {
  const { error, data } = await supabase.from("tipos_formaciones").select("*");

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  return res.status(200).json({ message: "Formaciones obtenidas", data });
}
