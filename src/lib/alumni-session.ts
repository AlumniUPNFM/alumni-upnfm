"use client"; // Necesario para usar hooks en componentes de Next.js

import { DATA_KEY_USER } from "@/config/constants";
import { User } from "@/types/types";

export const getDataFromSessionStorage = (): User | null => {
  const data = sessionStorage.getItem(DATA_KEY_USER);

  if (!data) {
    return null;
  }

  return JSON.parse(data);
};

export const setDataToSessionStorage = (data: User): void => {
  sessionStorage.setItem(DATA_KEY_USER, JSON.stringify(data));
};

export const removeDataFromSessionStorage = (): void => {
  sessionStorage.removeItem(DATA_KEY_USER);
};
