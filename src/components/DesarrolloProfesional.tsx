/**
 * @fileoverview Componente DesarrolloProfesional - Opciones de formación continua para egresados
 *
 * Este componente muestra las diferentes opciones de desarrollo profesional disponibles para los egresados,
 * con un diseño moderno, profesional y visualmente impactante, con una presentación clara y organizada.
 */

import { getDataFromSessionStorage } from "@/lib/alumni-session";
import { useState, useEffect } from "react";
import DesarrolloProfesionalItem from "./DesarrolloProfesionalItem";
import { User } from "@/types/types";
import Link from "next/link";
import { IconSettings, IconSchool, IconCertificate, IconBook } from "@tabler/icons-react";

/**
 * @component DesarrolloProfesional
 * @description Muestra las opciones de formación continua y desarrollo profesional para egresados
 * @returns {JSX.Element} Sección de desarrollo profesional
 */
export default function DesarrolloProfesional() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const user = getDataFromSessionStorage();
    setUser(user);
  }, []);

  return (
    <section className="relative w-full bg-white py-16 px-4 font-montserrat">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(80,158,47,0.02)_25%,rgba(80,158,47,0.02)_75%,transparent_75%)] bg-[length:20px_20px]"></div>
      
      <div className="relative max-w-7xl mx-auto">
        {/* Admin Header */}
        {user?.is_admin && (
          <header className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-16 p-6 bg-gradient-to-r from-custom-green/5 to-custom-green/10 border border-custom-green/20 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-custom-green/20 rounded-lg">
                <IconSettings className="w-6 h-6 text-custom-green" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Panel de Administración</h2>
                <p className="text-gray-600 text-sm">Gestiona las formaciones disponibles</p>
              </div>
            </div>
            <Link
              href="/formaciones"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-custom-green to-custom-green/90 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-custom-green/25 transition-all duration-300 transform hover:-translate-y-0.5"
              title="Gestionar formaciones"
            >
              <IconSettings className="w-5 h-5" />
              Gestionar
            </Link>
          </header>
        )}

        {/* Main Content */}
        <div className="space-y-16">
          {/* Academic Programs Section */}
          <div className="space-y-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full mb-4">
                <IconSchool className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-700 uppercase tracking-wide">
                  Programas Académicos
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Formación Académica Avanzada
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Programas de alto nivel diseñados para especializarte y avanzar en tu carrera profesional
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <DesarrolloProfesionalItem 
                image="/UPNFM-Diplomados-Alumni.webp" 
                idTipo={1}
              />
              <DesarrolloProfesionalItem 
                image="/UPNFM-Certificado-Alumni.webp" 
                idTipo={2}
              />
              <DesarrolloProfesionalItem 
                image="/UPNFM-Becas-Alumni.webp" 
                idTipo={6}
              />
              <DesarrolloProfesionalItem 
                image="/UPNFM-Postgrado-Alumni.webp" 
                idTipo={7}
              />
            </div>
          </div>

          {/* Professional Development Section */}
          <div className="space-y-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-orange-50 border border-orange-200 rounded-full mb-4">
                <IconCertificate className="w-5 h-5 text-orange-600" />
                <span className="text-sm font-medium text-orange-700 uppercase tracking-wide">
                  Desarrollo Profesional
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Habilidades y Competencias
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Cursos, talleres y conferencias para desarrollar habilidades específicas del mercado laboral
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DesarrolloProfesionalItem 
                image="/Cursos2_Logo.webp" 
                idTipo={5}
              />
              <DesarrolloProfesionalItem 
                image="/Taller2_Logo.webp" 
                idTipo={4}
              />
              <DesarrolloProfesionalItem 
                image="/Confe2_Logo.webp" 
                idTipo={3}
              />
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-custom-green/5 to-custom-green/10 border border-custom-green/20 rounded-2xl p-8">
            <IconBook className="w-12 h-12 text-custom-green mx-auto mb-4" />
            <h4 className="text-2xl font-bold text-gray-900 mb-4">
              ¿Listo para dar el siguiente paso?
            </h4>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Explora nuestros programas y encuentra la formación perfecta para impulsar tu carrera profesional
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-custom-green">Flexible</div>
                <div className="text-sm text-gray-600">Horarios adaptables</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-custom-green">Práctico</div>
                <div className="text-sm text-gray-600">Contenido aplicable</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-custom-green">Certificado</div>
                <div className="text-sm text-gray-600">Reconocimiento oficial</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
