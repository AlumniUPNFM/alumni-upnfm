// pages/trabajos/[id].tsx
"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Trabajo } from "@/services/trabajos.types";
import { GetTrabajoById } from "@/services/trabajos";
import Image from "next/image";
import { URL_BASE } from "@/config/constants";
import { Button } from "@/components/ui/button";

export default function TrabajoDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [trabajo, setTrabajo] = useState<Trabajo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchTrabajo = async () => {
        setLoading(true);
        try {
          const { data } = await GetTrabajoById(Number(id));
          setTrabajo(data);
          setError(null);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
          setError("Error al cargar los detalles del trabajo");
        } finally {
          setLoading(false);
        }
      };
      fetchTrabajo();
    }
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-screen">
          <p>Cargando...</p>
        </div>
      </MainLayout>
    );
  }

  if (error || !trabajo) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-screen">
          <p>{error || "Trabajo no encontrado"}</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto p-6 font-montserrat">
        <h1 className="text-3xl font-bold mb-4">{trabajo.puesto}</h1>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sección de la empresa */}
          <div className="md:w-1/3 flex-shrink-0">
            <Image
              src={`${URL_BASE}${trabajo.empresa?.image_url}`}
              alt={trabajo.empresa?.name || "Empresa"}
              width={300}
              height={300}
              className="rounded-lg object-cover"
            />
            <h2 className="text-xl font-semibold mt-4">
              {trabajo.empresa?.name}
            </h2>
            {trabajo.empresa?.url && (
              <p className="text-gray-600 mt-2">
                <a
                  href={trabajo.empresa.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Visitar sitio web
                </a>
              </p>
            )}
          </div>
          {/* Sección de detalles */}
          <div className="md:w-2/3">
            <h3 className="text-2xl font-semibold mb-4">
              Detalles del Trabajo
            </h3>
            <div className="space-y-4">
              <div>
                <strong>Carrera requerida:</strong> {trabajo.degree?.name}
              </div>
              <div>
                <strong>Salario:</strong> L {trabajo.salario}
              </div>
              <div>
                <strong>Ubicación:</strong> {trabajo.ubicacion}
              </div>
              <div>
                <strong>Tipo de oferta:</strong> {trabajo.tipo_oferta}
              </div>
              <div>
                <strong>Jornada:</strong> {trabajo.jornada}
              </div>
              <div>
                <strong>Contrato:</strong> {trabajo.contrato}
              </div>
              <div>
                <strong>Experiencia laboral:</strong>{" "}
                {trabajo.experiencia_laboral} años
              </div>
              <div>
                <strong>Idiomas requeridos:</strong> {trabajo.idiomas}
              </div>
              <div>
                <strong>Fecha de publicación:</strong>{" "}
                {new Date(trabajo.created_at).toLocaleDateString()}
              </div>
            </div>
            <h3 className="text-2xl font-semibold mt-6 mb-2">Descripción</h3>
            <p className="text-gray-700">{trabajo.description}</p>
            <Button className="mt-6 bg-primary text-white">
              Aplicar ahora
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
