/**
 * @fileoverview Página de Formación Continua - Opciones de desarrollo profesional para egresados
 *
 * Esta página presenta la oferta de formación continua para egresados, mostrando opciones educativas
 * y de desarrollo profesional en un entorno visual corporativo, plano y con degradados sutiles.
 */

import MainLayout from "@/layouts/MainLayout";
import DesarrolloProfesional from "@/components/DesarrolloProfesional";
import TitleFormacionContinua from "@/components/TitleFormacionContinua";

/**
 * @component FormacionContinua
 * @description Página principal de formación continua para egresados
 * @returns {JSX.Element} Página de formación continua
 */
export default function FormacionContinua() {
  return (
    <MainLayout hideMargin>
      <TitleFormacionContinua />
      <DesarrolloProfesional />
    </MainLayout>
  );
}
