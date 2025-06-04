/**
 * @fileoverview Componente Perfil - Muestra un resumen visual de un egresado
 *
 * Este componente presenta la información principal de un egresado, incluyendo su nombre, carrera y foto,
 * con un diseño plano, corporativo y degradados sutiles, consistente con el resto de la aplicación.
 */

import Link from "next/link";
import ProfileImage from "./ProfileImage";

/**
 * @interface Props
 * @description Propiedades requeridas para el componente Perfil
 * @property {string} dni - Identificador único del egresado
 * @property {string} names - Nombres completos del egresado
 * @property {string} lastNames - Apellidos completos del egresado
 * @property {string} carrera - Carrera del egresado
 * @property {string} [className] - Clases adicionales para el contenedor principal (opcional)
 */
interface Props {
  dni: string;
  names: string;
  lastNames: string;
  carrera: string;
  className?: string;
}

/**
 * @component Perfil
 * @description Componente visual para mostrar el resumen de un egresado
 * @param {Props} props - Propiedades del componente
 * @returns {JSX.Element} Card visual de perfil de egresado
 */
export default function Perfil({
  dni,
  names,
  lastNames,
  carrera,
  className = "",
}: Props) {
  // Obtener el primer nombre y primer apellido
  const firstName = names.split(" ")[0];
  const firstLastName = lastNames.split(" ")[0];

  return (
    <Link
      href={`/profiles/${dni}`}
      className={`border border-custom-green/10 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50/70 to-gray-100 transition-all duration-200 hover:border-custom-green/30 focus:outline-none focus:ring-2 focus:ring-custom-green/30 ${className}`}
      style={{ boxShadow: "0 2px 12px 0 rgba(60, 120, 80, 0.04)" }}
    >
      {/* Imagen de perfil */}
      <div className="w-full flex flex-col items-center justify-center pt-8 pb-4 bg-gradient-to-b from-custom-green/10 to-transparent">
        <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full shadow-lg ring-4 ring-white bg-gray-200 overflow-hidden flex items-center justify-center">
          <ProfileImage
            classNameAvatar="rounded-full size-full"
            classNameImage="object-cover"
            dni={dni}
            names={names}
            lastNames={lastNames}
          />
        </div>
      </div>
      {/* Información del perfil */}
      <div className="px-6 pb-6 pt-2 text-center bg-white">
        <h3 className="text-lg font-bold text-gray-800 truncate mb-1">
          {`${firstName} ${firstLastName}`}
        </h3>
        <p className="text-sm text-custom-green font-medium italic truncate">
          {carrera}
        </p>
      </div>
    </Link>
  );
}
