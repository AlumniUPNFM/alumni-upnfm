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
      <section className="grid grid-cols-3 mt-12 gap-4 font-montserrat">
        <div className="col-span-3 xl:col-span-1 flex flex-col gap-4">
          <DesarrolloProfesionalItem
            title="Diplomados"
            image="/children.webp"
            heightClass="h-64"
            idTipo={1}
          />
          <DesarrolloProfesionalItem
            title="Certificados"
            image="/children.webp"
            heightClass="h-64"
            idTipo={2}
          />
        </div>
        <div className="col-span-3 xl:col-span-1 flex flex-col gap-4">
          <div className="col-span-3 xl:col-span-1 flex gap-4">
          <DesarrolloProfesionalItem
            title=""
            image="/Logo-Conferencias-Alumni-UPNFM.webp"
            heightClass="h-64"
            widthClass="w-64"
            idTipo={3}
          />
          <DesarrolloProfesionalItem
            title=""
            image="/Logo-Talleres-Alumni-UPNFM.webp"
            heightClass="h-64"
            widthClass="w-64"
            idTipo={4}
          />
          </div>
          <div className="col-span-3 xl:col-span-1 flex gap-4">
          <DesarrolloProfesionalItem
            title=""
            image="/Logo-Cursos-Alumni-UPNFM.webp"
            heightClass="h-64"
            widthClass="w-64"
            idTipo={5}
          />
          <DesarrolloProfesionalItem
            title=""
            image="/Logo-Cursos-Alumni-UPNFM.webp"
            heightClass="h-64"
            widthClass="w-64"
            idTipo={6}
          />
          </div>
        </div>
        <div className="col-span-3 xl:col-span-1 flex flex-col gap-4">
          <DesarrolloProfesionalItem
            title="Post-Grados"
            image="/books-w-headset.webp"
            heightClass="h-[34rem]"
            idTipo={7}
          />
        </div>
      </section>
    </>
  );
}
