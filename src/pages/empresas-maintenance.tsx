"use client";

import MainLayout from "../layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { Empresa } from "@/services/empresas.types";
import { useEmpresas } from "@/hooks/get-empresas";
import { DeleteEmpresa, SaveEmpresa } from "@/services/empresas";
import { toast } from "sonner";
import EmpresaForm from "@/components/EmpresaForm";
import { 
  IconBuilding, 
  IconPlus, 
  IconSearch, 
  IconRefresh, 
  IconEye, 
  IconFileText,
  IconUsers,
  IconGlobe,
  IconPalette,
  IconPencil,
  IconTrash,
  IconX,
  IconLink,
  IconBriefcase
} from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { URL_BASE } from "@/config/constants";
import Image from "next/image";

export default function EmpresasMaintenance() {
  const { empresas, loading, error, refreshEmpresas } = useEmpresas();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterColor, setFilterColor] = useState<string>("");
  const [filterHasUrl, setFilterHasUrl] = useState<string>("");

  const handleSave = async (empresa: Empresa, newImage: string | null) => {
    try {
      const updatedEmpresa = {
        ...empresa,
        image_base64: newImage,
      };
      const res = await SaveEmpresa(updatedEmpresa);
      if (res.isSuccess) {
        toast.success("Empresa guardada correctamente");
        refreshEmpresas();
      } else {
        toast.error("Error al guardar la empresa");
      }
    } catch (error) {
      console.error("Error al guardar la empresa", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await DeleteEmpresa(id);
      if (res.isSuccess) {
        toast.success("Empresa eliminada correctamente");
        refreshEmpresas();
      } else {
        toast.error("Error al eliminar la empresa");
      }
    } catch (error) {
      console.error("Error al eliminar la empresa", error);
    }
  };

  const filteredEmpresas = empresas?.filter(empresa => {
    const matchesSearch = 
      empresa.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      empresa.url?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesColor = !filterColor || empresa.color_rgb === filterColor;
    const matchesHasUrl = !filterHasUrl || 
      (filterHasUrl === "Con URL" && empresa.url) ||
      (filterHasUrl === "Sin URL" && !empresa.url);

    return matchesSearch && matchesColor && matchesHasUrl;
  });

  const coloresUnicos = [...new Set(empresas?.map(e => e.color_rgb).filter((color): color is string => Boolean(color)))];
  const urlOptions = [
    { value: "", label: "Todas las empresas" },
    { value: "Con URL", label: "Con URL" },
    { value: "Sin URL", label: "Sin URL" }
  ];

  const colorOptions = [
    { value: "", label: "Todos los colores" },
    ...coloresUnicos.map(color => ({ value: color, label: color }))
  ];

  const clearFilters = () => {
    setSearchTerm("");
    setFilterColor("");
    setFilterHasUrl("");
  };

  const getEmpresasConUrl = () => {
    return empresas?.filter(empresa => empresa.url) || [];
  };

  const getEmpresasSinUrl = () => {
    return empresas?.filter(empresa => !empresa.url) || [];
  };

  return (
    <MainLayout hideMargin>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-50">
        <main className="max-w-7xl mx-auto p-6 font-montserrat">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-r from-blue-600 to-sky-600 rounded-xl shadow-lg">
                    <IconBuilding className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      Gestión de Instituciones
                    </h1>
                    <p className="text-gray-600 text-lg">
                      Administra y gestiona todas las instituciones y empresas
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => refreshEmpresas()}
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
                      Nueva Institución
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-lg">
                    <EmpresaForm
                      empresa={{
                        id: -1,
                        name: "",
                        color_rgb: "#ffffff",
                        text_color: "#000000",
                        image_url: "",
                        created_at: new Date(),
                        url: "",
                      }}
                      onSave={(empresa, newImage) => {
                        handleSave(empresa, newImage);
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
                    <p className="text-sm font-medium text-gray-600">Total Instituciones</p>
                    <p className="text-3xl font-bold text-gray-900">{empresas?.length || 0}</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <IconBuilding className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Con Sitio Web</p>
                    <p className="text-3xl font-bold text-gray-900">{getEmpresasConUrl().length}</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <IconGlobe className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Sin Sitio Web</p>
                    <p className="text-3xl font-bold text-gray-900">{getEmpresasSinUrl().length}</p>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-full">
                    <IconFileText className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Colores Únicos</p>
                    <p className="text-3xl font-bold text-gray-900">{coloresUnicos.length}</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <IconPalette className="w-6 h-6 text-purple-600" />
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
                    placeholder="Buscar instituciones por nombre o URL..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-3 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl transition-all duration-200"
                  />
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Select
                    options={urlOptions}
                    value={filterHasUrl}
                    onValueChange={setFilterHasUrl}
                    placeholder="Estado de URL"
                    searchPlaceholder="Buscar estado..."
                    className="border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg transition-all duration-200"
                  />

                  <Select
                    options={colorOptions}
                    value={filterColor}
                    onValueChange={setFilterColor}
                    placeholder="Color"
                    searchPlaceholder="Buscar color..."
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

          {/* Empresas Cards */}
          <div className="space-y-6">
            {loading && (
              <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="p-12">
                  <div className="flex flex-col items-center justify-center gap-4">
                    <LoadingSpinner size={48} />
                    <p className="text-gray-600 font-medium">Cargando instituciones...</p>
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

            {!loading && !error && filteredEmpresas?.length === 0 && (
              <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="p-12">
                  <div className="flex flex-col items-center justify-center gap-4">
                    <div className="p-4 bg-gray-100 rounded-full">
                      <IconFileText className="w-8 h-8 text-gray-600" />
                    </div>
                    <div className="text-center">
                      <p className="text-gray-600 font-semibold text-lg">No se encontraron instituciones</p>
                      <p className="text-gray-500">Intenta ajustar los filtros de búsqueda</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {!loading && !error && filteredEmpresas && filteredEmpresas.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEmpresas.map((empresa) => (
                  <Card key={empresa.id} className="bg-white/95 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                            <IconBuilding className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2">
                              {empresa.name}
                            </CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {empresa.url ? "Con sitio web" : "Sin sitio web"}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {/* Logo/Imagen */}
                      <div className="flex justify-center">
                        <div className="relative w-24 h-24 rounded-xl overflow-hidden border-2 border-gray-200 shadow-md">
                          {empresa.image_url ? (
                            <Image
                              src={`${URL_BASE}${empresa.image_url}`}
                              alt={`Logo de ${empresa.name}`}
                              fill
                              className="object-contain p-2"
                            />
                          ) : (
                            <div 
                              className="w-full h-full flex items-center justify-center text-white font-bold text-lg"
                              style={{ backgroundColor: empresa.color_rgb, color: empresa.text_color }}
                            >
                              {empresa.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Información Principal */}
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <IconPalette className="w-4 h-4 text-purple-600" />
                          <span className="text-gray-700 font-medium">Color: {empresa.color_rgb}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <IconUsers className="w-4 h-4 text-blue-600" />
                          <span className="text-gray-700">Texto: {empresa.text_color}</span>
                        </div>
                      </div>

                      {/* URL */}
                      {empresa.url && (
                        <div className="flex items-center gap-2 text-sm">
                          <IconLink className="w-4 h-4 text-blue-600" />
                          <a 
                            href={empresa.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 hover:underline truncate"
                          >
                            {empresa.url}
                          </a>
                        </div>
                      )}

                      {/* Fecha de Creación */}
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <IconBriefcase className="w-4 h-4" />
                        <span>Creada: {new Date(empresa.created_at).toLocaleDateString()}</span>
                      </div>

                      {/* Acciones */}
                      <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                              title="Editar institución"
                            >
                              <IconPencil className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-lg">
                            <EmpresaForm
                              empresa={empresa}
                              onSave={handleSave}
                            />
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all duration-200"
                          onClick={() => handleDelete(empresa.id)}
                          title="Eliminar institución"
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
        </main>
      </div>
    </MainLayout>
  );
}
