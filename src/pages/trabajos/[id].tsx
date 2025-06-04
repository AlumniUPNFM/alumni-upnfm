/**
 * @fileoverview Página de Detalle de Trabajo - Visualización de una oferta laboral específica
 *
 * Esta página muestra la información detallada de una oferta de trabajo seleccionada, incluyendo datos de la empresa,
 * requisitos, descripción y opción para aplicar. El diseño es plano, corporativo y utiliza degradados sutiles para
 * mantener coherencia visual con el resto de la aplicación.
 */

"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Trabajo } from "@/services/trabajos.types";
import { GetTrabajoById } from "@/services/trabajos";
import Image from "next/image";
import { URL_BASE } from "@/config/constants";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

/**
 * @component TrabajoDetail
 * @description Página de detalle para visualizar una oferta de trabajo específica
 * @returns {JSX.Element} Detalle de trabajo
 */
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
        <div className="flex justify-center items-center min-h-[60vh]">
          <LoadingSpinner text="Cargando detalles..." size={40} variant="default" />
        </div>
      </MainLayout>
    );
  }

  if (error || !trabajo) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <p className="text-center text-red-500 bg-red-50/30 p-4 rounded-lg border border-red-100">
            {error || "Trabajo no encontrado"}
          </p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section className="max-w-4xl mx-auto p-6 font-montserrat">
        <header className="mb-8 flex items-center gap-3">
          <div className="bg-gradient-to-br from-custom-green/5 to-custom-green/10 p-2 rounded-lg">
            <svg className="w-6 h-6 text-custom-green" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a5 5 0 00-10 0v2M5 9h14a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2z" /></svg>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{trabajo.puesto}</h1>
        </header>
        <div className="flex flex-col md:flex-row gap-8 bg-gradient-to-br from-gray-50/50 to-gray-50 rounded-xl p-6 border border-gray-100">
          {/* Sección de la empresa */}
          <div className="md:w-1/3 flex-shrink-0 flex flex-col items-center">
            <Image
              src={`${URL_BASE}${trabajo.empresa?.image_url}`}
              alt={trabajo.empresa?.name || "Empresa"}
              width={120}
              height={120}
              className="rounded-lg object-cover max-h-28"
            />
            <h2 className="text-lg font-semibold mt-4 text-center">
              {trabajo.empresa?.name}
            </h2>
            {trabajo.empresa?.url && (
              <p className="text-gray-600 mt-2 text-center">
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
            <h3 className="text-xl font-semibold mb-4 text-custom-green">
              Detalles del Trabajo
            </h3>
            <div className="space-y-3 text-gray-700">
              <div>
                <span className="font-medium text-gray-600">Carrera requerida:</span> {trabajo.degree?.name}
              </div>
              <div>
                <span className="font-medium text-gray-600">Salario:</span> L {trabajo.salario}
              </div>
              <div>
                <span className="font-medium text-gray-600">Ubicación:</span> {trabajo.ubicacion}
              </div>
              <div>
                <span className="font-medium text-gray-600">Tipo de oferta:</span> {trabajo.tipo_oferta}
              </div>
              <div>
                <span className="font-medium text-gray-600">Jornada:</span> {trabajo.jornada}
              </div>
              <div>
                <span className="font-medium text-gray-600">Contrato:</span> {trabajo.contrato}
              </div>
              <div>
                <span className="font-medium text-gray-600">Experiencia laboral:</span> {trabajo.experiencia_laboral} años
              </div>
              <div>
                <span className="font-medium text-gray-600">Idiomas requeridos:</span> {trabajo.idiomas}
              </div>
              <div>
                <span className="font-medium text-gray-600">Fecha de publicación:</span> {new Date(trabajo.created_at).toLocaleDateString()}
              </div>
            </div>
            <h3 className="text-xl font-semibold mt-6 mb-2 text-custom-green">Descripción</h3>
            <p className="text-gray-700 whitespace-pre-line">{trabajo.description}</p>
            <Button className="mt-6 bg-primary text-white">
              Aplicar ahora
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
