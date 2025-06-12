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
    <div className="bg-gradient-to-r from-gray-50/50 to-gray-50 rounded-lg border border-gray-100 overflow-hidden transition-all duration-200 hover:border-custom-green/30 h-full">
      <div className="flex flex-col h-full">
        {/* Sección de la imagen y título */}
        <div className="p-3 flex items-center gap-3 border-b border-gray-100">
          <div className="bg-gradient-to-br from-custom-green/5 to-custom-green/10 p-1.5 rounded-lg flex-shrink-0">
            <Image
              src={img}
              alt="Logo de la empresa"
              width={40}
              height={40}
              className="w-10 h-10 object-contain"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-semibold text-gray-800 truncate">{puesto}</h2>
            <p className="text-xs text-gray-500">{ubicacion}</p>
          </div>
          <span className="text-xs text-gray-500 bg-gray-50/50 px-2 py-1 rounded-full flex-shrink-0">{fecha}</span>
        </div>
        
        {/* Sección de información */}
        <div className="p-3 flex-1">
          <div className="space-y-1.5">
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <span className="text-gray-500 text-xs">Salario:</span>
              <span className="font-medium">{salario} Lempiras</span>
            </p>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <span className="text-gray-500 text-xs">Carrera:</span>
              <span className="font-medium truncate">{carrera}</span>
            </p>
          </div>
        </div>

        {/* Botón de acción */}
        <div className="p-3 border-t border-gray-100">
          <Link
            className="w-full bg-gradient-to-r from-primary/90 to-primary text-white px-3 py-1.5 rounded-lg hover:opacity-90 transition-all duration-200 text-sm font-medium text-center block"
            href={`/trabajos/${id}`}
          >
            Más Info
          </Link>
        </div>
      </div>
    </div>
  );
}
