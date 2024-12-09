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
      className="flex items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 w-full"
    >
      {/* Imagen */}
      <div className="flex-shrink-0">
        <Image
          src={img}
          alt={title}
          width={48}
          height={48}
          className="rounded-full"
        />
      </div>
      {/* Contenido de texto */}
      <div className="flex-1 ml-4 text-left">
        <h2 className="text-base font-medium text-gray-800 truncate">
          {title}
        </h2>
        <p className="text-sm text-gray-500">{ofertas} ofertas</p>
      </div>
      {/* Icono de flecha */}
      <div className="text-gray-400">
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
