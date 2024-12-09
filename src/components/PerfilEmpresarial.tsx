import Image from "next/image";
import Link from "next/link";

interface Props {
  title: string;
  ofertas: number;
  img: string;
  bgColor: string;
  textColor?: string;
  styleClass?: string;
  link: string;
}

export default function PerfilEmpresarial({
  title,
  ofertas,
  img,
  bgColor,
  textColor = "#FFFFFF", // Valor por defecto si no se proporciona
  styleClass = "",
  link,
}: Props) {
  return (
    <Link
      target="_blank"
      className={`flex flex-col items-center justify-between bg-white rounded-xl shadow-md overflow-hidden transition-transform transform hover:scale-105 ${styleClass}`}
      style={{
        borderColor: bgColor,
        borderWidth: "4px",
        borderStyle: "solid",
      }}
      href={link}
    >
      {/* Imagen */}
      <div className="w-full flex-auto bg-gray-100 flex items-center justify-center p-4">
        <Image src={img} alt={title} width={128} height={128} />
      </div>
      {/* Contenido */}
      <footer
        className="w-full text-center p-4"
        style={{ backgroundColor: bgColor }}
      >
        <h2 className="text-xl font-bold" style={{ color: textColor }}>
          {title}
        </h2>
        <p className="text-md font-medium" style={{ color: textColor }}>
          {ofertas} Plazas
        </p>
      </footer>
    </Link>
  );
}
