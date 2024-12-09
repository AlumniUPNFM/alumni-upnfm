import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { useEventos } from "@/hooks/get-eventos";
import MainLayout from "@/layouts/MainLayout";
import { getDataFromSessionStorage } from "@/lib/alumni-session";
import { User } from "@/types/types";
import { IconSettings } from "@tabler/icons-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { dateToFCFormat } from "@/lib/date-to-fullcalendar-format";

export default function Calendar() {
  const [user, setUser] = useState<User | null>(null);
  const { eventos, loading, error } = useEventos();

  useEffect(() => {
    const user = getDataFromSessionStorage();
    setUser(user);
  }, []);

  return (
    <MainLayout>
      <header className="flex justify-between items-center font-montserrat">
        <h1 className="text-5xl font-semibold">Calendario de Actividades</h1>
        {user?.is_admin && (
          <Link
            href="/eventos"
            className="bg-primary text-white rounded-full p-2 flex items-center justify-center hover:bg-primary-dark transition-colors duration-200"
          >
            {/* Icono de configuración */}
            <IconSettings></IconSettings>
          </Link>
        )}
      </header>
      <main className="mt-12 font-montserrat">
        {loading && <p>Cargando eventos...</p>}
        {error && <p>Error al cargar los eventos</p>}
        {eventos?.length && (
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            firstDay={1}
            locale={"es"}
            height={"auto"}
            buttonText={{
              day: "Día",
              week: "Semana",
              month: "Mes",
              today: "Hoy",
              nextYear: "Siguiente año",
              prevYear: "Año anterior",
            }}
            events={
              (eventos ?? []).map((evento) => ({
                title: evento.name,
                date: dateToFCFormat(new Date(evento.fecha)),
                backgroundColor: "#003ca3",
                borderColor: "#003ca3",
              })) || []
            }
          />
        )}
      </main>
    </MainLayout>
  );
}
