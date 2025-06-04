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
    <div className="bg-gradient-to-r from-gray-50/50 to-gray-50 rounded-lg border border-gray-100 overflow-hidden transition-all duration-200 hover:border-custom-green/30">
      <div className="flex">
        {/* Sección de la imagen */}
        <div className="w-1/4 p-4 flex items-center justify-center bg-gradient-to-br from-gray-50/30 to-gray-50/50">
          <div className="bg-gradient-to-br from-custom-green/5 to-custom-green/10 p-2 rounded-lg">
            <Image
              src={img}
              alt="Logo de la empresa"
              width={128}
              height={128}
              className="w-full object-contain max-h-16"
            />
          </div>
        </div>
        {/* Sección de información */}
        <div className="w-3/4 p-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-bold text-gray-800">{puesto}</h2>
            <span className="text-sm text-gray-500 bg-gray-50/50 px-3 py-1 rounded-full">{fecha}</span>
          </div>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="text-gray-500">Salario:</span>{" "}
              <span className="font-medium">{salario} Lempiras</span>
            </p>
            <p className="text-gray-600">
              <span className="text-gray-500">Ubicación:</span>{" "}
              <span className="font-medium">{ubicacion}</span>
            </p>
            <p className="text-gray-600">
              <span className="text-gray-500">Carrera:</span>{" "}
              <span className="font-medium">{carrera}</span>
            </p>
          </div>
          <div className="mt-4 flex justify-end">
            <Link
              className="bg-gradient-to-r from-primary/90 to-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all duration-200 text-sm font-medium"
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
