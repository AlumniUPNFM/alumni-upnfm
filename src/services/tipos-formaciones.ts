"use client"; // Necesario para usar hooks en componentes de Next.js

import { ApiResponse } from "@/types/api-response";
import { TipoFormacion } from "./tipos-formaciones.types";

export const GetTiposFormaciones = async (): Promise<
  ApiResponse<TipoFormacion[]>
> => {
  const response = await fetch("/api/tipos-formaciones");
  const data = (await response.json()) as ApiResponse<TipoFormacion[]>;

  return {
    isSuccess: response.ok,
    data: data.data,
    message: response.statusText,
  };
};
