"use client"; // Necesario para usar hooks en componentes de Next.js

import { ApiResponse } from "@/types/api-response";
import { Trabajo } from "./trabajos.types";

export const GetTrabajos = async (): Promise<ApiResponse<Trabajo[]>> => {
  const response = await fetch("/api/trabajos");
  const data = (await response.json()) as ApiResponse<Trabajo[]>;

  return {
    isSuccess: response.ok,
    data: data.data,
    message: response.statusText,
  };
};

export const GetTrabajoById = async (
  id: number
): Promise<ApiResponse<Trabajo>> => {
  const response = await fetch(`/api/trabajos/${id}`);
  const data = (await response.json()) as ApiResponse<Trabajo>;

  return {
    isSuccess: response.ok,
    data: data.data,
    message: response.statusText,
  };
};

export const SaveTrabajo = async (
  trabajo: Trabajo
): Promise<ApiResponse<boolean>> => {
  const response = await fetch("/api/trabajos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(trabajo),
  });

  const data = (await response.json()) as ApiResponse<boolean>;

  return {
    isSuccess: response.ok,
    data: data.data,
    message: response.statusText,
  };
};

export const DeleteTrabajo = async (
  id: number
): Promise<ApiResponse<boolean>> => {
  const deleteParams = new URLSearchParams();
  deleteParams.append("id", id.toString());

  const response = await fetch(`/api/trabajos?${deleteParams.toString()}`, {
    method: "DELETE",
  });

  const data = (await response.json()) as ApiResponse<boolean>;

  return {
    isSuccess: response.ok,
    data: data.data,
    message: response.statusText,
  };
};
