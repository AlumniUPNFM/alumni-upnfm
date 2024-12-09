// useEmpresas.ts

"use client"; // Necesario para usar hooks en componentes de Next.js

import { useState, useEffect } from "react";

import { TipoFormacion } from "@/services/tipos-formaciones.types";
import { GetTiposFormaciones } from "@/services/tipos-formaciones";

interface UseTiposFormacionesHook {
  tiposFormaciones: TipoFormacion[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>; // Añadimos esta función
}

// Definir el hook personalizado
export const useTiposFormaciones = (): UseTiposFormacionesHook => {
  const [empresas, setEmpresas] = useState<TipoFormacion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Definimos la función fetchEmpresas fuera del useEffect
  const fetchData = async (): Promise<void> => {
    setLoading(true);

    try {
      const { data } = await GetTiposFormaciones();

      setEmpresas(data);
      setError(null);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_err: unknown) {
      setError("Error al obtener los tipos de formaciones");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchData();
  }, []);

  // Devolver los valores del estado y la función refreshEmpresas
  return {
    tiposFormaciones: empresas,
    loading,
    error,
    refresh: fetchData,
  };
};
