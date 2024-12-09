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
        <DialogTitle>
          {empresa.id === -1 ? "Nueva Formacion" : "Editar Formacion"}
        </DialogTitle>
        <DialogDescription>
          {empresa.id === -1
            ? "Complete los campos para añadir una nueva empresa."
            : "Edite y cambie cualquier apartado que sea necesario."}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4">
        <SelectDegree
          idDegree={formacionData.degree_id}
          onSelect={(e) => {
            handleChange("degree_id", e);
          }}
        ></SelectDegree>
        <SelectTipoFormacion
          idTipoFormacion={formacionData.id_tipo}
          onSelect={(e) => {
            handleChange("id_tipo", e);
          }}
        ></SelectTipoFormacion>
        <div>
          <Label htmlFor="name">Modalidad</Label>
          <Input
            id="name"
            value={formacionData.modalidad}
            onChange={(e) => handleChange("modalidad", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="url">Lugar</Label>
          <Input
            id="url"
            value={formacionData.lugar}
            onChange={(e) => handleChange("lugar", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="color_rgb">Capacidad</Label>
          <Input
            id="color_rgb"
            value={formacionData.capacidad}
            onChange={(e) => handleChange("capacidad", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="text_color">Horas</Label>
          <Input
            id="text_color"
            value={formacionData.horas}
            onChange={(e) => handleChange("horas", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="text_color">Nombre</Label>
          <Input
            id="text_color"
            value={formacionData.descripcion}
            onChange={(e) => handleChange("descripcion", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="text_color">URL</Label>
          <Input
            id="text_color"
            value={formacionData.url}
            onChange={(e) => handleChange("url", e.target.value)}
          />
        </div>
        <div className="flex justify-center w-full">
          <Input
            id="text_color"
            type="datetime-local"
            value={dateToISODatetime(new Date(formacionData.fecha))}
            onChange={(e) => {
              console.log({ e });
              return handleChange("fecha", e.target.value);
            }}
          />
        </div>
      </div>
      <DialogFooter>
        <Button onClick={handleSubmit}>
          {empresa.id === -1 ? "Añadir Formacion" : "Guardar Cambios"}
        </Button>
      </DialogFooter>
    </>
  );
}
