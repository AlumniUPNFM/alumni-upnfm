/**
 * @fileoverview Componente DesarrolloProfesionalItem - Opción visual de formación continua
 *
 * Este componente representa una opción de desarrollo profesional, mostrando una imagen representativa
 * con un diseño moderno, profesional y visualmente impactante. Incluye efectos de hover avanzados y
 * información contextual para mejorar la experiencia del usuario.
 */

import Image from "next/image";
import Link from "next/link";
import { IconArrowRight, IconClock, IconUsers, IconStar } from "@tabler/icons-react";

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
 * @function getFormacionInfo
 * @description Obtiene información contextual basada en el tipo de formación
 * @param {number} idTipo - ID del tipo de formación
 * @returns {object} Información del tipo de formación
 */
const getFormacionInfo = (idTipo: number) => {
  const formaciones = {
    1: { title: "Diplomados", description: "Especialización profesional avanzada", duration: "6-12 meses", participants: "15-25", rating: 4.8 },
    2: { title: "Certificados", description: "Validación de competencias específicas", duration: "3-6 meses", participants: "20-30", rating: 4.6 },
    3: { title: "Conferencias", description: "Conocimiento de expertos del sector", duration: "1-2 días", participants: "50-200", rating: 4.7 },
    4: { title: "Talleres", description: "Experiencia práctica intensiva", duration: "1-3 días", participants: "10-20", rating: 4.9 },
    5: { title: "Cursos", description: "Aprendizaje especializado y flexible", duration: "1-3 meses", participants: "25-40", rating: 4.5 },
    6: { title: "Becas", description: "Oportunidades de financiamiento educativo", duration: "Variable", participants: "Limitado", rating: 4.9 },
    7: { title: "Postgrados", description: "Formación de alto nivel académico", duration: "12-24 meses", participants: "10-20", rating: 4.8 }
  };
  
  return formaciones[idTipo as keyof typeof formaciones] || { title: "Formación", description: "Desarrollo profesional", duration: "Variable", participants: "Variable", rating: 4.5 };
};

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
  const formacionInfo = getFormacionInfo(idTipo);

  return (
    <article className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-custom-green/5 via-transparent to-custom-green/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <Link href={`formaciones/${idTipo}`} className="block">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="aspect-[4/3] relative">
            <Image
              src={image}
              alt={`${formacionInfo.title} - ${formacionInfo.description}`}
              fill
              className={`object-contain object-center transition-all duration-700 group-hover:scale-110 ${heightClass ?? ""} ${widthClass ?? ""}`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
            
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Rating badge */}
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1 shadow-sm">
              <IconStar className="w-3 h-3 text-yellow-500 fill-current" />
              <span className="text-xs font-semibold text-gray-700">{formacionInfo.rating}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 relative">
          {/* Title and Description */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-custom-green transition-colors duration-300">
              {formacionInfo.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {formacionInfo.description}
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
            {/* <div className="flex items-center gap-1">
              <IconClock className="w-3 h-3" />
              <span>{formacionInfo.duration}</span>
            </div> */}
            <div className="flex items-center gap-1">
              <IconUsers className="w-3 h-3" />
              <span>{formacionInfo.participants}</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-custom-green group-hover:text-custom-green/80 transition-colors duration-300">
              Explorar programa
            </span>
            <div className="w-8 h-8 bg-custom-green/10 rounded-full flex items-center justify-center group-hover:bg-custom-green group-hover:text-white transition-all duration-300">
              <IconArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Hover effect border */}
        <div className="absolute inset-0 border-2 border-custom-green/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      </Link>
    </article>
  );
}
