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
import { 
  IconSettings, 
  IconCalendar, 
  IconClock, 
  IconUsers, 
  IconMapPin,
  IconEye,
  IconFileText,
  IconRefresh,
  IconPlus
} from "@tabler/icons-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { dateToFCFormat } from "@/lib/date-to-fullcalendar-format";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Badge } from "@/components/ui/badge";

export default function Calendar() {
  const [user, setUser] = useState<User | null>(null);
  const { eventos, loading, error, refresh } = useEventos();

  useEffect(() => {
    const user = getDataFromSessionStorage();
    setUser(user);
  }, []);

  const getUpcomingEvents = () => {
    const now = new Date();
    return eventos?.filter(evento => new Date(evento.fecha) > now) || [];
  };

  const getTodayEvents = () => {
    const today = new Date();
    return eventos?.filter(evento => {
      const eventDate = new Date(evento.fecha);
      return eventDate.toDateString() === today.toDateString();
    }) || [];
  };

  const getPastEvents = () => {
    const now = new Date();
    return eventos?.filter(evento => new Date(evento.fecha) <= now) || [];
  };

  const getEventStatus = (fecha: Date) => {
    const now = new Date();
    const eventDate = new Date(fecha);
    const diffTime = eventDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { status: "Completado", variant: "secondary" as const, color: "bg-gray-100 text-gray-600" };
    } else if (diffDays === 0) {
      return { status: "Hoy", variant: "destructive" as const, color: "bg-red-100 text-red-600" };
    } else if (diffDays <= 7) {
      return { status: "Próximo", variant: "default" as const, color: "bg-green-100 text-green-600" };
    } else {
      return { status: "Programado", variant: "outline" as const, color: "bg-blue-100 text-blue-600" };
    }
  };

  return (
    <MainLayout hideMargin>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-100">
        <main className="max-w-7xl mx-auto p-6 font-montserrat">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-r from-blue-600 to-sky-600 rounded-xl shadow-lg">
                    <IconCalendar className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      Calendario de Actividades
                    </h1>
                    <p className="text-gray-600 text-lg">
                      Mantente al día con los eventos y actividades de la comunidad
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => refresh()}
                  variant="outline"
                  className="flex items-center gap-2 px-4 py-2 border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                >
                  <IconRefresh className="w-4 h-4" />
                  Actualizar
                </Button>
                {user?.is_admin && (
                  <Link href="/eventos">
                    <Button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                      <IconSettings className="w-5 h-5" />
                      Gestionar Eventos
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Eventos</p>
                    <p className="text-3xl font-bold text-gray-900">{eventos?.length || 0}</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <IconCalendar className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Próximos Eventos</p>
                    <p className="text-3xl font-bold text-gray-900">{getUpcomingEvents().length}</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <IconClock className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Eventos Hoy</p>
                    <p className="text-3xl font-bold text-gray-900">{getTodayEvents().length}</p>
                  </div>
                  <div className="p-3 bg-red-100 rounded-full">
                    <IconMapPin className="w-6 h-6 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Eventos Pasados</p>
                    <p className="text-3xl font-bold text-gray-900">{getPastEvents().length}</p>
                  </div>
                  <div className="p-3 bg-gray-100 rounded-full">
                    <IconUsers className="w-6 h-6 text-gray-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Calendar Section */}
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
              <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                <IconCalendar className="w-6 h-6 text-blue-600" />
                Vista de Calendario
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {loading && (
                <div className="flex flex-col items-center justify-center py-12">
                  <LoadingSpinner size={48} />
                  <p className="text-gray-600 font-medium mt-4">Cargando eventos del calendario...</p>
                </div>
              )}
              
              {error && (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="p-4 bg-red-100 rounded-full mb-4">
                    <IconEye className="w-8 h-8 text-red-600" />
                  </div>
                  <div className="text-center">
                    <p className="text-red-600 font-semibold text-lg">Error al cargar los eventos</p>
                    <p className="text-gray-600">Por favor, intenta nuevamente</p>
                  </div>
                </div>
              )}

              {!loading && !error && eventos?.length > 0 && (
                <div className="space-y-6">
                  {/* Calendar Legend */}
                  <div className="flex flex-wrap items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Leyenda:</span>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-600 rounded"></div>
                      <span className="text-sm text-gray-600">Eventos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="default">Próximo</Badge>
                      <Badge variant="destructive">Hoy</Badge>
                      <Badge variant="secondary">Completado</Badge>
                    </div>
                  </div>

                  {/* FullCalendar Component */}
                  <div className="calendar-container">
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
                      events={(eventos ?? []).map((evento) => {
                        const status = getEventStatus(evento.fecha);
                        return {
                          title: evento.name,
                          date: dateToFCFormat(new Date(evento.fecha)),
                          backgroundColor: status.variant === "destructive" ? "#dc2626" : 
                                         status.variant === "secondary" ? "#6b7280" : "#059669",
                          borderColor: status.variant === "destructive" ? "#dc2626" : 
                                     status.variant === "secondary" ? "#6b7280" : "#059669",
                          textColor: "#ffffff",
                          className: "hover:opacity-90 transition-all duration-200 cursor-pointer shadow-sm"
                        };
                      })}
                      eventTimeFormat={{
                        hour: '2-digit',
                        minute: '2-digit',
                        meridiem: false
                      }}
                      dayMaxEvents={true}
                      moreLinkContent={(args) => `+${args.num} más`}
                      eventDisplay="block"
                      eventDidMount={(info) => {
                        info.el.style.borderRadius = '8px';
                        info.el.style.fontWeight = '500';
                        info.el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                      }}
                      dayCellDidMount={(info) => {
                        info.el.style.borderRadius = '8px';
                      }}
                      titleFormat={{ 
                        year: 'numeric', 
                        month: 'long' 
                      }}
                    />
                  </div>
                </div>
              )}

              {!loading && !error && (!eventos || eventos.length === 0) && (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="p-4 bg-gray-100 rounded-full mb-4">
                    <IconFileText className="w-8 h-8 text-gray-600" />
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600 font-semibold text-lg">No hay eventos programados</p>
                    <p className="text-gray-500">No se encontraron eventos en el calendario</p>
                    {user?.is_admin && (
                      <div className="mt-4">
                        <Link href="/eventos">
                          <Button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white rounded-lg transition-all duration-200">
                            <IconPlus className="w-4 h-4" />
                            Crear Primer Evento
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Events Preview */}
          {!loading && !error && getUpcomingEvents().length > 0 && (
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg mt-8">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <IconClock className="w-5 h-5 text-blue-600" />
                  Próximos Eventos
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getUpcomingEvents().slice(0, 6).map((evento) => {
                    const status = getEventStatus(evento.fecha);
                    return (
                      <div key={evento.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-200">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-gray-900 text-sm">{evento.name}</h4>
                          <Badge variant={status.variant} className="text-xs">
                            {status.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600">
                          {new Date(evento.fecha).toLocaleDateString('es-ES', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </main>
      </div>

      <style jsx global>{`
        .calendar-container .fc {
          font-family: 'Montserrat', sans-serif;
        }
        
        .calendar-container .fc-toolbar {
          background: linear-gradient(135deg, #f8fafc 0%, #ecfdf5 100%);
          border-radius: 12px;
          padding: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .calendar-container .fc-toolbar-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
        }
        
        .calendar-container .fc-button {
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
          border: none;
          border-radius: 8px;
          padding: 0.5rem 1rem;
          font-weight: 600;
          transition: all 0.2s ease;
        }
        
        .calendar-container .fc-button:hover {
          background: linear-gradient(135deg, #047857 0%, #065f46 100%);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);
        }
        
        .calendar-container .fc-button:active {
          transform: translateY(0);
        }
        
        .calendar-container .fc-daygrid-day {
          border-radius: 8px;
          transition: all 0.2s ease;
        }
        
        .calendar-container .fc-daygrid-day:hover {
          background-color: #f0fdf4;
        }
        
        .calendar-container .fc-day-today {
          background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%) !important;
          border-radius: 8px;
        }
        
        .calendar-container .fc-event {
          border-radius: 8px;
          font-weight: 500;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          transition: all 0.2s ease;
        }
        
        .calendar-container .fc-event:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }
        
        .calendar-container .fc-daygrid-day-number {
          font-weight: 600;
          color: #374151;
        }
        
        .calendar-container .fc-col-header-cell {
          background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
          border-radius: 8px 8px 0 0;
          font-weight: 600;
          color: #374151;
        }
        
        @media (max-width: 768px) {
          .calendar-container .fc-toolbar {
            flex-direction: column;
            gap: 1rem;
          }
          
          .calendar-container .fc-toolbar-chunk {
            display: flex;
            justify-content: center;
          }
        }
      `}</style>
    </MainLayout>
  );
}
