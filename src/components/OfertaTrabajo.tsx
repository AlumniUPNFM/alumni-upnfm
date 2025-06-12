import Image from "next/image";
import Link from "next/link";
import { IconMapPin, IconCash, IconBriefcase, IconClock, IconFileText, IconLanguage, IconUser } from "@tabler/icons-react";

interface Props {
  id: number;
  puesto: string;
  salario: number;
  empresaName: string;
  fecha: string;
  img: string;
  carrera: string;
  ubicacion: string;
  tipo_oferta: string;
  jornada: string;
  contrato: string;
  experiencia_laboral: number;
  idiomas: string;
}

export default function OfertaTrabajo({
  id,
  puesto,
  salario,
  fecha,
  img,
  empresaName,
  carrera,
  ubicacion,
  tipo_oferta,
  jornada,
  contrato,
  experiencia_laboral,
  idiomas,
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
            <p className="text-xs text-gray-500">{empresaName}</p>
          </div>
          <span className="text-xs text-gray-500 bg-gray-50/50 px-2 py-1 rounded-full flex-shrink-0">{fecha}</span>
        </div>
        
        {/* Sección de información */}
        <div className="p-3 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <IconCash className="w-4 h-4 text-custom-green" />
              <span className="text-gray-500 text-xs">Salario:</span>
              <span className="font-medium">{salario} Lempiras</span>
            </div>
            <div className="flex items-center gap-2">
              <IconMapPin className="w-4 h-4 text-custom-green" />
              <span className="text-gray-500 text-xs">Ubicación:</span>
              <span className="font-medium truncate">{ubicacion}</span>
            </div>
            <div className="flex items-center gap-2">
              <IconBriefcase className="w-4 h-4 text-custom-green" />
              <span className="text-gray-500 text-xs">Carrera:</span>
              <span className="font-medium truncate">{carrera}</span>
            </div>
            <div className="flex items-center gap-2">
              <IconFileText className="w-4 h-4 text-custom-green" />
              <span className="text-gray-500 text-xs">Tipo:</span>
              <span className="font-medium truncate">{tipo_oferta}</span>
            </div>
            <div className="flex items-center gap-2">
              <IconClock className="w-4 h-4 text-custom-green" />
              <span className="text-gray-500 text-xs">Jornada:</span>
              <span className="font-medium truncate">{jornada}</span>
            </div>
            <div className="flex items-center gap-2">
              <IconFileText className="w-4 h-4 text-custom-green" />
              <span className="text-gray-500 text-xs">Contrato:</span>
              <span className="font-medium truncate">{contrato}</span>
            </div>
            <div className="flex items-center gap-2">
              <IconUser className="w-4 h-4 text-custom-green" />
              <span className="text-gray-500 text-xs">Experiencia:</span>
              <span className="font-medium truncate">{experiencia_laboral} años</span>
            </div>
            <div className="flex items-center gap-2">
              <IconLanguage className="w-4 h-4 text-custom-green" />
              <span className="text-gray-500 text-xs">Idiomas:</span>
              <span className="font-medium truncate">{idiomas}</span>
            </div>
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
