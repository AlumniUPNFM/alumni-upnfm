// useEmpresas.ts

"use client"; // Necesario para usar hooks en componentes de Next.js

import { useState, useEffect } from "react";

import { GetEmpresas } from "@/services/empresas";
import { Empresa } from "@/services/empresas.types";

interface UseEmpresasHook {
  empresas: Empresa[];
  loading: boolean;
  error: string | null;
  refreshEmpresas: () => Promise<void>; // Añadimos esta función
}

// Definir el hook personalizado
export const useEmpresas = (): UseEmpresasHook => {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Definimos la función fetchEmpresas fuera del useEffect
  const fetchEmpresas = async (): Promise<void> => {
    setLoading(true);

    try {
      const { data } = await GetEmpresas();

      setEmpresas(data);
      setError(null);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_err: unknown) {
      setError("Error al obtener las empresas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchEmpresas();
  }, []);

  // Devolver los valores del estado y la función refreshEmpresas
  return { empresas, loading, error, refreshEmpresas: fetchEmpresas };
};
