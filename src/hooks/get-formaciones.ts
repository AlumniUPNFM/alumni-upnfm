// useEmpresas.ts

"use client"; // Necesario para usar hooks en componentes de Next.js

import { useState, useEffect } from "react";

import { Formacion } from "@/services/formaciones.types";
import { GetFormaciones } from "@/services/formaciones";

interface UseFormacionesHook {
  formaciones: Formacion[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>; // Añadimos esta función
}

// Definir el hook personalizado
export const useFormaciones = (): UseFormacionesHook => {
  const [formaciones, setFormaciones] = useState<Formacion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Definimos la función fetchEmpresas fuera del useEffect
  const fetchData = async (): Promise<void> => {
    setLoading(true);

    try {
      const { data } = await GetFormaciones();

      setFormaciones(data);
      setError(null);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_err: unknown) {
      setError("Error al obtener la formaciones");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchData();
  }, []);

  // Devolver los valores del estado y la función refreshEmpresas
  return {
    formaciones,
    loading,
    error,
    refresh: fetchData,
  };
};
