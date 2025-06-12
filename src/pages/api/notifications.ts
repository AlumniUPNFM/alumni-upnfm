import { supabase } from "@/lib/supabase-client";
import { ApiResponse } from "@/types/api-response";
import { NotificationResponse } from "@/services/notifications.types";
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
  // Get notifications from the last 3 months
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  const { data: notifications, error } = await supabase
    .from("notifications")
    .select("*")
    .gte("created_at", threeMonthsAgo.toISOString())
    .order("created_at", { ascending: false });

  if (error) {
    return res.status(500).json({
      isSuccess: false,
      data: null,
      message: error?.message || "Ocurrió un error inesperado.",
    });
  }

  const customRes: ApiResponse<NotificationResponse> = {
    isSuccess: true,
    data: {
      notifications,
      unreadCount: notifications.length,
    },
    message: "Notificaciones obtenidas correctamente.",
  };

  return res.status(200).json(customRes);
} 