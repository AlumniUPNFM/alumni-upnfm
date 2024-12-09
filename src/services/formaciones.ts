"use client"; // Necesario para usar hooks en componentes de Next.js

import { ApiResponse } from "@/types/api-response";
import { Formacion } from "./formaciones.types";

export const GetFormaciones = async (): Promise<ApiResponse<Formacion[]>> => {
  const response = await fetch("/api/formaciones");
  const data = (await response.json()) as ApiResponse<Formacion[]>;

  return {
    isSuccess: response.ok,
    data: data.data,
    message: response.statusText,
  };
};

export const GetFormacionesFiltered = async (
  idTipo: number
): Promise<Formacion[]> => {
  const { data } = await GetFormaciones();

  if (!data) return [];

  return data.filter((x) => x.id_tipo === idTipo);
};

export const SaveFormacion = async (
  formacion: Formacion
): Promise<ApiResponse<boolean>> => {
  const response = await fetch("/api/formaciones", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formacion),
  });

  const data = (await response.json()) as ApiResponse<boolean>;

  return {
    isSuccess: response.ok,
    data: data.data,
    message: response.statusText,
  };
};

export const DeleteFormacion = async (
  id: number
): Promise<ApiResponse<boolean>> => {
  const deleteParams = new URLSearchParams();
  deleteParams.append("id", id.toString());

  const response = await fetch(`/api/formaciones?${deleteParams.toString()}`, {
    method: "DELETE",
  });

  const data = (await response.json()) as ApiResponse<boolean>;

  return {
    isSuccess: response.ok,
    data: data.data,
    message: response.statusText,
  };
};
