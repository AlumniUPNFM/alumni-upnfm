// useEmpresas.ts

"use client"; // Necesario para usar hooks en componentes de Next.js

import { useState, useEffect } from "react";

import { Evento } from "@/services/eventos.types";
import { GetEventos } from "@/services/eventos";

interface UseEventosHook {
  eventos: Evento[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>; // Añadimos esta función
}

// Definir el hook personalizado
export const useEventos = (): UseEventosHook => {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Definimos la función fetchEmpresas fuera del useEffect
  const fetchData = async (): Promise<void> => {
    setLoading(true);

    try {
      const { data } = await GetEventos();

      setEventos(data);
      setError(null);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_err: unknown) {
      setError("Error al obtener la eventos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchData();
  }, []);

  // Devolver los valores del estado y la función refreshEmpresas
  return {
    eventos,
    loading,
    error,
    refresh: fetchData,
  };
};
