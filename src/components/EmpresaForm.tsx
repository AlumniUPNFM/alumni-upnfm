import { useState } from "react";
import { Empresa } from "@/services/empresas.types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { URL_BASE } from "@/config/constants";
import { 
  IconBuilding, 
  IconUpload, 
  IconPalette, 
  IconGlobe, 
  IconUser, 
  IconTrash,
  IconPlus,
  IconCheck
} from "@tabler/icons-react";

interface EmpresaFormProps {
  empresa: Empresa;
  onSave: (empresa: Empresa, newImage: string | null) => void;
}

export default function EmpresaForm({ empresa, onSave }: EmpresaFormProps) {
  const [empresaData, setEmpresaData] = useState<Empresa>(empresa);
  const [newImage, setNewImage] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleChange = (field: keyof Empresa, value: unknown) => {
    setEmpresaData({
      ...empresaData,
      [field]: value,
    });
  };

  const handleSubmit = () => {
    onSave(empresaData, newImage);
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setNewImage(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  const removeImage = () => {
    setNewImage(null);
  };

  const currentImageUrl = newImage || `${URL_BASE}${empresaData.image_url}`;
  const hasImage = newImage || empresaData.image_url;

  return (
    <>
      <DialogHeader className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-gradient-to-r from-blue-600 to-sky-600 rounded-lg">
            <IconBuilding className="w-4 h-4 text-white" />
          </div>
          <div>
            <DialogTitle className="text-lg font-bold text-gray-900">
              {empresa.id === -1 ? "Nueva Institución" : "Editar Institución"}
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600">
              {empresa.id === -1
                ? "Complete los campos para añadir una nueva institución al sistema."
                : "Edite y actualice la información de la institución según sea necesario."}
            </DialogDescription>
          </div>
        </div>
      </DialogHeader>

      <div className="space-y-4 py-4">
        {/* Main Content - Side by side layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Logo/Imagen Section - Left side */}
          <div className="lg:col-span-1">
            <Card className="bg-gradient-to-r from-gray-50 to-blue-50 border-2 border-dashed border-gray-200">
              <CardContent className="p-4">
                <div className="text-center space-y-3">
                  <div className="flex justify-center">
                    <div className="relative">
                      <Avatar className="w-20 h-20 border-4 border-white shadow-lg">
                        <AvatarImage
                          src={currentImageUrl}
                          alt={empresaData.name}
                          className="object-cover"
                        />
                        <AvatarFallback className="text-lg font-bold bg-gradient-to-r from-blue-600 to-sky-600 text-white">
                          {empresaData.name ? empresaData.name.charAt(0).toUpperCase() : "N"}
                        </AvatarFallback>
                      </Avatar>
                      {hasImage && (
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute -top-1 -right-1 w-6 h-6 rounded-full p-0"
                          onClick={removeImage}
                          title="Eliminar imagen"
                        >
                          <IconTrash className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="font-semibold text-gray-900 text-sm">Logo de la Institución</h3>
                    <p className="text-xs text-gray-600">
                      Sube una imagen para representar a la institución
                    </p>
                  </div>

                  {/* Upload Area */}
                  <div
                    className={`relative border-2 border-dashed rounded-lg p-3 transition-all duration-200 ${
                      dragActive 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleImageUpload(e.target.files[0]);
                        }
                      }}
                    />
                    <div className="text-center space-y-2">
                      <div className="mx-auto w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <IconUpload className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-900">
                          {dragActive ? 'Suelta la imagen aquí' : 'Haz clic o arrastra una imagen'}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          PNG, JPG, GIF hasta 5MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Form Fields - Right side */}
          <div className="lg:col-span-2 space-y-4">
            {/* Información Básica */}
            <Card className="border-0 shadow-sm bg-gray-50/50">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-3">
                    <IconUser className="w-4 h-4 text-blue-600" />
                    <h3 className="font-semibold text-gray-900 text-sm">Información Básica</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="name" className="text-xs font-medium text-gray-700 mb-1 block">
                        Nombre de la Institución *
                      </Label>
                      <Input
                        id="name"
                        value={empresaData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="Ingrese el nombre de la institución"
                        className="h-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg transition-all duration-200 text-sm"
                      />
                    </div>

                    <div>
                      <Label htmlFor="url" className="text-xs font-medium text-gray-700 mb-1 block">
                        Sitio Web
                      </Label>
                      <div className="relative">
                        <IconGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="url"
                          value={empresaData.url}
                          onChange={(e) => handleChange("url", e.target.value)}
                          placeholder="https://www.ejemplo.com"
                          className="h-10 pl-8 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg transition-all duration-200 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Configuración de Colores */}
            <Card className="border-0 shadow-sm bg-gray-50/50">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-3">
                    <IconPalette className="w-4 h-4 text-purple-600" />
                    <h3 className="font-semibold text-gray-900 text-sm">Configuración de Colores</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="color_rgb" className="text-xs font-medium text-gray-700">
                        Color de Fondo
                      </Label>
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <Input
                            id="color_rgb"
                            type="color"
                            value={empresaData.color_rgb}
                            onChange={(e) => handleChange("color_rgb", e.target.value)}
                            className="w-12 h-10 border-2 border-gray-200 rounded-lg cursor-pointer transition-all duration-200 hover:border-blue-500"
                          />
                          <div className="absolute inset-0 rounded-lg border-2 border-white shadow-sm pointer-events-none"></div>
                        </div>
                        <div className="flex-1">
                          <Input
                            value={empresaData.color_rgb}
                            onChange={(e) => handleChange("color_rgb", e.target.value)}
                            placeholder="#ffffff"
                            className="h-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg transition-all duration-200 font-mono text-xs"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="text_color" className="text-xs font-medium text-gray-700">
                        Color del Texto
                      </Label>
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <Input
                            id="text_color"
                            type="color"
                            value={empresaData.text_color}
                            onChange={(e) => handleChange("text_color", e.target.value)}
                            className="w-12 h-10 border-2 border-gray-200 rounded-lg cursor-pointer transition-all duration-200 hover:border-blue-500"
                          />
                          <div className="absolute inset-0 rounded-lg border-2 border-white shadow-sm pointer-events-none"></div>
                        </div>
                        <div className="flex-1">
                          <Input
                            value={empresaData.text_color}
                            onChange={(e) => handleChange("text_color", e.target.value)}
                            placeholder="#000000"
                            className="h-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg transition-all duration-200 font-mono text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Preview */}
                  <div className="mt-3 p-3 rounded-lg border-2 border-gray-200 bg-white">
                    <p className="text-xs font-medium text-gray-700 mb-2">Vista Previa:</p>
                    <div 
                      className="w-full h-10 rounded-lg flex items-center justify-center font-semibold text-sm"
                      style={{ 
                        backgroundColor: empresaData.color_rgb, 
                        color: empresaData.text_color 
                      }}
                    >
                      {empresaData.name || "Nombre de la Institución"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <DialogFooter className="pt-4 border-t border-gray-200">
        <div className="flex gap-2 w-full">
          <Button
            variant="outline"
            className="flex-1 h-10 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 text-sm"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 h-10 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 text-sm"
          >
            <IconCheck className="w-4 h-4 mr-1" />
            {empresa.id === -1 ? "Crear Institución" : "Guardar Cambios"}
          </Button>
        </div>
      </DialogFooter>
    </>
  );
}
