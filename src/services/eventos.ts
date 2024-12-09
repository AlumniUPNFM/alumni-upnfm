"use client"; // Necesario para usar hooks en componentes de Next.js

import { ApiResponse } from "@/types/api-response";
import { Evento } from "./eventos.types";

export const GetEventos = async (): Promise<ApiResponse<Evento[]>> => {
  const response = await fetch("/api/eventos");
  const data = (await response.json()) as ApiResponse<Evento[]>;

  return {
    isSuccess: response.ok,
    data: data.data,
    message: response.statusText,
  };
};

export const SaveEvento = async (
  evento: Evento
): Promise<ApiResponse<boolean>> => {
  const response = await fetch("/api/eventos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(evento),
  });

  const data = (await response.json()) as ApiResponse<boolean>;

  return {
    isSuccess: response.ok,
    data: data.data,
    message: response.statusText,
  };
};

export const DeleteEvento = async (
  id: number
): Promise<ApiResponse<boolean>> => {
  const deleteParams = new URLSearchParams();
  deleteParams.append("id", id.toString());

  const response = await fetch(`/api/eventos?${deleteParams.toString()}`, {
    method: "DELETE",
  });

  const data = (await response.json()) as ApiResponse<boolean>;

  return {
    isSuccess: response.ok,
    data: data.data,
    message: response.statusText,
  };
};
