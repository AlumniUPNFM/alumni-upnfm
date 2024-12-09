"use client"; // Necesario para usar hooks en componentes de Next.js

import { ApiResponse } from "@/types/api-response";
import { Degree } from "./degrees.types";

export const GetDegrees = async (): Promise<ApiResponse<Degree[]>> => {
  const response = await fetch("/api/degrees");
  const data = (await response.json()) as ApiResponse<Degree[]>;

  return {
    isSuccess: response.ok,
    data: data.data,
    message: response.statusText,
  };
};
