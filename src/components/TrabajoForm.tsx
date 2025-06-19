import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import SelectEmpresa from "@/components/SelectEmpresa";
import SelectDegree from "@/components/SelectDegree";
import { Trabajo } from "@/services/trabajos.types";
import { 
  IconBriefcase, 
  IconBuilding, 
  IconUserCheck, 
  IconCurrency, 
  IconMapPin, 
  IconClock, 
  IconFile, 
  IconLanguage, 
  IconFileText,
  IconCheck,
  IconX
} from "@tabler/icons-react";
import { Card, CardContent } from "@/components/ui/card";

interface TrabajoFormProps {
  trabajo?: Trabajo;
  onSave: (trabajo: Trabajo) => void;
}

const TrabajoForm: React.FC<TrabajoFormProps> = ({ trabajo, onSave }) => {
  const [formData, setFormData] = useState<Trabajo>(
    trabajo || {
      id: -1,
      puesto: "",
      degree_id: -1,
      empresa_id: -1,
      salario: 0,
      ubicacion: "",
      tipo_oferta: "",
      jornada: "",
      contrato: "",
      experiencia_laboral: 0,
      idiomas: "",
      description: "",
      created_at: new Date(),
    }
  );

  const handleChange = (field: keyof Trabajo, value: string | number) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  const isEditing = !!trabajo;

  return (
    <div className="space-y-6">
      <DialogHeader className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className={`p-3 rounded-xl shadow-lg ${isEditing ? 'bg-gradient-to-r from-blue-600 to-blue-700' : 'bg-gradient-to-r from-green-600 to-green-700'}`}>
            <IconBriefcase className="w-8 h-8 text-white" />
          </div>
          <div>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {isEditing ? "Editar Oferta Laboral" : "Nueva Oferta Laboral"}
            </DialogTitle>
            <DialogDescription className="text-gray-600 mt-1">
              {isEditing
                ? "Actualiza la información de la oferta laboral"
                : "Completa todos los campos para crear una nueva oferta"}
            </DialogDescription>
          </div>
        </div>
      </DialogHeader>

      <div className="space-y-6">
        {/* Información Principal */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <IconBriefcase className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Información del Puesto</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="puesto" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <IconBriefcase className="w-4 h-4" />
                  Puesto *
                </Label>
                <Input
                  id="puesto"
                  value={formData.puesto}
                  onChange={(e) => handleChange("puesto", e.target.value)}
                  placeholder="Ej: Desarrollador Frontend"
                  className="border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="salario" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <IconCurrency className="w-4 h-4" />
                  Salario (L.) *
                </Label>
                <Input
                  id="salario"
                  type="number"
                  value={formData.salario}
                  onChange={(e) => handleChange("salario", Number(e.target.value))}
                  placeholder="25000"
                  className="border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg transition-all duration-200"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Empresa y Carrera */}
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <IconBuilding className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Empresa y Carrera</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="empresa_id" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <IconBuilding className="w-4 h-4" />
                  Empresa *
                </Label>
                <SelectEmpresa
                  idEmpresa={formData.empresa_id}
                  onSelect={(id) => handleChange("empresa_id", id)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="degree_id" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <IconUserCheck className="w-4 h-4" />
                  Carrera *
                </Label>
                <SelectDegree
                  idDegree={formData.degree_id}
                  onSelect={(id) => handleChange("degree_id", id)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detalles del Trabajo */}
        <Card className="bg-gradient-to-r from-purple-50 to-violet-50 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <IconClock className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Detalles del Trabajo</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ubicacion" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <IconMapPin className="w-4 h-4" />
                  Ubicación *
                </Label>
                <Input
                  id="ubicacion"
                  value={formData.ubicacion}
                  onChange={(e) => handleChange("ubicacion", e.target.value)}
                  placeholder="Ej: Tegucigalpa, Honduras"
                  className="border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipo_oferta" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <IconClock className="w-4 h-4" />
                  Tipo de Oferta *
                </Label>
                <Input
                  id="tipo_oferta"
                  value={formData.tipo_oferta}
                  onChange={(e) => handleChange("tipo_oferta", e.target.value)}
                  placeholder="Ej: Tiempo Completo"
                  className="border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="jornada" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <IconClock className="w-4 h-4" />
                  Jornada *
                </Label>
                <Input
                  id="jornada"
                  value={formData.jornada}
                  onChange={(e) => handleChange("jornada", e.target.value)}
                  placeholder="Ej: Lunes a Viernes"
                  className="border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contrato" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <IconFile className="w-4 h-4" />
                  Tipo de Contrato *
                </Label>
                <Input
                  id="contrato"
                  value={formData.contrato}
                  onChange={(e) => handleChange("contrato", e.target.value)}
                  placeholder="Ej: Indefinido"
                  className="border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experiencia_laboral" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <IconUserCheck className="w-4 h-4" />
                  Experiencia (años) *
                </Label>
                <Input
                  id="experiencia_laboral"
                  type="number"
                  value={formData.experiencia_laboral}
                  onChange={(e) =>
                    handleChange("experiencia_laboral", Number(e.target.value))
                  }
                  placeholder="2"
                  className="border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="idiomas" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <IconLanguage className="w-4 h-4" />
                  Idiomas
                </Label>
                <Input
                  id="idiomas"
                  value={formData.idiomas}
                  onChange={(e) => handleChange("idiomas", e.target.value)}
                  placeholder="Ej: Español, Inglés"
                  className="border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg transition-all duration-200"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Descripción */}
        <Card className="bg-gradient-to-r from-orange-50 to-amber-50 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <IconFileText className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Descripción del Puesto</h3>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <IconFileText className="w-4 h-4" />
                Descripción *
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Describe las responsabilidades, requisitos y beneficios del puesto..."
                className="min-h-[120px] border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg transition-all duration-200 resize-none"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-6">
        <Button
          variant="outline"
          onClick={() => window.history.back()}
          className="flex items-center gap-2 px-6 py-3 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
        >
          <IconX className="w-4 h-4" />
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
        >
          <IconCheck className="w-4 h-4" />
          {isEditing ? "Guardar Cambios" : "Crear Oferta"}
        </Button>
      </DialogFooter>
    </div>
  );
};

export default TrabajoForm;
