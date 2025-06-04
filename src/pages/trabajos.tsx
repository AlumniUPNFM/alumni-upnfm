/**
 * @fileoverview Página de Trabajos - Lista completa de ofertas laborales
 *
 * Esta página muestra todas las ofertas de trabajo disponibles en la plataforma, permitiendo a los usuarios
 * explorar oportunidades laborales de manera visual, profesional y corporativa. Utiliza un diseño plano,
 * con degradados sutiles y una jerarquía visual clara, consistente con el resto de la aplicación.
 */

import { useTrabajos } from "@/hooks/get-trabajos";
import MainLayout from "../layouts/MainLayout";
import OfertaTrabajo from "@/components/OfertaTrabajo";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { URL_BASE } from "@/config/constants";

/**
 * @component Trabajos
 * @description Página principal para visualizar la lista completa de ofertas de trabajo
 * @returns {JSX.Element} Página de trabajos
 */
export default function Trabajos() {
  const { trabajos, loading, error } = useTrabajos();
  return (
    <MainLayout>
      <section className="max-w-6xl mx-auto py-10 px-4 font-montserrat">
        <header className="mb-8 flex items-center gap-3">
          <div className="bg-gradient-to-br from-custom-green/5 to-custom-green/10 p-2 rounded-lg">
            <svg className="w-6 h-6 text-custom-green" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a5 5 0 00-10 0v2M5 9h14a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2z" /></svg>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Lista de Trabajos</h1>
        </header>
        <div className="bg-gradient-to-br from-gray-50/50 to-gray-50 rounded-xl p-6 border border-gray-100">
          {loading && (
            <LoadingSpinner text="Cargando ofertas..." size={40} variant="default" />
          )}
          {error && (
            <p className="text-center text-red-500 bg-red-50/30 p-4 rounded-lg border border-red-100">
              Error al cargar los trabajos
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trabajos?.map(
              ({
                id,
                puesto,
                salario,
                degree: { name: carrera } = { name: "" },
                created_at: fecha,
                empresa: { name: ubicacion, image_url: img } = {
                  name: "",
                  image_url: "",
                },
              }) => (
                <OfertaTrabajo
                  key={id}
                  id={id}
                  puesto={puesto}
                  salario={salario}
                  carrera={carrera}
                  fecha={new Date(fecha).toISOString().split("T")[0]}
                  img={`${URL_BASE}${img}`}
                  ubicacion={ubicacion}
                />
              )
            )}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
