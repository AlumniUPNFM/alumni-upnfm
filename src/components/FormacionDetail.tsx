import { dateToFormat } from "@/lib/date-to-format";
import { Formacion } from "@/services/formaciones.types";
import Link from "next/link";

interface Props {
  formacion: Formacion;
}

export default function FormacionDetail({ formacion }: Props) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden font-montserrat">
      {/* Encabezado */}
      <div className="bg-primary text-white text-center p-4">
        <h2 className="text-2xl font-bold">{formacion.descripcion}</h2>
      </div>
      {/* Cuerpo */}
      <div className="p-6 space-y-4">
        <div className="flex items-center">
          <span className="font-semibold w-32">Facultad:</span>
          <span>{formacion.degree?.name}</span>
        </div>
        <div className="flex items-center">
          <span className="font-semibold w-32">Modalidad:</span>
          <span>{formacion.modalidad}</span>
        </div>
        <div className="flex items-center">
          <span className="font-semibold w-32">Lugar:</span>
          <span>{formacion.lugar}</span>
        </div>
        <div className="flex items-center">
          <span className="font-semibold w-32">Capacidad:</span>
          <span>{formacion.capacidad} personas</span>
        </div>
        <div className="flex items-center">
          <span className="font-semibold w-32">Duración:</span>
          <span>{formacion.horas} horas</span>
        </div>
        <div className="flex items-center">
          <span className="font-semibold w-32">Fecha:</span>
          <span>{dateToFormat(new Date(formacion.fecha))}</span>
        </div>
      </div>
      {/* Pie de página */}
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
    </div>
  );
}
