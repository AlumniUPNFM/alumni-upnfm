import Image from "next/image";

interface Props {
  img: string;
  title: string;
  ofertas: number;
  onClick?: () => void;
  compact?: boolean;
}

export default function Degree({ title, img, ofertas, onClick, compact = false }: Props) {
  if (compact) {
    return (
      <div className="flex items-center justify-center gap-2 px-3 py-1.5">
        {title !== "Todas las carreras" && (
          <div className="w-6 h-6 rounded-full overflow-hidden bg-white/20">
            <Image
              src={img}
              alt={title}
              width={24}
              height={24}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <span className="text-sm font-medium whitespace-nowrap">{title}</span>
        {title !== "Todas las carreras" && (
          <span className="text-xs px-1.5 py-0.5 rounded-full bg-custom-green/10 text-custom-green">
            {ofertas}
          </span>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      className="flex items-center p-4 bg-gradient-to-r from-gray-50/50 to-gray-50 border border-gray-100 rounded-lg hover:from-gray-50 hover:to-gray-50/80 transition-all duration-200 w-full group min-w-0"
      style={{ maxWidth: '100%' }}
    >
      {/* Imagen */}
      <div className="flex-shrink-0">
        <div className="bg-gradient-to-br from-custom-green/5 to-custom-green/10 p-1 rounded-lg">
          <Image
            src={img}
            alt={title}
            width={48}
            height={48}
            className="rounded-lg"
          />
        </div>
      </div>
      {/* Contenido de texto */}
      <div className="flex-1 ml-4 text-left min-w-0">
        <h2 className="text-base font-medium text-gray-800 truncate group-hover:text-custom-green transition-colors duration-200 max-w-full">
          {title}
        </h2>
        <p className="text-sm text-gray-500 truncate max-w-full">{ofertas} ofertas</p>
      </div>
      {/* Icono de flecha */}
      <div className="text-gray-400 group-hover:text-custom-green transition-colors duration-200 flex-shrink-0 ml-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  );
}
