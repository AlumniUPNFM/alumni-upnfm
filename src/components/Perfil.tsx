import Link from "next/link";
import ProfileImage from "./ProfileImage";

interface Props {
  dni: string;
  names: string;
  lastNames: string;
  carrera: string;
  className?: string;
}

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
      className={`bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden ${className}`}
    >
      {/* Imagen de perfil */}
      <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
        <ProfileImage
          classNameAvatar="w-24 h-24 rounded-full"
          dni={dni}
          names={names}
          lastNames={lastNames}
        />
      </div>
      {/* Información del perfil */}
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800">
          {`${firstName} ${firstLastName}`}
        </h3>
        <p className="text-sm text-gray-600 italic">{carrera}</p>
      </div>
    </Link>
  );
}
