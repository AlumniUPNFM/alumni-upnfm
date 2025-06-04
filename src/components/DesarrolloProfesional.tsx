/**
 * @fileoverview Componente DesarrolloProfesional - Opciones de formación continua para egresados
 *
 * Este componente muestra las diferentes opciones de desarrollo profesional disponibles para los egresados,
 * con un diseño plano, corporativo y degradados sutiles, y una presentación visual clara y moderna.
 */

import { getDataFromSessionStorage } from "@/lib/alumni-session";
import { useState, useEffect } from "react";
import DesarrolloProfesionalItem from "./DesarrolloProfesionalItem";
import { User } from "@/types/types";
import Link from "next/link";
import { IconSettings } from "@tabler/icons-react";

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
    <section className="max-w-5xl mx-auto mt-16 mb-12 px-4">
      {user?.is_admin && (
        <header className="flex gap-2 items-center justify-between font-montserrat mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Mantenimiento de Formaciones</h2>
          <Link
            href="/formaciones"
            className="bg-gradient-to-r from-primary/90 to-primary text-white rounded-lg p-2 flex items-center justify-center hover:opacity-90 transition-all duration-200"
            title="Gestionar formaciones"
          >
            <IconSettings className="w-5 h-5" />
          </Link>
        </header>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <DesarrolloProfesionalItem image="/UPNFM-Diplomados-Alumni.webp" idTipo={1} />
          <DesarrolloProfesionalItem image="/UPNFM-Certificado-Alumni.webp" idTipo={2} />
          <DesarrolloProfesionalItem image="/UPNFM-Becas-Alumni.webp" idTipo={6} />
          <DesarrolloProfesionalItem image="/UPNFM-Postgrado-Alumni.webp" idTipo={7} />
        </div>
        <div className="flex flex-col gap-4">
          <DesarrolloProfesionalItem image="/Cursos2_Logo.webp" idTipo={5} />
          <DesarrolloProfesionalItem image="/Taller2_Logo.webp" idTipo={4} />
          <DesarrolloProfesionalItem image="/Confe2_Logo.webp" idTipo={3} />
        </div>
      </div>
    </section>
  );
}
