/**
 * Calendar Component
 * 
 * A modern and corporate-styled calendar component that displays events and activities.
 * Features:
 * - Full calendar integration with month view
 * - Admin controls for event management
 * - Responsive design with modern UI elements
 * - Spanish localization
 * - Loading and error states
 */

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
      <div className="min-h-screen">
        <header className="flex justify-between items-center font-montserrat mb-12">
          <div>
            <h1 className="text-4xl font-semibold text-custom-black">
              Calendario de Actividades
            </h1>
            <p className="text-custom-gray mt-2">
              Mantente al día con los eventos y actividades de la comunidad
            </p>
          </div>
          {user?.is_admin && (
            <Link
              href="/eventos"
              className="bg-custom-yellow text-custom-black rounded-full p-3 flex items-center justify-center hover:bg-opacity-90 transition-all duration-200"
              title="Gestionar eventos"
            >
              <IconSettings size={24} />
            </Link>
          )}
        </header>

        <main className="font-montserrat">
          {loading && (
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-custom-yellow"></div>
              <span className="ml-4 text-custom-gray">Cargando eventos...</span>
            </div>
          )}
          
          {error && (
            <div className="border-l-4 border-custom-orange p-4">
              <p className="text-custom-orange">Error al cargar los eventos. Por favor, intenta nuevamente.</p>
            </div>
          )}

          {eventos?.length > 0 && (
            <div className="p-4">
              <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                firstDay={1}
                locale="es"
                height="auto"
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth'
                }}
                buttonText={{
                  day: "Día",
                  week: "Semana",
                  month: "Mes",
                  today: "Hoy",
                  nextYear: "Siguiente año",
                  prevYear: "Año anterior",
                }}
                events={(eventos ?? []).map((evento) => ({
                  title: evento.name,
                  date: dateToFCFormat(new Date(evento.fecha)),
                  backgroundColor: "#509E2F",
                  borderColor: "#509E2F",
                  textColor: "#FAFAFA",
                  className: "hover:opacity-90 transition-opacity duration-200"
                }))}
                eventTimeFormat={{
                  hour: '2-digit',
                  minute: '2-digit',
                  meridiem: false
                }}
                dayMaxEvents={true}
                moreLinkContent={(args) => `+${args.num} más`}
                eventDisplay="block"
                eventDidMount={(info) => {
                  info.el.style.borderRadius = '4px';
                }}
              />
            </div>
          )}

          {!loading && !error && (!eventos || eventos.length === 0) && (
            <div className="text-center p-8">
              <p className="text-custom-gray">No hay eventos programados en este momento.</p>
            </div>
          )}
        </main>
      </div>
    </MainLayout>
  );
}
