"use client"; // Necesario para usar hooks en componentes de Next.js

import { ApiResponse } from "@/types/api-response";
import { User } from "@/types/types";

export const GetProfiles = async (
  page: number = 0,
  limit: number = 25
): Promise<ApiResponse<User[]>> => {
  const url = `/api/users`;

  const searchParams = new URLSearchParams();
  searchParams.append("page", page.toString());
  searchParams.append("limit", limit.toString());

  const response = await fetch(`${url}?${searchParams.toString()}`);

  const data = (await response.json()) as ApiResponse<User[]>;

  return {
    isSuccess: response.ok,
    data: data.data,
    message: response.statusText,
  };
};

export const GetProfile = async (dni: string): Promise<ApiResponse<User[]>> => {
  const url = `/api/users?dni=${dni}`;
  const response = await fetch(url);
  const data = (await response.json()) as ApiResponse<User[]>;

  return {
    isSuccess: response.ok,
    data: data.data,
    message: response.statusText,
  };
};
