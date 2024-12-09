import Image from "next/image";
import Link from "next/link";

interface Props {
  id: number;
  puesto: string;
  salario: number;
  fecha: string;
  img: string;
  carrera: string;
  ubicacion: string;
}

export default function OfertaTrabajo({
  id,
  puesto,
  salario,
  fecha,
  img,
  carrera,
  ubicacion,
}: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 relative">
      <div className="flex">
        {/* Sección de la imagen */}
        <div className="w-1/4 p-4 flex items-center justify-center bg-gray-100">
          <Image
            src={img}
            alt="Logo de la empresa"
            width={128}
            height={128}
            className="w-full object-contain max-h-16"
          />
        </div>
        {/* Sección de información */}
        <div className="w-3/4 p-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-bold text-gray-800">{puesto}</h2>
            <span className="text-sm text-gray-500">{fecha}</span>
          </div>
          <p className="text-gray-600">
            <strong>Salario:</strong> {salario} Lempiras
          </p>
          <p className="text-gray-600">
            <strong>Ubicación:</strong> {ubicacion}
          </p>
          <p className="text-gray-600">
            <strong>Carrera:</strong> {carrera}
          </p>
          <div className="mt-4 flex justify-end absolute bottom-0 right-0 m-2">
            <Link
              className="px-4 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors duration-200"
              href={`/trabajos/${id}`}
            >
              Más Info
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
