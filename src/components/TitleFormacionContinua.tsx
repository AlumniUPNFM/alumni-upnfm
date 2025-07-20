/**
 * @fileoverview Componente TitleFormacionContinua - Título y descripción de la sección de formación continua
 *
 * Este componente muestra el encabezado principal de la página de formación continua, con un diseño moderno,
 * profesional y visualmente impactante, con efectos sutiles y una jerarquía visual clara.
 */

/**
 * @component TitleFormacionContinua
 * @description Encabezado principal para la sección de formación continua
 * @returns {JSX.Element} Título y descripción de la sección
 */
export default function TitleFormacionContinua() {
  return (
    <section className="relative w-full bg-gradient-to-br from-gray-50 via-white to-gray-50/80 py-20 px-4 overflow-hidden font-montserrat">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(80,158,47,0.03),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(80,158,47,0.02),transparent_50%)]"></div>
      
      <div className="relative max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-custom-green/10 to-custom-green/5 border border-custom-green/20 rounded-full mb-8">
          <div className="w-2 h-2 bg-custom-green rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-custom-green/80 tracking-wide uppercase">
            Formación Continua
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
          <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            Caminamos contigo
          </span>
          <br />
          <span className="bg-gradient-to-r from-custom-green via-custom-green/90 to-custom-green bg-clip-text text-transparent">
            en cada paso
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
          Descubre las oportunidades que te esperan para fortalecer tu trayectoria profesional
        </p>

        {/* Description */}
        <div className="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 shadow-lg shadow-gray-200/50">
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
            Esta plataforma ofrece a los egresados una amplia gama de opciones educativas para 
            <span className="font-semibold text-custom-green"> fortalecer sus conocimientos </span>
            y 
            <span className="font-semibold text-custom-green"> avanzar en su desarrollo profesional</span>, 
            con programas diseñados específicamente para las necesidades del mercado actual.
          </p>
        </div>

        {/* Stats or highlights */}
        <div className="flex flex-wrap justify-center gap-8 mt-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-custom-green mb-2">+50</div>
            <div className="text-sm text-gray-600 uppercase tracking-wide">Programas<br></br>Disponibles</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-custom-green mb-2">100%</div>
            <div className="text-sm text-gray-600 uppercase tracking-wide">Entrenamiento<br></br>Online</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-custom-green mb-2">24/7</div>
            <div className="text-sm text-gray-600 uppercase tracking-wide">Acceso<br></br>Continuo</div>
          </div>
        </div>
      </div>
    </section>
  );
}
