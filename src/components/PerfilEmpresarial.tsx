/**
 * @fileoverview Componente PerfilEmpresarial - Muestra el perfil visual de una empresa/institución
 *
 * Este componente presenta la información principal de una empresa aliada, incluyendo su logo,
 * nombre y cantidad de plazas, con un diseño plano, corporativo y degradados sutiles.
 */

import Image from "next/image";
import Link from "next/link";

/**
 * @interface Props
 * @description Propiedades requeridas para el componente PerfilEmpresarial
 * @property {string} title - Nombre de la empresa/institución
 * @property {number} ofertas - Número de plazas/ofertas disponibles
 * @property {string} img - URL de la imagen/logo de la empresa
 * @property {string} bgColor - Color de fondo personalizado para el pie
 * @property {string} [textColor] - Color del texto en el pie (opcional)
 * @property {string} [styleClass] - Clases adicionales para el contenedor principal (opcional)
 * @property {string} link - URL externa al perfil de la empresa
 */
interface Props {
  title: string;
  ofertas: number;
  img: string;
  bgColor: string;
  textColor?: string;
  styleClass?: string;
  link: string;
}

/**
 * @component PerfilEmpresarial
 * @description Componente visual para mostrar el perfil de una empresa/institución aliada
 * @param {Props} props - Propiedades del componente
 * @returns {JSX.Element} Card visual de empresa
 */
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
      className={`flex flex-col items-center justify-between rounded-xl overflow-hidden border border-primary/10 transition-all duration-200 hover:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/30 min-h-[260px] ${styleClass}`}
      style={{ background: "linear-gradient(135deg, #f8fafc 80%, #e0e7ef 100%)" }}
      href={link}
    >
      {/* Imagen */}
      <div className="w-full flex-auto flex items-center justify-center p-6 bg-gradient-to-br from-primary/5 to-primary/10">
        <Image src={img} alt={title} width={96} height={96} className="rounded-lg object-contain max-h-20" />
      </div>
      {/* Contenido */}
      <footer
        className="w-full text-center p-4"
        style={{ backgroundColor: bgColor }}
      >
        <h2 className="text-lg font-bold truncate" style={{ color: textColor }}>
          {title}
        </h2>
        <p className="text-md font-medium" style={{ color: textColor }}>
          {ofertas} Plazas
        </p>
      </footer>
    </Link>
  );
}
