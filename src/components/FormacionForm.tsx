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

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold">
          {empresa.id === -1 ? "Nueva Formación" : "Editar Formación"}
        </DialogTitle>
        <DialogDescription className="text-gray-600">
          {empresa.id === -1
            ? "Complete los campos para añadir una nueva formación."
            : "Edite y cambie cualquier apartado que sea necesario."}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-6 py-4 font-montserrat text-sm">
        {/* Fila 1: Tipo y Nombre */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <Label className="font-semibold">Tipo</Label>
            <SelectTipoFormacion
              idTipoFormacion={formacionData.id_tipo}
              onSelect={(e) => handleChange("id_tipo", e)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="nombre" className="font-semibold">
              Nombre
            </Label>
            <Input
              id="nombre"
              value={formacionData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Nombre de la formación"
            />
          </div>
        </div>

        {/* Descripción */}
        <div>
          <Label htmlFor="descripcion" className="font-semibold">
            Descripción
          </Label>
          <Textarea
            id="descripcion"
            className="h-24"
            value={formacionData.descripcion}
            onChange={(e) => handleChange("descripcion", e.target.value)}
            placeholder="Breve descripción de la formación..."
          />
        </div>

        {/* Fila 2: Carrera y Modalidad */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <Label className="font-semibold">Carrera</Label>
            <SelectDegree
              idDegree={formacionData.degree_id}
              onSelect={(e) => handleChange("degree_id", e)}
            />
          </div>
          <div>
            <Label htmlFor="modalidad" className="font-semibold">
              Modalidad
            </Label>
            <Input
              id="modalidad"
              value={formacionData.modalidad}
              onChange={(e) => handleChange("modalidad", e.target.value)}
              placeholder="Presencial, Virtual, Híbrido..."
            />
          </div>
        </div>

        {/* Fila 3: Lugar y Capacidad */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="lugar" className="font-semibold">
              Lugar
            </Label>
            <Input
              id="lugar"
              value={formacionData.lugar}
              onChange={(e) => handleChange("lugar", e.target.value)}
              placeholder="Ej: Aula A-101, Edificio Central..."
            />
          </div>
          <div>
            <Label htmlFor="capacidad" className="font-semibold">
              Capacidad
            </Label>
            <Input
              id="capacidad"
              type="number"
              value={formacionData.capacidad}
              onChange={(e) => handleChange("capacidad", e.target.value)}
              placeholder="Cantidad de participantes"
            />
          </div>
        </div>

        {/* Fecha y Duración */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fecha" className="font-semibold">
              Fecha y Hora
            </Label>
            <Input
              id="fecha"
              type="datetime-local"
              value={dateToISODatetime(new Date(formacionData.fecha))}
              onChange={(e) => handleChange("fecha", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="duracion" className="font-semibold">
              Duración (Texto)
            </Label>
            <Input
              id="duracion"
              value={formacionData.duracion}
              onChange={(e) => handleChange("duracion", e.target.value)}
              placeholder="Ej: 2, 4, 8..."
            />
          </div>
        </div>

        {/* Institución, Facultad, Instructor */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="institucion" className="font-semibold">
              Institución
            </Label>
            <Input
              id="institucion"
              value={formacionData.institucion}
              onChange={(e) => handleChange("institucion", e.target.value)}
              placeholder="UPN, UNAH, etc."
            />
          </div>
          <div>
            <Label htmlFor="facultad" className="font-semibold">
              Facultad
            </Label>
            <Input
              id="facultad"
              value={formacionData.facultad}
              onChange={(e) => handleChange("facultad", e.target.value)}
              placeholder="Facultad de Ingeniería, Ciencias, etc."
            />
          </div>
          <div>
            <Label htmlFor="instructor" className="font-semibold">
              Instructor
            </Label>
            <Input
              id="instructor"
              value={formacionData.instructor}
              onChange={(e) => handleChange("instructor", e.target.value)}
              placeholder="Nombre del Instructor"
            />
          </div>
        </div>

        {/* URL */}
        <div>
          <Label htmlFor="url" className="font-semibold">
            URL de Información
          </Label>
          <Input
            id="url"
            value={formacionData.url}
            onChange={(e) => handleChange("url", e.target.value)}
            placeholder="http://example.com"
          />
        </div>
      </div>
      <DialogFooter>
        <Button
          onClick={handleSubmit}
          className="bg-primary text-white hover:bg-primary-dark transition-colors duration-200"
        >
          {empresa.id === -1 ? "Añadir Formación" : "Guardar Cambios"}
        </Button>
      </DialogFooter>
    </>
  );
}
