"use client";

import Image from "next/image";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Trabajo } from "@/services/trabajos.types";
import { toast } from "sonner";
import { useState } from "react";
import { useTrabajos } from "@/hooks/get-trabajos";
import { DeleteTrabajo, SaveTrabajo } from "@/services/trabajos";
import { 
  IconFilePlus, 
  IconPencil, 
  IconTrash, 
  IconBriefcase,
  IconSearch,
  IconFilter,
  IconRefresh,
  IconEye,
  IconBuilding,
  IconMapPin,
  IconCurrency,
  IconClock,
  IconUserCheck,
  IconLanguage,
  IconFileText,
  IconX,
  IconLink
} from "@tabler/icons-react";
import TrabajoForm from "@/components/TrabajoForm";
import { URL_BASE } from "@/config/constants";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Select } from "@/components/ui/select";

export default function TrabajosMaintenance() {
  const { trabajos, loading, error, refreshTrabajos } = useTrabajos();
  const [trabajoToEdit, setTrabajoToEdit] = useState<Trabajo | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEmpresa, setFilterEmpresa] = useState<string>("");
  const [filterCarrera, setFilterCarrera] = useState<string>("");
  const [filterTipoOferta, setFilterTipoOferta] = useState<string>("");
  const [filterUbicacion, setFilterUbicacion] = useState<string>("");

  const handleSaveTrabajo = async (trabajo: Trabajo) => {
    try {
      const res = await SaveTrabajo(trabajo);
      if (res.isSuccess) {
        toast.success("Trabajo guardado correctamente");
        setTrabajoToEdit(null);
        setIsAddDialogOpen(false);
        await refreshTrabajos();
      } else {
        toast.error("Error al guardar el trabajo");
      }
    } catch (error) {
      console.error("Error al guardar el trabajo", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await DeleteTrabajo(id);
      if (res.isSuccess) {
        toast.success("Trabajo eliminado correctamente");
        await refreshTrabajos();
      } else {
        toast.error("Error al eliminar el trabajo");
      }
    } catch (error) {
      console.error("Error al eliminar el trabajo", error);
    }
  };

  const getStatusBadge = (tipoOferta: string) => {
    const variants = {
      "Tiempo Completo": "default",
      "Medio Tiempo": "secondary",
      "Freelance": "outline",
      "Práctica": "destructive"
    } as const;
    
    return (
      <Badge variant={variants[tipoOferta as keyof typeof variants] || "outline"}>
        {tipoOferta}
      </Badge>
    );
  };

  const filteredTrabajos = trabajos?.filter(trabajo => {
    const matchesSearch = 
      trabajo.puesto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trabajo.empresa?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trabajo.degree?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trabajo.ubicacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trabajo.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trabajo.jornada.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trabajo.contrato.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesEmpresa = !filterEmpresa || trabajo.empresa?.name === filterEmpresa;
    const matchesCarrera = !filterCarrera || trabajo.degree?.name === filterCarrera;
    const matchesTipoOferta = !filterTipoOferta || trabajo.tipo_oferta === filterTipoOferta;
    const matchesUbicacion = !filterUbicacion || trabajo.ubicacion === filterUbicacion;

    return matchesSearch && matchesEmpresa && matchesCarrera && matchesTipoOferta && matchesUbicacion;
  });

  const empresasUnicas = [...new Set(trabajos?.map(t => t.empresa?.name).filter((name): name is string => Boolean(name)))];
  const carrerasUnicas = [...new Set(trabajos?.map(t => t.degree?.name).filter((name): name is string => Boolean(name)))];
  const tiposOfertaUnicos = [...new Set(trabajos?.map(t => t.tipo_oferta).filter((tipo): tipo is string => Boolean(tipo)))];
  const ubicacionesUnicas = [...new Set(trabajos?.map(t => t.ubicacion).filter((ubicacion): ubicacion is string => Boolean(ubicacion)))];

  // Preparar opciones para los selects
  const empresaOptions = [
    { value: "", label: "Todas las empresas" },
    ...empresasUnicas.map(empresa => ({ value: empresa, label: empresa }))
  ];

  const carreraOptions = [
    { value: "", label: "Todas las carreras" },
    ...carrerasUnicas.map(carrera => ({ value: carrera, label: carrera }))
  ];

  const tipoOfertaOptions = [
    { value: "", label: "Todos los tipos" },
    ...tiposOfertaUnicos.map(tipo => ({ value: tipo, label: tipo }))
  ];

  const ubicacionOptions = [
    { value: "", label: "Todas las ubicaciones" },
    ...ubicacionesUnicas.map(ubicacion => ({ value: ubicacion, label: ubicacion }))
  ];

  const clearFilters = () => {
    setSearchTerm("");
    setFilterEmpresa("");
    setFilterCarrera("");
    setFilterTipoOferta("");
    setFilterUbicacion("");
  };

  return (
    <MainLayout hideMargin>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <main className="max-w-7xl mx-auto p-6 font-montserrat">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg">
                    <IconBriefcase className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      Gestión de Ofertas Laborales
                    </h1>
                    <p className="text-gray-600 text-lg">
                      Administra y gestiona todas las ofertas de trabajo disponibles
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => refreshTrabajos()}
                  variant="outline"
                  className="flex items-center gap-2 px-4 py-2 border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                >
                  <IconRefresh className="w-4 h-4" />
                  Actualizar
                </Button>
                <Button
                  onClick={() => setIsAddDialogOpen(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                >
                  <IconFilePlus className="w-5 h-5" />
                  Nueva Oferta
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Ofertas</p>
                    <p className="text-3xl font-bold text-gray-900">{trabajos?.length || 0}</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <IconBriefcase className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Empresas Activas</p>
                    <p className="text-3xl font-bold text-gray-900">{empresasUnicas.length}</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <IconBuilding className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Carreras</p>
                    <p className="text-3xl font-bold text-gray-900">{carrerasUnicas.length}</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <IconUserCheck className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Ubicaciones</p>
                    <p className="text-3xl font-bold text-gray-900">{ubicacionesUnicas.length}</p>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-full">
                    <IconMapPin className="w-6 h-6 text-orange-600" />
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
                    placeholder="Buscar ofertas por puesto, empresa, carrera, ubicación, descripción, jornada o contrato..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-3 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl transition-all duration-200"
                  />
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <Select
                    options={empresaOptions}
                    value={filterEmpresa}
                    onValueChange={setFilterEmpresa}
                    placeholder="Empresa"
                    searchPlaceholder="Buscar empresa..."
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
                    options={tipoOfertaOptions}
                    value={filterTipoOferta}
                    onValueChange={setFilterTipoOferta}
                    placeholder="Tipo de Oferta"
                    searchPlaceholder="Buscar tipo..."
                    className="border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg transition-all duration-200"
                  />

                  <Select
                    options={ubicacionOptions}
                    value={filterUbicacion}
                    onValueChange={setFilterUbicacion}
                    placeholder="Ubicación"
                    searchPlaceholder="Buscar ubicación..."
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

          {/* Trabajos Cards */}
          <div className="space-y-6">
            {loading && (
              <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="p-12">
                  <div className="flex flex-col items-center justify-center gap-4">
                    <LoadingSpinner size={48} />
                    <p className="text-gray-600 font-medium">Cargando ofertas laborales...</p>
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

            {!loading && !error && filteredTrabajos?.length === 0 && (
              <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="p-12">
                  <div className="flex flex-col items-center justify-center gap-4">
                    <div className="p-4 bg-gray-100 rounded-full">
                      <IconFileText className="w-8 h-8 text-gray-600" />
                    </div>
                    <div className="text-center">
                      <p className="text-gray-600 font-semibold text-lg">No se encontraron ofertas</p>
                      <p className="text-gray-500">Intenta ajustar los filtros de búsqueda</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {!loading && !error && filteredTrabajos && filteredTrabajos.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTrabajos.map((trabajo) => (
                  <Card key={trabajo.id} className="bg-white/95 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                            <IconBriefcase className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2">
                              {trabajo.puesto}
                            </CardTitle>
                            <p className="text-sm text-gray-600">{trabajo.jornada}</p>
                          </div>
                        </div>
                        {getStatusBadge(trabajo.tipo_oferta)}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {/* Empresa */}
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Image
                            src={`${URL_BASE}${trabajo.empresa?.image_url}`}
                            alt={`Logo de ${trabajo.empresa?.name}`}
                            width={40}
                            height={40}
                            className="rounded-lg object-cover border-2 border-gray-200"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{trabajo.empresa?.name}</p>
                          <p className="text-sm text-gray-600">{trabajo.contrato}</p>
                        </div>
                      </div>

                      {/* Información Principal */}
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <IconUserCheck className="w-4 h-4 text-purple-600" />
                          <span className="text-gray-700 font-medium">{trabajo.degree?.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <IconCurrency className="w-4 h-4 text-green-600" />
                          <span className="text-gray-700 font-semibold">L. {Number(trabajo.salario).toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <IconMapPin className="w-4 h-4 text-orange-600" />
                          <span className="text-gray-700">{trabajo.ubicacion}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <IconClock className="w-4 h-4 text-blue-600" />
                          <span className="text-gray-700">{trabajo.tipo_oferta}</span>
                        </div>
                      </div>

                      {/* Descripción */}
                      {trabajo.description && (
                        <p className="text-sm text-gray-600 line-clamp-3">
                          {trabajo.description}
                        </p>
                      )}

                      {/* Acciones */}
                      <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                        <Dialog
                          open={trabajoToEdit?.id === trabajo.id}
                          onOpenChange={(open) =>
                            setTrabajoToEdit(open ? trabajo : null)
                          }
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                              title="Editar oferta"
                            >
                              <IconPencil className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                            {trabajoToEdit && (
                              <TrabajoForm
                                trabajo={trabajoToEdit}
                                onSave={handleSaveTrabajo}
                              />
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all duration-200"
                          onClick={() => handleDelete(trabajo.id)}
                          title="Eliminar oferta"
                        >
                          <IconTrash className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Dialogo para agregar nuevo trabajo */}
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
              <TrabajoForm onSave={handleSaveTrabajo} />
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </MainLayout>
  );
}
