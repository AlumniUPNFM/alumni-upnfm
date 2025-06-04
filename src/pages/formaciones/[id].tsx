/**
 * @fileoverview Página de Formaciones por Tipo - Visualización de formaciones filtradas
 *
 * Esta página muestra las formaciones disponibles según el tipo seleccionado, con un diseño plano,
 * corporativo y degradados sutiles. Incluye presentación visual del logo, grilla de formaciones,
 * manejo de carga y errores consistente con el resto de la aplicación.
 */

import MainLayout from "@/layouts/MainLayout";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Formacion } from "@/services/formaciones.types";
import { GetFormacionesFiltered } from "@/services/formaciones";
import FormacionDetail from "@/components/FormacionDetail";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

/**
 * @component FormacionesPorTipo
 * @description Página para visualizar las formaciones filtradas por tipo
 * @returns {JSX.Element} Página de formaciones filtradas
 */
export default function FormacionesPorTipo() {
  const router = useRouter();
  const { id } = router.query;

  const [formaciones, setFormaciones] = useState<Formacion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const logos: Record<number, string> = {
    1: "/Funda_Logo.webp", // Logo de Diplomados
    2: "/Funda_Logo.webp", // Logo de Certificados
    3: "/Logo-Conferencias-Alumni-UPNFM.webp", // Logo de Conferencias
    4: "/Logo-Talleres-Alumni-UPNFM.webp", // Logo de Talleres
    5: "/Logo-Cursos-Alumni-UPNFM.webp", // Logo de Cursos
    6: "/Logo_VRI.webp", // Logo de Becas
    7: "/Logo_DPG.webp", // Logo de Post-Grados
  };

  const logoActual = id && logos[Number(id)] ? logos[Number(id)] : "/logo-alumni-upnfm.png";

  useEffect(() => {
    if (id) {
      const fetchFormaciones = async () => {
        setLoading(true);
        try {
          const formaciones = await GetFormacionesFiltered(Number(id));
          setFormaciones(formaciones);
          setError(null);
        } catch (error) {
          setError("Error al cargar las formaciones");
        } finally {
          setLoading(false);
        }
      };
      fetchFormaciones();
    }
  }, [id]);

  return (
    <MainLayout>
      <section className="max-w-7xl mx-auto py-10 px-4 font-montserrat">
        {/* Encabezado */}
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Formaciones Disponibles</h1>
          <p className="text-gray-600 text-lg">Explora las diferentes opciones de formación que tenemos para ti.</p>
        </header>
        {/* Contenido Principal */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sección Lateral */}
          <aside className="lg:w-1/4 flex flex-col items-center mb-8 lg:mb-0">
            <div className="bg-gradient-to-br from-custom-green/10 to-custom-green/5 rounded-2xl p-6 w-full flex items-center justify-center">
              <Image
                src={logoActual}
                alt="Logo Dinamico"
                width={180}
                height={180}
                className="object-contain w-40 h-40"
              />
            </div>
          </aside>
          {/* Lista de Formaciones */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <LoadingSpinner text="Cargando formaciones..." size={40} variant="default" />
              </div>
            ) : error ? (
              <div className="flex justify-center items-center h-64">
                <p className="text-center text-red-500 bg-red-50/30 p-4 rounded-lg border border-red-100">{error}</p>
              </div>
            ) : formaciones.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {formaciones.map((f, idx) => (
                  <FormacionDetail key={idx} formacion={f} />
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center h-64">
                <p className="text-gray-500">No se encontraron formaciones.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
