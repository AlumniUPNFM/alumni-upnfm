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

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          {trabajo ? "Editar Trabajo" : "Agregar Trabajo"}
        </DialogTitle>
        <DialogDescription>
          {trabajo
            ? "Edite y cambie cualquier apartado que sea necesario."
            : "Complete los campos para agregar un nuevo trabajo."}
        </DialogDescription>
      </DialogHeader>
      <div className="grid grid-cols-2 gap-4">
        {/* Primera columna */}
        <div className="flex flex-col gap-4">
          <span className="flex flex-col gap-2">
            <Label htmlFor="puesto">Puesto</Label>
            <Input
              id="puesto"
              value={formData.puesto}
              onChange={(e) => handleChange("puesto", e.target.value)}
            />
          </span>

          <span className="flex flex-col gap-2">
            <Label htmlFor="salario">Salario</Label>
            <Input
              id="salario"
              type="number"
              value={formData.salario}
              onChange={(e) => handleChange("salario", Number(e.target.value))}
            />
          </span>

          <span className="flex flex-col gap-2">
            <Label htmlFor="tipo_oferta">Tipo de Oferta</Label>
            <Input
              id="tipo_oferta"
              value={formData.tipo_oferta}
              onChange={(e) => handleChange("tipo_oferta", e.target.value)}
            />
          </span>

          <span className="flex flex-col gap-2">
            <Label htmlFor="contrato">Contrato</Label>
            <Input
              id="contrato"
              value={formData.contrato}
              onChange={(e) => handleChange("contrato", e.target.value)}
            />
          </span>

          <span className="flex flex-col gap-2">
            <Label htmlFor="idiomas">Idiomas</Label>
            <Input
              id="idiomas"
              value={formData.idiomas}
              onChange={(e) => handleChange("idiomas", e.target.value)}
            />
          </span>
        </div>

        {/* Segunda columna */}
        <div className="flex flex-col gap-4">
          <span className="flex flex-col gap-2">
            <Label htmlFor="degree_id">Carrera</Label>
            <SelectDegree
              idDegree={formData.degree_id}
              onSelect={(id) => handleChange("degree_id", id)}
            />
          </span>

          <span className="flex flex-col gap-2">
            <Label htmlFor="empresa_id">Empresa</Label>
            <SelectEmpresa
              idEmpresa={formData.empresa_id}
              onSelect={(id) => handleChange("empresa_id", id)}
            />
          </span>

          <span className="flex flex-col gap-2">
            <Label htmlFor="ubicacion">Ubicación</Label>
            <Input
              id="ubicacion"
              value={formData.ubicacion}
              onChange={(e) => handleChange("ubicacion", e.target.value)}
            />
          </span>

          <span className="flex flex-col gap-2">
            <Label htmlFor="jornada">Jornada</Label>
            <Input
              id="jornada"
              value={formData.jornada}
              onChange={(e) => handleChange("jornada", e.target.value)}
            />
          </span>

          <span className="flex flex-col gap-2">
            <Label htmlFor="experiencia_laboral">Experiencia Laboral</Label>
            <Input
              id="experiencia_laboral"
              type="number"
              value={formData.experiencia_laboral}
              onChange={(e) =>
                handleChange("experiencia_laboral", Number(e.target.value))
              }
            />
          </span>
        </div>

        {/* Campo de descripción que abarca ambas columnas */}
        <div className="col-span-2">
          <Label htmlFor="description">Descripción</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>
      </div>
      <DialogFooter>
        <Button onClick={handleSubmit}>
          {trabajo ? "Guardar Cambios" : "Agregar Trabajo"}
        </Button>
      </DialogFooter>
    </>
  );
};

export default TrabajoForm;
