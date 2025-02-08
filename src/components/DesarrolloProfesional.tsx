import { getDataFromSessionStorage } from "@/lib/alumni-session";
import { useState, useEffect } from "react";
import DesarrolloProfesionalItem from "./DesarrolloProfesionalItem";
import { User } from "@/types/types";
import Link from "next/link";
import { IconSettings } from "@tabler/icons-react";

export default function DesarrolloProfesional() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const user = getDataFromSessionStorage();
    setUser(user);
  }, []);
  return (
    <>
      {user?.is_admin && (
        <header className="flex gap-2 items-center justify-between font-montserrat">
          <h2 className="text-4xl font-bold">Mantenimiento de Formaciones</h2>
          <Link
            href="/formaciones"
            className="bg-primary text-white rounded-full p-2 flex items-center justify-center hover:bg-primary-dark transition-colors duration-200"
          >
            {/* Icono de configuración */}
            <IconSettings></IconSettings>
          </Link>
        </header>
      )}
      <section className="grid grid-rows-2 mt-12 gap-4 font-montserrat">
        <div className="flex gap-4 justify-center">
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
        <div className="flex gap-4 justify-center">
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
      </section>
    </>
  );
}
