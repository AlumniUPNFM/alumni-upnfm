import Image from "next/image";

interface Props {
  img: string;
  title: string;
  ofertas: number;
  onClick?: () => void;
}

export default function Degree({ title, img, ofertas, onClick }: Props) {
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
