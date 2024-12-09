// pages/formaciones/[id].tsx

import MainLayout from "@/layouts/MainLayout";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Formacion } from "@/services/formaciones.types";
import { GetFormacionesFiltered } from "@/services/formaciones";
import FormacionDetail from "@/components/FormacionDetail";

export default function Formaciones() {
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
    6: "/Logo_USAID.webp", // Logo de Becas
    7: "/Logo_DPG.webp", // Logo de Post-Grados
  };

  const logoActual = id && logos[Number(id)] ? logos[Number(id)] : "/public/logo-alumni-upnfm.png";

  useEffect(() => {
    if (id) {
      const fetchFormaciones = async () => {
        setLoading(true);
        try {
          const formaciones = await GetFormacionesFiltered(Number(id));
          setFormaciones(formaciones);
          setError(null);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      <div className="container mx-auto px-4 py-8">
        {/* Encabezado */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Formaciones Disponibles</h1>
          <p className="text-gray-600">
            Explora las diferentes opciones de formación que tenemos para ti.
          </p>
        </div>
        {/* Contenido Principal */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sección Lateral */}
          <aside className="lg:w-1/4 flex flex-col items-center space-y-6">
            <Image
              src={logoActual}
              alt="Logo Dinamico"
              width={300}
              height={300}
              className="object-contain"
            />
          </aside>
          {/* Lista de Formaciones */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <p>Cargando...</p>
              </div>
            ) : error ? (
              <div className="flex justify-center items-center h-64">
                <p className="text-red-500">{error}</p>
              </div>
            ) : formaciones.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {formaciones.map((f, idx) => (
                  <FormacionDetail key={idx} formacion={f} />
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center h-64">
                <p>No se encontraron formaciones.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
