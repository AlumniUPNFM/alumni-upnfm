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
import { URL_BASE } from "@/config/constants";

interface EmpresaFormProps {
  empresa: Empresa;
  onSave: (empresa: Empresa, newImage: string | null) => void;
}

export default function EmpresaForm({ empresa, onSave }: EmpresaFormProps) {
  const [empresaData, setEmpresaData] = useState<Empresa>(empresa);
  const [newImage, setNewImage] = useState<string | null>(null);

  const handleChange = (field: keyof Empresa, value: unknown) => {
    setEmpresaData({
      ...empresaData,
      [field]: value,
    });
  };

  const handleSubmit = () => {
    onSave(empresaData, newImage);
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          {empresa.id === -1 ? "Nueva Empresa" : "Editar Empresa"}
        </DialogTitle>
        <DialogDescription>
          {empresa.id === -1
            ? "Complete los campos para añadir una nueva empresa."
            : "Edite y cambie cualquier apartado que sea necesario."}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="flex justify-center items-center">
          <Avatar className="w-24 h-24">
            <AvatarImage
              src={newImage || `${URL_BASE}${empresaData.image_url}`}
              alt={empresaData.name}
            />
            <AvatarFallback>N/D</AvatarFallback>
          </Avatar>
        </div>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              value={empresaData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              value={empresaData.url}
              onChange={(e) => handleChange("url", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="color_rgb">Color</Label>
            <Input
              id="color_rgb"
              type="color"
              value={empresaData.color_rgb}
              onChange={(e) => handleChange("color_rgb", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="text_color">Color del Texto</Label>
            <Input
              id="text_color"
              type="color"
              value={empresaData.text_color}
              onChange={(e) => handleChange("text_color", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="image">Imagen</Label>
            <Input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    if (e.target?.result) {
                      setNewImage(e.target.result as string);
                    }
                  };
                  reader.readAsDataURL(e.target.files[0]);
                }
              }}
            />
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button onClick={handleSubmit}>
          {empresa.id === -1 ? "Añadir Empresa" : "Guardar Cambios"}
        </Button>
      </DialogFooter>
    </>
  );
}
