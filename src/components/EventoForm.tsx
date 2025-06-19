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
import { Evento } from "@/services/eventos.types";
import { dateToISODatetime } from "@/lib/date-to-iso-datetime";
import { 
  IconCalendar, 
  IconFileText, 
  IconClock,
  IconCheck,
  IconX
} from "@tabler/icons-react";
import { Card, CardContent } from "@/components/ui/card";

interface EventoFormProps {
  evento: Evento;
  onSave: (evento: Evento) => void;
}

export default function EventoForm({ evento, onSave }: EventoFormProps) {
  const [formacionData, setFormacionData] = useState<Evento>(evento);

  const handleChange = (field: keyof Evento, value: unknown) => {
    setFormacionData({
      ...formacionData,
      [field]: value,
    });
  };

  const handleSubmit = () => {
    onSave(formacionData);
  };

  const isEditing = evento.id !== -1;

  return (
    <div className="space-y-6">
      <DialogHeader className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className={`p-3 rounded-xl shadow-lg ${isEditing ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gradient-to-r from-green-600 to-emerald-600'}`}>
            <IconCalendar className="w-8 h-8 text-white" />
          </div>
          <div>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {isEditing ? "Editar Evento" : "Nuevo Evento"}
            </DialogTitle>
            <DialogDescription className="text-gray-600 mt-1">
              {isEditing
                ? "Actualiza la información del evento"
                : "Completa los campos para crear un nuevo evento"}
            </DialogDescription>
          </div>
        </div>
      </DialogHeader>

      <div className="space-y-6">
        {/* Información del Evento */}
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <IconCalendar className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Información del Evento</h3>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <IconFileText className="w-4 h-4" />
                  Nombre del Evento *
                </Label>
                <Input
                  id="name"
                  value={formacionData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Ej: Conferencia de Tecnología 2024"
                  className="border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-lg transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fecha" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <IconClock className="w-4 h-4" />
                  Fecha y Hora *
                </Label>
                <Input
                  id="fecha"
                  type="datetime-local"
                  value={dateToISODatetime(new Date(formacionData.fecha))}
                  onChange={(e) => {
                    console.log({ e });
                    return handleChange("fecha", e.target.value);
                  }}
                  className="border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-lg transition-all duration-200"
                />
                <p className="text-xs text-gray-500">
                  Selecciona la fecha y hora exacta del evento
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Información Adicional */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <IconFileText className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Detalles Adicionales</h3>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    ID del Evento
                  </Label>
                  <div className="p-3 bg-gray-100 rounded-lg border-2 border-gray-200">
                    <span className="text-sm font-mono text-gray-600">
                      {formacionData.id === -1 ? "Nuevo Evento" : `EV-${formacionData.id.toString().padStart(4, '0')}`}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Fecha de Creación
                  </Label>
                  <div className="p-3 bg-gray-100 rounded-lg border-2 border-gray-200">
                    <span className="text-sm text-gray-600">
                      {new Date(formacionData.created_at).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Estado del Evento
                </Label>
                <div className="p-3 bg-gray-100 rounded-lg border-2 border-gray-200">
                  <span className="text-sm text-gray-600">
                    {new Date(formacionData.fecha) > new Date() ? "Programado" : "Completado"}
                  </span>
                </div>
              </div>
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
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
        >
          <IconCheck className="w-4 h-4" />
          {isEditing ? "Guardar Cambios" : "Crear Evento"}
        </Button>
      </DialogFooter>
    </div>
  );
}
