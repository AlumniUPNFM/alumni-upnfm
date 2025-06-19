"use client";

import MainLayout from "../layouts/MainLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";
import EventoForm from "@/components/EventoForm";
import { Evento } from "@/services/eventos.types";
import { DeleteEvento, SaveEvento } from "@/services/eventos";
import EventoRow from "@/components/EventoRow";
import { useEventos } from "@/hooks/get-eventos";
import { 
  IconCalendar, 
  IconPlus, 
  IconSearch, 
  IconRefresh, 
  IconEye, 
  IconFileText,
  IconCalendarEvent,
  IconClock,
  IconMapPin,
  IconUsers
} from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Badge } from "@/components/ui/badge";

export default function EventosMaintenance() {
  const { eventos, loading, error, refresh } = useEventos();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSave = async (evento: Evento) => {
    try {
      const updatedEvento = {
        ...evento,
      };
      const res = await SaveEvento(updatedEvento);
      if (res.isSuccess) {
        toast.success("Evento guardado correctamente");
        refresh();
      } else {
        toast.error("Error al guardar el evento");
      }
    } catch (error) {
      console.error("Error al guardar el evento", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await DeleteEvento(id);
      if (res.isSuccess) {
        toast.success("Evento eliminado correctamente");
        refresh();
      } else {
        toast.error("Error al eliminar el evento");
      }
    } catch (error) {
      console.error("Error al eliminar el evento", error);
    }
  };

  const filteredEventos = eventos?.filter(evento =>
    evento.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getUpcomingEvents = () => {
    const now = new Date();
    return eventos?.filter(evento => new Date(evento.fecha) > now) || [];
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
      return { status: "Completado", variant: "secondary" as const };
    } else if (diffDays === 0) {
      return { status: "Hoy", variant: "destructive" as const };
    } else if (diffDays <= 7) {
      return { status: "Próximo", variant: "default" as const };
    } else {
      return { status: "Programado", variant: "outline" as const };
    }
  };

  return (
    <MainLayout hideMargin>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
        <main className="max-w-7xl mx-auto p-6 font-montserrat">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg">
                    <IconCalendar className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      Gestión de Eventos
                    </h1>
                    <p className="text-gray-600 text-lg">
                      Administra y gestiona todos los eventos y actividades
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => refresh()}
                  variant="outline"
                  className="flex items-center gap-2 px-4 py-2 border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200"
                >
                  <IconRefresh className="w-4 h-4" />
                  Actualizar
                </Button>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => setIsDialogOpen(true)}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                    >
                      <IconPlus className="w-5 h-5" />
                      Nuevo Evento
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                    <EventoForm
                      evento={{
                        id: -1,
                        created_at: new Date(),
                        name: "",
                        fecha: new Date(),
                      }}
                      onSave={(evento) => {
                        handleSave(evento);
                        setIsDialogOpen(false);
                      }}
                    />
                  </DialogContent>
                </Dialog>
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
                  <div className="p-3 bg-purple-100 rounded-full">
                    <IconCalendar className="w-6 h-6 text-purple-600" />
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
                    <p className="text-3xl font-bold text-gray-900">
                      {eventos?.filter(e => {
                        const today = new Date();
                        const eventDate = new Date(e.fecha);
                        return eventDate.toDateString() === today.toDateString();
                      }).length || 0}
                    </p>
                  </div>
                  <div className="p-3 bg-red-100 rounded-full">
                    <IconCalendarEvent className="w-6 h-6 text-red-600" />
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

          {/* Search and Filters */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                <div className="relative flex-1 max-w-md">
                  <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Buscar eventos por nombre..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-3 border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-xl transition-all duration-200"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Table Section */}
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-purple-50 border-b border-gray-200">
              <CardTitle className="text-xl font-semibold text-gray-800">
                Lista de Eventos
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table className="w-full">
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-gray-100 to-purple-100 hover:bg-gradient-to-r hover:from-gray-100 hover:to-purple-100">
                      <TableHead className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <IconCalendar className="w-4 h-4" />
                          Evento
                        </div>
                      </TableHead>
                      <TableHead className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <IconClock className="w-4 h-4" />
                          Fecha y Hora
                        </div>
                      </TableHead>
                      <TableHead className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <IconMapPin className="w-4 h-4" />
                          Estado
                        </div>
                      </TableHead>
                      <TableHead className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Acciones
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="divide-y divide-gray-100">
                    {loading && (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-12">
                          <div className="flex flex-col items-center gap-4">
                            <LoadingSpinner size={48} />
                            <p className="text-gray-600 font-medium">Cargando eventos...</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                    {error && (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-12">
                          <div className="flex flex-col items-center gap-4">
                            <div className="p-4 bg-red-100 rounded-full">
                              <IconEye className="w-8 h-8 text-red-600" />
                            </div>
                            <div>
                              <p className="text-red-600 font-semibold text-lg">Error al cargar los datos</p>
                              <p className="text-gray-600">Por favor, intenta nuevamente</p>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                    {!loading && !error && filteredEventos?.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-12">
                          <div className="flex flex-col items-center gap-4">
                            <div className="p-4 bg-gray-100 rounded-full">
                              <IconFileText className="w-8 h-8 text-gray-600" />
                            </div>
                            <div>
                              <p className="text-gray-600 font-semibold text-lg">No se encontraron eventos</p>
                              <p className="text-gray-500">Intenta ajustar los filtros de búsqueda</p>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                    {filteredEventos?.map((evento) => {
                      const status = getEventStatus(evento.fecha);
                      return (
                        <EventoRow
                          key={evento.id}
                          evento={evento}
                          onSave={handleSave}
                          onDelete={handleDelete}
                          status={status}
                        />
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </MainLayout>
  );
}
