"use client"; // Necesario para usar hooks en componentes de Next.js

import { useState, useEffect } from "react";

import { Degree } from "@/services/degrees.types";
import { GetDegrees } from "@/services/degrees";

interface UseDegreesHook {
  degrees: Degree[];
  loading: boolean;
  error: string | null;
}

// Definir el hook personalizado
export const useDegrees = (): UseDegreesHook => {
  const [degrees, setDegrees] = useState<Degree[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStores = async (): Promise<void> => {
      setLoading(true);

      try {
        const { data } = await GetDegrees();

        setDegrees(data);

        setLoading(false);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_err: unknown) {
        setError("Error fetching product");
        setLoading(false);
      }
    };

    void fetchStores();
  }, []);

  // Devolver los valores del estado
  return { degrees, loading, error };
};
