import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Formacion } from "@/services/formaciones.types";
import SelectDegree from "./SelectDegree";
import SelectTipoFormacion from "./SelectTipoFormacion";
import { dateToISODatetime } from "@/lib/date-to-iso-datetime";
import { Textarea } from "./ui/textarea";
import { 
  IconSchool, 
  IconFileText, 
  IconUserCheck, 
  IconClock, 
  IconMapPin, 
  IconUsers, 
  IconCalendar, 
  IconBuilding, 
  IconLink,
  IconCheck,
  IconX
} from "@tabler/icons-react";
import { Card, CardContent } from "@/components/ui/card";

interface FormacionFormProps {
  formacion: Formacion;
  onSave: (formacion: Formacion) => void;
}

export default function FormacionForm({
  formacion: empresa,
  onSave,
}: FormacionFormProps) {
  const [formacionData, setFormacionData] = useState<Formacion>(empresa);

  const handleChange = (field: keyof Formacion, value: unknown) => {
    setFormacionData({
      ...formacionData,
      [field]: value,
    });
  };

  const handleSubmit = () => {
    onSave(formacionData);
  };

  const isEditing = empresa.id !== -1;

  return (
    <div className="space-y-6">
      <DialogHeader className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className={`p-3 rounded-xl shadow-lg ${isEditing ? 'bg-gradient-to-r from-indigo-600 to-purple-600' : 'bg-gradient-to-r from-green-600 to-emerald-600'}`}>
            <IconSchool className="w-8 h-8 text-white" />
          </div>
          <div>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {isEditing ? "Editar Formación" : "Nueva Formación"}
            </DialogTitle>
            <DialogDescription className="text-gray-600 mt-1">
              {isEditing
                ? "Actualiza la información de la formación"
                : "Completa los campos para crear una nueva formación"}
            </DialogDescription>
          </div>
        </div>
      </DialogHeader>

      <div className="space-y-6">
        {/* Información Principal */}
        <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <IconSchool className="w-5 h-5 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Información Principal</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <IconFileText className="w-4 h-4" />
                  Tipo de Formación *
                </Label>
                <SelectTipoFormacion
                  idTipoFormacion={formacionData.id_tipo}
                  onSelect={(e) => handleChange("id_tipo", e)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nombre" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <IconFileText className="w-4 h-4" />
                  Nombre de la Formación *
                </Label>
                <Input
                  id="nombre"
                  value={formacionData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Ej: Curso de React Avanzado"
                  className="border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg transition-all duration-200"
                />
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <Label htmlFor="descripcion" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <IconFileText className="w-4 h-4" />
                Descripción *
              </Label>
              <Textarea
                id="descripcion"
                className="h-24 border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg transition-all duration-200 resize-none"
                value={formacionData.descripcion}
                onChange={(e) => handleChange("descripcion", e.target.value)}
                placeholder="Breve descripción de la formación, objetivos, contenido..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Carrera y Modalidad */}
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <IconUserCheck className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Carrera y Modalidad</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <IconUserCheck className="w-4 h-4" />
                  Carrera *
                </Label>
                <SelectDegree
                  idDegree={formacionData.degree_id}
                  onSelect={(e) => handleChange("degree_id", e)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="modalidad" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <IconClock className="w-4 h-4" />
                  Modalidad *
                </Label>
                <Input
                  id="modalidad"
                  value={formacionData.modalidad}
                  onChange={(e) => handleChange("modalidad", e.target.value)}
                  placeholder="Presencial, Virtual, Híbrido..."
                  className="border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg transition-all duration-200"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ubicación y Capacidad */}
        <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <IconMapPin className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Ubicación y Capacidad</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lugar" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <IconMapPin className="w-4 h-4" />
                  Lugar
                </Label>
                <Input
                  id="lugar"
                  value={formacionData.lugar}
                  onChange={(e) => handleChange("lugar", e.target.value)}
                  placeholder="Ej: Aula A-101, Edificio Central..."
                  className="border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="capacidad" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <IconUsers className="w-4 h-4" />
                  Capacidad
                </Label>
                <Input
                  id="capacidad"
                  type="number"
                  value={formacionData.capacidad}
                  onChange={(e) => handleChange("capacidad", e.target.value)}
                  placeholder="Cantidad de participantes"
                  className="border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg transition-all duration-200"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fecha y Duración */}
        <Card className="bg-gradient-to-r from-orange-50 to-amber-50 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <IconCalendar className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Fecha y Duración</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fecha" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <IconCalendar className="w-4 h-4" />
                  Fecha y Hora *
                </Label>
                <Input
                  id="fecha"
                  type="datetime-local"
                  value={dateToISODatetime(new Date(formacionData.fecha))}
                  onChange={(e) => handleChange("fecha", e.target.value)}
                  className="border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duracion" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <IconClock className="w-4 h-4" />
                  Duración *
                </Label>
                <Input
                  id="duracion"
                  value={formacionData.duracion}
                  onChange={(e) => handleChange("duracion", e.target.value)}
                  placeholder="Ej: 2 horas, 4 semanas, 8 sesiones..."
                  className="border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg transition-all duration-200"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Institución y Personal */}
        <Card className="bg-gradient-to-r from-purple-50 to-violet-50 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <IconBuilding className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Institución y Personal</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="institucion" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <IconBuilding className="w-4 h-4" />
                  Institución
                </Label>
                <Input
                  id="institucion"
                  value={formacionData.institucion}
                  onChange={(e) => handleChange("institucion", e.target.value)}
                  placeholder="UPN, UNAH, etc."
                  className="border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="facultad" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <IconBuilding className="w-4 h-4" />
                  Facultad
                </Label>
                <Input
                  id="facultad"
                  value={formacionData.facultad}
                  onChange={(e) => handleChange("facultad", e.target.value)}
                  placeholder="Facultad de Ingeniería, Ciencias, etc."
                  className="border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructor" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <IconUserCheck className="w-4 h-4" />
                  Instructor
                </Label>
                <Input
                  id="instructor"
                  value={formacionData.instructor}
                  onChange={(e) => handleChange("instructor", e.target.value)}
                  placeholder="Nombre del Instructor"
                  className="border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg transition-all duration-200"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* URL */}
        <Card className="bg-gradient-to-r from-teal-50 to-cyan-50 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-teal-100 rounded-lg">
                <IconLink className="w-5 h-5 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Enlace de Registro</h3>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="url" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <IconLink className="w-4 h-4" />
                URL de Registro
              </Label>
              <Input
                id="url"
                value={formacionData.url}
                onChange={(e) => handleChange("url", e.target.value)}
                placeholder="https://ejemplo.com/registro"
                className="border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg transition-all duration-200"
              />
              <p className="text-xs text-gray-500">
                Enlace para que los participantes se registren en la formación
              </p>
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
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
        >
          <IconCheck className="w-4 h-4" />
          {isEditing ? "Guardar Cambios" : "Crear Formación"}
        </Button>
      </DialogFooter>
    </div>
  );
}
