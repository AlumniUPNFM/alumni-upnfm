import { useTrabajos } from "@/hooks/get-trabajos";
import { useDegrees } from "@/hooks/get-degrees";
import OfertaTrabajo from "@/components/OfertaTrabajo";
import Degree from "@/components/Degree";
import Link from "next/link";
import { User } from "@/types/types";
import { URL_BASE } from "@/config/constants";
import { IconSettings } from "@tabler/icons-react";

interface JobListProps {
  user: User | null;
}

export default function JobList({ user }: JobListProps) {
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

  return (
    <section className="my-12 font-montserrat">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-xl xl:text-base font-bold">Lista de Trabajos</h2>
        <div className="flex gap-3">
          <Link
            href="/trabajos"
            className="bg-custom-green text-white rounded-full py-2 px-4 text-xs xl:text-base hover:bg-custom-green-dark transition-colors duration-200 flex items-center justify-center"
          >
            Lista Completa
          </Link>
          {user?.is_admin && (
            <Link
              href="/trabajos-maintenance"
              className="bg-primary text-white rounded-full p-2 flex items-center justify-center hover:bg-primary-dark transition-colors duration-200"
            >
              {/* Icono de configuración */}
              <IconSettings></IconSettings>
            </Link>
          )}
        </div>
      </header>
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Sidebar de Categorías */}
        <aside className="xl:col-span-1">
          <div className="bg-custom-green text-white rounded-full p-2 text-center text-xl xl:text-base font-semibold mb-4">
            Categorías
          </div>
          {loadingDegrees && <p className="text-center">Cargando...</p>}
          {errorDegrees && (
            <p className="text-center text-red-500">
              Error al cargar las carreras
            </p>
          )}
          <div className="space-y-2">
            {degrees?.map(({ name, image_url: img, ofertas }, idx) => (
              <Degree
                key={idx}
                title={name}
                img={img}
                ofertas={ofertas?.length ?? 0}
              />
            ))}
          </div>
        </aside>
        {/* Lista de Trabajos */}
        <div className="xl:col-span-3 space-y-6">
          {loadingTrabajos && <p className="text-center">Cargando...</p>}
          {errorTrabajos && (
            <p className="text-center text-red-500">
              Error al cargar las ofertas de trabajo
            </p>
          )}
          {jobs?.slice(0, 10).map(
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
  );
}
