/**
 * @fileoverview Componente JobList - Muestra una lista de ofertas de trabajo y categorías
 * 
 * Este componente es responsable de mostrar una vista de ofertas de trabajo disponibles,
 * junto con un sidebar de categorías basado en carreras universitarias. Permite a los
 * usuarios ver las ofertas más recientes y filtrar por categorías. Incluye funcionalidad
 * especial para administradores con acceso a la gestión de ofertas.
 */

import { useState } from "react";
import { useTrabajos } from "@/hooks/get-trabajos";
import { useDegrees } from "@/hooks/get-degrees";
import OfertaTrabajo from "@/components/OfertaTrabajo";
import Degree from "@/components/Degree";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Link from "next/link";
import { User } from "@/types/types";
import { URL_BASE } from "@/config/constants";
import { IconSettings, IconBriefcase, IconX } from "@tabler/icons-react";

/**
 * @interface JobListProps
 * @description Propiedades requeridas para el componente JobList
 * @property {User | null} user - Información del usuario actual, puede ser null si no hay sesión
 */
interface JobListProps {
  user: User | null;
}

/**
 * @component JobList
 * @description Componente principal que renderiza la lista de ofertas de trabajo y categorías
 * @param {JobListProps} props - Propiedades del componente
 * @returns {JSX.Element} Componente de lista de trabajos
 */
export default function JobList({ user }: JobListProps) {
  // Hooks para obtener datos de trabajos y carreras
  const {
    trabajos: jobs,
    loading: loadingTrabajos,
    error: errorTrabajos,
  } = useTrabajos();
  const {
    degrees,
    loading: loadingDegrees,
    error: errorDegrees,
  } = useDegrees();

  // Estado para mostrar solo las primeras 7 carreras o todas
  const [showAllDegrees, setShowAllDegrees] = useState(false);
  const [selectedDegree, setSelectedDegree] = useState<string | null>(null);
  const displayedDegrees = showAllDegrees ? degrees : degrees?.slice(0, 7);

  // Filtrar trabajos basado en la categoría seleccionada
  const filteredJobs = selectedDegree
    ? jobs?.filter((job) => job.degree?.name === selectedDegree)
    : jobs;

  const handleDegreeClick = (degreeName: string) => {
    setSelectedDegree(selectedDegree === degreeName ? null : degreeName);
  };

  const clearFilter = () => {
    setSelectedDegree(null);
  };

  return (
    <section className="my-12 font-montserrat">
      {/* Encabezado con título y botones de acción */}
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-custom-green/5 to-custom-green/10 p-2 rounded-lg">
            <IconBriefcase className="text-custom-green w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Lista de Trabajos</h2>
        </div>
        <div className="flex gap-3">
          <Link
            href="/trabajos"
            className="bg-gradient-to-r from-custom-green/90 to-custom-green text-white rounded-lg py-2 px-6 text-sm font-medium hover:opacity-90 transition-all duration-200 flex items-center justify-center gap-2"
          >
            Ver Lista Completa
          </Link>
          {user?.is_admin && (
            <Link
              href="/trabajos-maintenance"
              className="bg-gradient-to-r from-primary/90 to-primary text-white rounded-lg p-2 flex items-center justify-center hover:opacity-90 transition-all duration-200"
              title="Gestionar ofertas"
            >
              <IconSettings className="w-5 h-5" />
            </Link>
          )}
        </div>
      </header>

      {/* Contenedor principal con grid de categorías y ofertas */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Sidebar de Categorías */}
        <aside className="xl:col-span-1">
          <div className="bg-gradient-to-r from-custom-green/5 to-custom-green/10 rounded-lg p-3 text-center text-lg font-semibold mb-6">
            <span className="text-custom-green">Categorías</span>
          </div>
          <div className="bg-gradient-to-br from-gray-50/50 to-gray-50 rounded-lg p-4 border border-gray-100">
            {loadingDegrees ? (
              <LoadingSpinner 
                text="Cargando categorías..." 
                size={40} 
                variant="minimal"
              />
            ) : errorDegrees ? (
              <p className="text-center text-red-500 bg-red-50/30 p-3 rounded-lg border border-red-100">
                Error al cargar las carreras
              </p>
            ) : (
              <>
                <div className="space-y-3">
                  {displayedDegrees?.map(({ name, image_url: img, ofertas }, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleDegreeClick(name)}
                      className={`cursor-pointer transition-all duration-300 transform hover:scale-[1.02] rounded-lg ${
                        selectedDegree === name
                          ? "bg-custom-green/20 border-2 border-custom-green shadow-lg ring-2 ring-custom-green/30 ring-offset-2"
                          : "hover:bg-gray-50 hover:shadow-md"
                      }`}
                    >
                      <Degree
                        title={name}
                        img={img}
                        ofertas={ofertas?.length ?? 0}
                      />
                    </div>
                  ))}
                </div>
                {degrees && degrees.length > 7 && (
                  <button
                    className="mt-4 w-full text-custom-green font-medium py-2 rounded-lg hover:bg-custom-green/10 transition-colors duration-200"
                    onClick={() => setShowAllDegrees((prev) => !prev)}
                  >
                    {showAllDegrees ? "Ver menos" : "Ver más"}
                  </button>
                )}
              </>
            )}
          </div>
        </aside>

        {/* Lista de Trabajos */}
        <div className="xl:col-span-3 space-y-4">
          {selectedDegree && (
            <div className="flex items-center justify-between bg-custom-green/10 p-4 rounded-lg mb-6 border border-custom-green/20 shadow-md">
              <span className="text-custom-green font-semibold text-lg">
                Filtrado por: {selectedDegree}
              </span>
              <button
                onClick={clearFilter}
                className="text-custom-green hover:text-custom-green/80 transition-colors duration-200 bg-white p-2 rounded-full hover:bg-custom-green/5"
                title="Limpiar filtro"
              >
                <IconX className="w-5 h-5" />
              </button>
            </div>
          )}
          {loadingTrabajos ? (
            <LoadingSpinner 
              text="Cargando ofertas..." 
              size={40}
              variant="default"
            />
          ) : errorTrabajos ? (
            <p className="text-center text-red-500 bg-red-50/30 p-4 rounded-lg border border-red-100">
              Error al cargar las ofertas de trabajo
            </p>
          ) : (
            <div className="space-y-4">
              {filteredJobs?.slice(0, 10).map(
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
              {filteredJobs?.length === 0 && (
                <p className="text-center text-gray-500 bg-gray-50/30 p-4 rounded-lg border border-gray-100">
                  No hay ofertas disponibles para esta categoría
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
