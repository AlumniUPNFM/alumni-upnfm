import { ApiResponse } from "@/types/api-response";
import { Notification, NotificationResponse } from "./notifications.types";

export const GetNotifications = async (): Promise<ApiResponse<NotificationResponse>> => {
  const response = await fetch("/api/notifications");
  const data = (await response.json()) as ApiResponse<NotificationResponse>;

  return {
    isSuccess: response.ok,
    data: data.data,
    message: response.statusText,
  };
};

export const MarkNotificationAsRead = async (id: number): Promise<ApiResponse<boolean>> => {
  const response = await fetch(`/api/notifications/${id}/read`, {
    method: "POST",
  });

  const data = (await response.json()) as ApiResponse<boolean>;

  return {
    isSuccess: response.ok,
    data: data.data,
    message: response.statusText,
  };
}; 