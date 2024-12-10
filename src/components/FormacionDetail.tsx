import { dateToFormat } from "@/lib/date-to-format";
import { Formacion } from "@/services/formaciones.types";
import {
  CalendarIcon,
  ClockIcon,
  ExternalLinkIcon,
  LibraryBig,
  MapPin,
  School,
  UserIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";

interface Props {
  formacion: Formacion;
}

export default function FormacionDetail({ formacion }: Props) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden font-montserrat text-gray-800 flex flex-col">
      {/* Encabezado */}
      <header className="flex-initial">
        <div className="bg-primary text-white p-6">
          <h2 className="text-3xl font-bold tracking-tight">
            {formacion.name}
          </h2>
          {formacion.descripcion && (
            <p className="text-white/90 text-sm mt-2 leading-relaxed">
              {formacion.descripcion}
            </p>
          )}
        </div>
      </header>

      <main className="flex flex-col flex-1">
        {/* Chips para Tipo, Carrera, Modalidad */}
        <div className="p-6 pb-0 flex flex-wrap gap-2">
          {formacion.tipo?.name && (
            <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-medium text-gray-800">
              {formacion.tipo.name}
            </span>
          )}
          {formacion.degree?.name && (
            <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-medium text-gray-800">
              {formacion.degree.name}
            </span>
          )}
          {formacion.modalidad && (
            <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-medium text-gray-800">
              {formacion.modalidad}
            </span>
          )}
        </div>

        {/* Información principal (Fecha, Duración, Lugar, Capacidad) */}
        <div className="p-6">
          <ul className="space-y-2 text-sm">
            {formacion.fecha && (
              <li className="flex items-center space-x-2">
                <CalendarIcon className="size-5 text-gray-500" />
                <span>{dateToFormat(new Date(formacion.fecha))}</span>
              </li>
            )}
            {formacion.duracion && (
              <li className="flex items-center space-x-2">
                <ClockIcon className="size-5 text-gray-500" />
                <span>{formacion.duracion}</span>
              </li>
            )}
            {formacion.lugar && (
              <li className="flex items-center space-x-2">
                <MapPin className="size-12 text-gray-500"></MapPin>
                <span>{formacion.lugar}</span>
              </li>
            )}
            {typeof formacion.capacidad === "number" && (
              <li className="flex items-center space-x-2">
                <UsersIcon className="size-5 text-gray-500" />
                <span>{formacion.capacidad} personas</span>
              </li>
            )}
          </ul>
        </div>

        {/* Información adicional (Institución, Facultad, Instructor) */}
        <div className="p-6 pt-0">
          <ul className="space-y-2 text-sm">
            {formacion.institucion && (
              <li className="flex items-center space-x-2">
                <School className="size-5 text-gray-500"></School>
                <span>{formacion.institucion}</span>
              </li>
            )}
            {formacion.facultad && (
              <li className="flex items-center space-x-2">
                <LibraryBig className="size-5 text-gray-500"></LibraryBig>
                <span>{formacion.facultad}</span>
              </li>
            )}
            {formacion.instructor && (
              <li className="flex items-center space-x-2">
                <UserIcon className="size-5 text-gray-500" />
                <span>{formacion.instructor}</span>
              </li>
            )}
          </ul>
        </div>

        {/* URL */}
        {formacion.url && (
          <div className="p-6 pt-0">
            <div className="flex items-center space-x-2 text-sm text-primary hover:underline">
              <ExternalLinkIcon className="size-5 text-gray-500" />
              <Link
                href={formacion.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {formacion.url}
              </Link>
            </div>
          </div>
        )}

        {/* Información secundaria (ID, Created_at) */}
        <div className="p-6 pt-0 text-xs text-gray-500 space-x-4">
          <span>ID: {formacion.id}</span>
          <span>
            Creado:{" "}
            {formacion.created_at
              ? dateToFormat(new Date(formacion.created_at))
              : "N/D"}
          </span>
        </div>
      </main>

      {/* Pie de página */}
      <footer className="flex-initial">
        {formacion.url && (
          <div className="bg-gray-100 p-4 flex justify-end">
            <Link
              href={formacion.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition-colors duration-200"
            >
              Más Info
            </Link>
          </div>
        )}
      </footer>
    </div>
  );
}
