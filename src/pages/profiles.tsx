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

export default function Profiles() {
  const [profiles, setProfiles] = useState<User[]>([]);
  const [profilesFiltered, setProfilesFiltered] = useState<User[]>([]);
  const [carreras, setCarreras] = useState<Degree[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDegree, setSelectedDegree] = useState<Degree | null>(null);
  const [hasMorePages, setHasMorePages] = useState(true);

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

  const filterProfiles = () => {
    // Si no hay una carrera seleccionada, no se filtran los perfiles
    if (!selectedDegree) {
      setProfilesFiltered(profiles);
      return;
    }

    const profilesFiltered = profiles.filter(
      (profile) => profile.degree?.id === selectedDegree.id
    );
    setProfilesFiltered(profilesFiltered);
  };

  useEffect(filterProfiles, [selectedDegree]);

  return (
    <MainLayout>
      <main className="flex-flex-col gap-6 font-montserrat">
        <div className="grid grid-cols-12 gap-2">
          <aside className="col-span-12 xl:col-span-3 flex flex-col gap-2 text-custom-black rounded-3xl h-fit">
            <p className="p-2 justify-center items-center flex text-xl font-semibold">
              Filtrar por carreras
            </p>
            <Carrera
              onClick={() => {
                setSelectedDegree(null);
              }}
              selected={!Boolean(selectedDegree?.id)}
              title="Todas las carreras"
              styleClass="w-full"
            />
            {carreras.map((degree) => (
              <DegreeComponent
                onClick={() => {
                  setSelectedDegree(degree);
                }}
                key={degree.id}
                title={degree.name}
                img={degree.image_url}
                ofertas={degree.ofertas?.length ?? 0}
              />
            ))}
          </aside>
          <div className="col-span-12 xl:col-span-9 grid grid-cols-12 gap-2">
            {profilesFiltered.map(({ dni, names, last_names, degree }, idx) => (
              <Perfil
                className="col-span-12 md:col-span-6 xl:col-span-3"
                carrera={degree?.name || "N/A"}
                dni={dni}
                lastNames={last_names}
                names={names}
                key={idx}
              />
            ))}
          </div>
        </div>
        {/* Paginación */}
        {
          // Si no se ajusta el limite de perfiles por pagina y está en la primera página
          // no se muestra la paginación
          !(profiles.length < limit && currentPage === 1) && (
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
          )
        }
      </main>
    </MainLayout>
  );
}
