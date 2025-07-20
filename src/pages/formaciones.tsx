"use client";

import MainLayout from "../layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";
import FormacionForm from "@/components/FormacionForm";
import { Formacion } from "@/services/formaciones.types";
import { DeleteFormacion, SaveFormacion } from "@/services/formaciones";
import { useFormaciones } from "@/hooks/get-formaciones";
import { 
  IconSchool, 
  IconPlus, 
  IconSearch, 
  IconRefresh, 
  IconEye, 
  IconFileText,
  IconUsers,
  IconClock,
  IconMapPin,
  IconBuilding,
  IconUserCheck,
  IconCalendar,
  IconLink,
  IconFilter,
  IconX,
  IconPencil,
  IconTrash
} from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { dateToFormat } from "@/lib/date-to-format";

export default function FormacionesMaintenance() {
  const { formaciones, loading, error, refresh } = useFormaciones();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTipo, setFilterTipo] = useState<string>("");
  const [filterCarrera, setFilterCarrera] = useState<string>("");
  const [filterModalidad, setFilterModalidad] = useState<string>("");
  const [filterEstado, setFilterEstado] = useState<string>("");

  const handleSave = async (formacion: Formacion) => {
    try {
      const updatedFormacion = {
        ...formacion,
      };
      const res = await SaveFormacion(updatedFormacion);
      if (res.isSuccess) {
        toast.success("Formación guardada correctamente");
        refresh();
      } else {
        console.log(res);
        toast.error(`Error al guardar la formación: ${res.message}`);
      }
    } catch (error) {
      console.error("Error al guardar la formación", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await DeleteFormacion(id);
      if (res.isSuccess) {
        toast.success("Formación eliminada correctamente");
        refresh();
      } else {
        toast.error("Error al eliminar la formación");
      }
    } catch (error) {
      console.error("Error al eliminar la formación", error);
    }
  };

  const getFormacionStatus = (fecha: Date) => {
    const now = new Date();
    const formacionDate = new Date(fecha);
    const diffTime = formacionDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { status: "Completada", variant: "secondary" as const, color: "bg-gray-100 text-gray-600" };
    } else if (diffDays === 0) {
      return { status: "Hoy", variant: "destructive" as const, color: "bg-red-100 text-red-600" };
    } else if (diffDays <= 7) {
      return { status: "Próxima", variant: "default" as const, color: "bg-green-100 text-green-600" };
    } else {
      return { status: "Programada", variant: "outline" as const, color: "bg-blue-100 text-blue-600" };
    }
  };

  const getUpcomingFormaciones = () => {
    const now = new Date();
    return formaciones?.filter(formacion => new Date(formacion.fecha) > now) || [];
  };

  const getPastFormaciones = () => {
    const now = new Date();
    return formaciones?.filter(formacion => new Date(formacion.fecha) <= now) || [];
  };

  const filteredFormaciones = formaciones?.filter(formacion => {
    const matchesSearch = 
      formacion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formacion.tipo?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formacion.degree?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formacion.modalidad.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formacion.institucion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formacion.descripcion.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTipo = !filterTipo || formacion.tipo?.name === filterTipo;
    const matchesCarrera = !filterCarrera || formacion.degree?.name === filterCarrera;
    const matchesModalidad = !filterModalidad || formacion.modalidad === filterModalidad;
    
    const status = getFormacionStatus(formacion.fecha);
    const matchesEstado = !filterEstado || status.status === filterEstado;

    return matchesSearch && matchesTipo && matchesCarrera && matchesModalidad && matchesEstado;
  });

  const tiposUnicos = [...new Set(formaciones?.map(f => f.tipo?.name).filter((name): name is string => Boolean(name)))];
  const carrerasUnicas = [...new Set(formaciones?.map(f => f.degree?.name).filter((name): name is string => Boolean(name)))];
  const modalidadesUnicas = [...new Set(
    formaciones?.map(f => f.modalidad?.trim().toLowerCase()).filter((modalidad): modalidad is string => Boolean(modalidad))
  )].map(modalidad => modalidad.charAt(0).toUpperCase() + modalidad.slice(1));
  const estadosUnicos = ["Completada", "Hoy", "Próxima", "Programada"];

  // Preparar opciones para los selects
  const tipoOptions = [
    { value: "", label: "Todos los tipos" },
    ...tiposUnicos.map(tipo => ({ value: tipo, label: tipo }))
  ];

  const carreraOptions = [
    { value: "", label: "Todas las carreras" },
    ...carrerasUnicas.map(carrera => ({ value: carrera, label: carrera }))
  ];

  const modalidadOptions = [
    { value: "", label: "Todas las modalidades" },
    ...modalidadesUnicas.map(modalidad => ({ value: modalidad, label: modalidad }))
  ];

  const estadoOptions = [
    { value: "", label: "Todos los estados" },
    ...estadosUnicos.map(estado => ({ value: estado, label: estado }))
  ];

  const clearFilters = () => {
    setSearchTerm("");
    setFilterTipo("");
    setFilterCarrera("");
    setFilterModalidad("");
    setFilterEstado("");
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
                    <IconSchool className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      Gestión de Formaciones
                    </h1>
                    <p className="text-gray-600 text-lg">
                      Administra y gestiona todas las formaciones y capacitaciones
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
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => setIsDialogOpen(true)}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                    >
                      <IconPlus className="w-5 h-5" />
                      Nueva Formación
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
                    <FormacionForm
                      formacion={{
                        id: -1,
                        created_at: new Date(),
                        degree_id: -1,
                        modalidad: "",
                        lugar: "",
                        capacidad: 0,
                        duracion: "",
                        name: "",
                        descripcion: "",
                        fecha: new Date(),
                        id_tipo: -1,
                        url: "",
                        institucion: "",
                        facultad: "",
                        instructor: "",
                      }}
                      onSave={(formacion) => {
                        handleSave(formacion);
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
                    <p className="text-sm font-medium text-gray-600">Total Formaciones</p>
                    <p className="text-3xl font-bold text-gray-900">{formaciones?.length || 0}</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <IconSchool className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Próximas Formaciones</p>
                    <p className="text-3xl font-bold text-gray-900">{getUpcomingFormaciones().length}</p>
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
                    <p className="text-sm font-medium text-gray-600">Capacidad Total</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {formaciones?.reduce((total, f) => total + (f.capacidad || 0), 0) || 0}
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <IconUsers className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Formaciones Completadas</p>
                    <p className="text-3xl font-bold text-gray-900">{getPastFormaciones().length}</p>
                  </div>
                  <div className="p-3 bg-gray-100 rounded-full">
                    <IconUserCheck className="w-6 h-6 text-gray-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg mb-6">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Search Bar */}
                <div className="relative">
                  <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Buscar formaciones por nombre, tipo, carrera, modalidad, institución o descripción..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-3 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl transition-all duration-200"
                  />
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <Select
                    options={tipoOptions}
                    value={filterTipo}
                    onValueChange={setFilterTipo}
                    placeholder="Tipo de Formación"
                    searchPlaceholder="Buscar tipo..."
                    className="border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg transition-all duration-200"
                  />

                  <Select
                    options={carreraOptions}
                    value={filterCarrera}
                    onValueChange={setFilterCarrera}
                    placeholder="Carrera"
                    searchPlaceholder="Buscar carrera..."
                    className="border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg transition-all duration-200"
                  />

                  <Select
                    options={modalidadOptions}
                    value={filterModalidad}
                    onValueChange={setFilterModalidad}
                    placeholder="Modalidad"
                    searchPlaceholder="Buscar modalidad..."
                    className="border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg transition-all duration-200"
                  />

                  <Select
                    options={estadoOptions}
                    value={filterEstado}
                    onValueChange={setFilterEstado}
                    placeholder="Estado"
                    searchPlaceholder="Buscar estado..."
                    className="border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg transition-all duration-200"
                  />

                  <Button
                    onClick={clearFilters}
                    variant="outline"
                    className="flex items-center gap-2 px-4 py-2 border-2 border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all duration-200"
                  >
                    <IconX className="w-4 h-4" />
                    Limpiar Filtros
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Formaciones Cards */}
          <div className="space-y-6">
            {loading && (
              <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="p-12">
                  <div className="flex flex-col items-center justify-center gap-4">
                    <LoadingSpinner size={48} />
                    <p className="text-gray-600 font-medium">Cargando formaciones...</p>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {error && (
              <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="p-12">
                  <div className="flex flex-col items-center justify-center gap-4">
                    <div className="p-4 bg-red-100 rounded-full">
                      <IconEye className="w-8 h-8 text-red-600" />
                    </div>
                    <div className="text-center">
                      <p className="text-red-600 font-semibold text-lg">Error al cargar los datos</p>
                      <p className="text-gray-600">Por favor, intenta nuevamente</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {!loading && !error && filteredFormaciones?.length === 0 && (
              <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="p-12">
                  <div className="flex flex-col items-center justify-center gap-4">
                    <div className="p-4 bg-gray-100 rounded-full">
                      <IconFileText className="w-8 h-8 text-gray-600" />
                    </div>
                    <div className="text-center">
                      <p className="text-gray-600 font-semibold text-lg">No se encontraron formaciones</p>
                      <p className="text-gray-500">Intenta ajustar los filtros de búsqueda</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {!loading && !error && filteredFormaciones && filteredFormaciones.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFormaciones.map((formacion) => {
                  const status = getFormacionStatus(formacion.fecha);
                  return (
                    <Card key={formacion.id} className="bg-white/95 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                              <IconSchool className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2">
                                {formacion.name}
                              </CardTitle>
                              <p className="text-sm text-gray-600">{formacion.tipo?.name}</p>
                            </div>
                          </div>
                          <Badge variant={status.variant} className="text-xs">
                            {status.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        {/* Descripción */}
                        <p className="text-sm text-gray-600 line-clamp-3">
                          {formacion.descripcion}
                        </p>

                        {/* Información Principal */}
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2">
                            <IconUserCheck className="w-4 h-4 text-sky-600" />
                            <span className="text-gray-700 font-medium">{formacion.degree?.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <IconClock className="w-4 h-4 text-green-600" />
                            <span className="text-gray-700">{formacion.modalidad}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <IconMapPin className="w-4 h-4 text-orange-600" />
                            <span className="text-gray-700">{formacion.lugar || "No especificado"}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <IconUsers className="w-4 h-4 text-teal-600" />
                            <span className="text-gray-700 font-medium">{formacion.capacidad} participantes</span>
                          </div>
                        </div>

                        {/* Fecha y Duración */}
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <IconCalendar className="w-4 h-4 text-red-600" />
                            <span className="text-gray-700">{dateToFormat(new Date(formacion.fecha))}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <IconClock className="w-4 h-4 text-blue-600" />
                            <span className="text-gray-700">{formacion.duracion}</span>
                          </div>
                        </div>

                        {/* Institución e Instructor */}
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <IconBuilding className="w-4 h-4 text-gray-600" />
                            <span className="text-gray-700">{formacion.institucion || "No especificada"}</span>
                          </div>
                          {formacion.instructor && (
                            <div className="flex items-center gap-2">
                              <IconUserCheck className="w-4 h-4 text-gray-600" />
                              <span className="text-gray-700">{formacion.instructor}</span>
                            </div>
                          )}
                        </div>

                        {/* URL */}
                        {formacion.url && (
                          <div className="flex items-center gap-2 text-sm">
                            <IconLink className="w-4 h-4 text-blue-600" />
                            <a 
                              href={formacion.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 hover:underline truncate"
                            >
                              Ver más información
                            </a>
                          </div>
                        )}

                        {/* Acciones */}
                        <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                                title="Editar formación"
                              >
                                <IconPencil className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
                              <FormacionForm
                                formacion={formacion}
                                onSave={handleSave}
                              />
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all duration-200"
                            onClick={() => handleDelete(formacion.id)}
                            title="Eliminar formación"
                          >
                            <IconTrash className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </main>
      </div>
    </MainLayout>
  );
}
