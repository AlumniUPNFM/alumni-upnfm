/**
 * @fileoverview Componente DesarrolloProfesionalItem - Opción visual de formación continua
 *
 * Este componente representa una opción de desarrollo profesional, mostrando una imagen representativa
 * con un diseño plano, corporativo y degradados sutiles. Incluye efectos de hover modernos y responsivos.
 */

import Image from "next/image";
import Link from "next/link";

/**
 * @interface Props
 * @description Propiedades requeridas para el componente DesarrolloProfesionalItem
 * @property {string} image - URL de la imagen representativa
 * @property {number} idTipo - Identificador del tipo de formación
 * @property {string} [heightClass] - Clase opcional para la altura de la imagen
 * @property {string} [widthClass] - Clase opcional para el ancho de la imagen
 */
interface Props {
  image: string;
  heightClass?: string;
  idTipo: number;
  widthClass?: string;
}

/**
 * @component DesarrolloProfesionalItem
 * @description Opción visual de formación continua para egresados
 * @param {Props} props - Propiedades del componente
 * @returns {JSX.Element} Card visual de opción de formación
 */
export default function DesarrolloProfesionalItem({
  image,
  heightClass,
  idTipo,
  widthClass,
}: Props) {
  return (
    <article className="relative group border border-custom-green/10 rounded-xl bg-gradient-to-br from-gray-50/60 to-gray-100 p-2 shadow-sm transition-all duration-200 hover:border-custom-green/30">
      <Link href={`formaciones/${idTipo}`} className="block">
        <div className="overflow-hidden rounded-lg">
          <Image
            src={image}
            alt="Imagen"
            width={512}
            height={512}
            className={`w-full h-40 md:h-48 object-contain object-center transition-all duration-200 group-hover:scale-105 group-hover:rounded-2xl ${heightClass ?? ""} ${widthClass ?? ""}`}
          />
        </div>
      </Link>
    </article>
  );
}
