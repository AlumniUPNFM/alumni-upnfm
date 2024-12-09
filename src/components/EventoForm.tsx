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

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          {evento.id === -1 ? "Nueva Evento" : "Editar Evento"}
        </DialogTitle>
        <DialogDescription>
          {evento.id === -1
            ? "Complete los campos para añadir una nueva evento."
            : "Edite y cambie cualquier apartado que sea necesario."}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4">
        <div>
          <Label htmlFor="name">Nombre</Label>
          <Input
            id="name"
            value={formacionData.name}
            onChange={(e) => handleChange("name", e.target.value)}
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
          {evento.id === -1 ? "Añadir Evento" : "Guardar Cambios"}
        </Button>
      </DialogFooter>
    </>
  );
}
