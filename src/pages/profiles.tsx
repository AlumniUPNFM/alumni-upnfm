/**
 * @fileoverview Página de Perfiles - Lista y filtrado de perfiles de egresados
 *
 * Esta página permite explorar y filtrar perfiles de egresados por carrera, mostrando la información relevante
 * de cada usuario en un entorno visual profesional, corporativo y consistente con el resto de la aplicación.
 * Utiliza un diseño plano, con degradados sutiles y una jerarquía visual clara.
 */

"use client"; // Necesario para usar hooks en componentes de Next.js

import MainLayout from "@/layouts/MainLayout";
import Carrera from "@/components/Carrera";
import Perfil from "@/components/Perfil";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Degree } from "@/services/degrees.types";
import { GetProfiles } from "@/services/profiles";
import { User } from "@/types/types";
import { useEffect, useState } from "react";
import DegreeComponent from "@/components/Degree";
import { IconBriefcase, IconPlus, IconMinus } from "@tabler/icons-react";

/**
 * @component Profiles
 * @description Página principal para visualizar y filtrar perfiles de egresados
 * @returns {JSX.Element} Página de perfiles
 */
export default function Profiles() {
  const [profiles, setProfiles] = useState<User[]>([]);
  const [profilesFiltered, setProfilesFiltered] = useState<User[]>([]);
  const [carreras, setCarreras] = useState<Degree[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDegree, setSelectedDegree] = useState<Degree | null>(null);
  const [hasMorePages, setHasMorePages] = useState(true);
  const [showAllDegrees, setShowAllDegrees] = useState(false);
  const displayedDegrees = showAllDegrees ? carreras : carreras.slice(0, 7);

  const limit = 25;

  useEffect(() => {
    const fetchProfiles = async () => {
      // Nota: Necesitas modificar GetProfiles para aceptar un parámetro opcional degreeId
      const { isSuccess, data } = await GetProfiles(currentPage, limit);
      if (isSuccess) {
        setProfiles(data);
        setHasMorePages(data.length >= limit);
        if (!profilesFiltered.length) setProfilesFiltered(data);
        return;
      }
    };

    fetchProfiles();
  }, [currentPage, selectedDegree]);

  useEffect(() => {
    // Extraer las carreras de los perfiles
    const newCarreras: Degree[] = [];
    if (!profiles) return;

    profiles.forEach((profile) => {
      const { degree } = profile;
      if (!degree) return;
      const found = newCarreras.find((carrera) => carrera.id === degree.id);
      if (!found) newCarreras.push(degree);
    });
    setCarreras(newCarreras);
  }, [profiles]);

  // Calcular la cantidad de perfiles por carrera
  const perfilesPorCarrera = carreras.reduce((acc, degree) => {
    acc[degree.id] = profiles.filter((p) => p.degree?.id === degree.id).length;
    return acc;
  }, {} as Record<number, number>);

  // Filtrar perfiles por carrera seleccionada
  const filteredProfiles = selectedDegree
    ? profiles.filter((profile) => profile.degree?.id === selectedDegree.id)
    : profiles;

  return (
    <MainLayout>
      <section className="max-w-7xl mx-auto py-10 px-4 font-montserrat">
        <header className="mb-8 flex items-center gap-3">
          <div className="bg-gradient-to-br from-custom-green/5 to-custom-green/10 p-2 rounded-lg">
            <svg className="w-6 h-6 text-custom-green" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Perfiles de Egresados</h1>
        </header>
        {/* Barra de Categorías */}
        <div className="bg-gradient-to-br from-gray-50/50 to-gray-50 rounded-lg p-4 border border-gray-100 mb-8">
          <div className="flex items-center gap-3 mb-4 justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-custom-green/5 to-custom-green/10 p-2 rounded-lg">
                <IconBriefcase className="text-custom-green w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Carreras</h3>
            </div>
            {carreras.length > 7 && (
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
          <div className="flex flex-wrap gap-2">
            <div
              onClick={() => setSelectedDegree(null)}
              className={`cursor-pointer transition-all duration-300 ${
                !selectedDegree
                  ? "bg-custom-green text-white shadow-md"
                  : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200"
              } rounded-lg`}
            >
              <DegreeComponent
                title="Todas las carreras"
                img={""}
                ofertas={profiles.length}
                compact={true}
              />
            </div>
            {displayedDegrees.map((degree) => (
              <div
                key={degree.id}
                onClick={() => setSelectedDegree(degree)}
                className={`cursor-pointer transition-all duration-300 ${
                  selectedDegree?.id === degree.id
                    ? "bg-custom-green text-white shadow-md"
                    : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200"
                } rounded-lg`}
              >
                <DegreeComponent
                  title={degree.name}
                  img={degree.image_url}
                  ofertas={perfilesPorCarrera[degree.id] ?? 0}
                  compact={true}
                />
              </div>
            ))}
          </div>
        </div>
        {/* Grid de perfiles */}
        <div className="col-span-12 xl:col-span-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {filteredProfiles.map(({ dni, names, last_names, degree }, idx) => (
            <Perfil
              className="w-full h-max"
              carrera={degree?.name || "N/A"}
              dni={dni}
              lastNames={last_names}
              names={names}
              key={idx}
            />
          ))}
        </div>
        {/* Paginación */}
        {!(profiles.length < limit && currentPage === 1) && (
          <div className="mt-8 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    lang="es"
                    onClick={() => {
                      if (currentPage === 1) return;
                      setCurrentPage(currentPage - 1);
                    }}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink>{currentPage}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    lang="es"
                    onClick={() => {
                      if (!hasMorePages) return;
                      setCurrentPage(currentPage + 1);
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </section>
    </MainLayout>
  );
}
