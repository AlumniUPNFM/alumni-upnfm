// useTrabajos.ts

import { useState, useEffect } from "react";
import { GetTrabajos } from "@/services/trabajos";
import { Trabajo } from "@/services/trabajos.types";

interface UseTrabajosHook {
  trabajos: Trabajo[];
  loading: boolean;
  error: string | null;
  refreshTrabajos: () => Promise<void>; // Añadimos esta función
}

// Definir el hook personalizado
export const useTrabajos = (): UseTrabajosHook => {
  const [trabajos, setTrabajos] = useState<Trabajo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Definimos la función fetchTrabajos fuera del useEffect
  const fetchTrabajos = async (): Promise<void> => {
    setLoading(true);

    try {
      const { data } = await GetTrabajos();

      setTrabajos(data);

      setLoading(false);
      setError(null);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_err: unknown) {
      setError("Error al obtener los trabajos");
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchTrabajos();
  }, []);

  // Devolver los valores del estado y la función refreshTrabajos
  return { trabajos, loading, error, refreshTrabajos: fetchTrabajos };
};
