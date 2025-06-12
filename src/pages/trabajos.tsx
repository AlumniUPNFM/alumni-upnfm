/**
 * @fileoverview Página de Trabajos - Lista completa de ofertas laborales
 *
 * Esta página muestra todas las ofertas de trabajo disponibles en la plataforma, permitiendo a los usuarios
 * explorar oportunidades laborales de manera visual, profesional y corporativa. Utiliza un diseño plano,
 * con degradados sutiles y una jerarquía visual clara, consistente con el resto de la aplicación.
 */

import { useTrabajos } from "@/hooks/get-trabajos";
import { useDegrees } from "@/hooks/get-degrees";
import MainLayout from "../layouts/MainLayout";
import OfertaTrabajo from "@/components/OfertaTrabajo";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { URL_BASE } from "@/config/constants";
import { useState, useMemo } from "react";
import Degree from "@/components/Degree";
import { IconBriefcase, IconPlus, IconMinus, IconX } from "@tabler/icons-react";

/**
 * @component Trabajos
 * @description Página principal para visualizar la lista completa de ofertas de trabajo
 * @returns {JSX.Element} Página de trabajos
 */
export default function Trabajos() {
  const { trabajos, loading, error } = useTrabajos();
  const { degrees, loading: loadingDegrees, error: errorDegrees } = useDegrees();
  const [showAllDegrees, setShowAllDegrees] = useState(false);
  const [selectedDegree, setSelectedDegree] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const OFFERS_PER_PAGE = 12;
  const displayedDegrees = showAllDegrees ? degrees : degrees?.slice(0, 7);

  // Filtrar trabajos basado en la categoría seleccionada
  const filteredJobs = useMemo(() => {
    let jobs = selectedDegree
      ? trabajos?.filter((job) => job.degree?.name === selectedDegree)
      : trabajos;
    if (search.trim()) {
      const searchLower = search.toLowerCase();
      jobs = jobs?.filter((job) =>
        job.puesto.toLowerCase().includes(searchLower) ||
        job.empresa?.name?.toLowerCase().includes(searchLower) ||
        job.degree?.name?.toLowerCase().includes(searchLower) ||
        job.ubicacion?.toLowerCase().includes(searchLower) ||
        job.tipo_oferta?.toLowerCase().includes(searchLower) ||
        job.jornada?.toLowerCase().includes(searchLower) ||
        job.contrato?.toLowerCase().includes(searchLower) ||
        job.experiencia_laboral?.toString().includes(searchLower) ||
        job.idiomas?.toLowerCase().includes(searchLower)
      );
    }
    return jobs;
  }, [trabajos, selectedDegree, search]);

  // Paginación
  const totalPages = Math.ceil((filteredJobs?.length || 0) / OFFERS_PER_PAGE);
  const paginatedJobs = filteredJobs?.slice(
    (currentPage - 1) * OFFERS_PER_PAGE,
    currentPage * OFFERS_PER_PAGE
  );

  const handleDegreeClick = (degreeName: string) => {
    setSelectedDegree(selectedDegree === degreeName ? null : degreeName);
  };

  const clearFilter = () => {
    setSelectedDegree(null);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <MainLayout>
      <section className="max-w-6xl mx-auto py-10 px-4 font-montserrat">
        <header className="mb-8 flex items-center gap-3">
          <div className="bg-gradient-to-br from-custom-green/5 to-custom-green/10 p-2 rounded-lg">
            <svg className="w-6 h-6 text-custom-green" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a5 5 0 00-10 0v2M5 9h14a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2z" /></svg>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Lista de Trabajos</h1>
        </header>
        {/* Barra de Categorías */}
        <div className="bg-gradient-to-br from-gray-50/50 to-gray-50 rounded-lg p-4 border border-gray-100 mb-8">
          <div className="flex items-center gap-3 mb-4 justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-custom-green/5 to-custom-green/10 p-2 rounded-lg">
                <IconBriefcase className="text-custom-green w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Categorías</h3>
            </div>
            {degrees && degrees.length > 7 && (
              <button
                onClick={() => setShowAllDegrees((prev) => !prev)}
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                title={showAllDegrees ? "Ver menos" : "Ver más"}
              >
                {showAllDegrees ? (
                  <IconMinus className="w-4 h-4" />
                ) : (
                  <IconPlus className="w-4 h-4" />
                )}
              </button>
            )}
          </div>
          {loadingDegrees ? (
            <LoadingSpinner text="Cargando categorías..." size={40} variant="minimal" />
          ) : errorDegrees ? (
            <p className="text-center text-red-500 bg-red-50/30 p-3 rounded-lg border border-red-100">
              Error al cargar las carreras
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {displayedDegrees?.map(({ name, image_url: img, ofertas }, idx) => (
                <div
                  key={idx}
                  onClick={() => handleDegreeClick(name)}
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedDegree === name
                      ? "bg-custom-green text-white shadow-md"
                      : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200"
                  } rounded-lg`}
                >
                  <Degree
                    title={name}
                    img={img}
                    ofertas={ofertas?.length ?? 0}
                    compact={true}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Filtro activo */}
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
        {/* Search bar */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Buscar por puesto, empresa o carrera..."
            className="w-full md:w-96 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-green/30 text-sm"
          />
        </div>
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
            {paginatedJobs?.map(
              ({
                id,
                puesto,
                salario,
                degree: { name: carrera } = { name: "" },
                created_at: fecha,
                empresa: { name: empresaName, image_url: img } = {
                  name: "",
                  image_url: "",
                },
                ubicacion,
                tipo_oferta,
                jornada,
                contrato,
                experiencia_laboral,
                idiomas,
              }) => (
                <OfertaTrabajo
                  key={id}
                  id={id}
                  puesto={puesto}
                  salario={salario}
                  carrera={carrera}
                  empresaName={empresaName}
                  fecha={new Date(fecha).toISOString().split("T")[0]}
                  img={`${URL_BASE}${img}`}
                  ubicacion={ubicacion}
                  tipo_oferta={tipo_oferta}
                  jornada={jornada}
                  contrato={contrato}
                  experiencia_laboral={experiencia_laboral}
                  idiomas={idiomas}
                />
              )
            )}
          </div>
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-2 flex-wrap">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors duration-200 ${
                    currentPage === page
                      ? "bg-custom-green text-white border-custom-green"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
}
