/**
 * @fileoverview Componente TitleFormacionContinua - Título y descripción de la sección de formación continua
 *
 * Este componente muestra el encabezado principal de la página de formación continua, con un diseño plano,
 * corporativo y degradados sutiles, alineado al centro y con jerarquía visual clara.
 */

/**
 * @component TitleFormacionContinua
 * @description Encabezado principal para la sección de formación continua
 * @returns {JSX.Element} Título y descripción de la sección
 */
export default function TitleFormacionContinua() {
  return (
    <section className="flex flex-col gap-6 items-center w-full max-w-2xl m-auto text-center mt-24 font-montserrat">
      <h2 className="text-4xl md:text-3xl font-bold w-full bg-gradient-to-r from-custom-green/10 to-custom-green/5 rounded-xl py-6 px-4 text-gray-800">
        Caminamos contigo en cada paso de tu trayectoria profesional.
      </h2>
      <p className="w-full text-lg md:text-base text-gray-700 bg-gradient-to-r from-gray-50/60 to-gray-100 rounded-lg py-4 px-4">
        Esta plataforma ofrece a los egresados una amplia gama de opciones educativas para fortalecer sus conocimientos y avanzar en su desarrollo profesional.
      </p>
    </section>
  );
}
