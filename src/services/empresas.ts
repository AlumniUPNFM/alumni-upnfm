"use client"; // Necesario para usar hooks en componentes de Next.js

import { ApiResponse } from "@/types/api-response";
import { Empresa } from "./empresas.types";

export const GetEmpresas = async (): Promise<ApiResponse<Empresa[]>> => {
  const response = await fetch("/api/empresas");
  const data = (await response.json()) as ApiResponse<Empresa[]>;

  return {
    isSuccess: response.ok,
    data: data.data,
    message: response.statusText,
  };
};

export const SaveEmpresa = async (
  empresa: Empresa
): Promise<ApiResponse<boolean>> => {
  const response = await fetch("/api/empresas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(empresa),
  });

  const data = (await response.json()) as ApiResponse<boolean>;

  return {
    isSuccess: response.ok,
    data: data.data,
    message: response.statusText,
  };
};

export const DeleteEmpresa = async (
  id: number
): Promise<ApiResponse<boolean>> => {
  const deleteParams = new URLSearchParams();
  deleteParams.append("id", id.toString());

  const response = await fetch(`/api/empresas?${deleteParams.toString()}`, {
    method: "DELETE",
  });

  const data = (await response.json()) as ApiResponse<boolean>;

  return {
    isSuccess: response.ok,
    data: data.data,
    message: response.statusText,
  };
};
