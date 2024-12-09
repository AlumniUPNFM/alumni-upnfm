import { Empresa } from "@/services/empresas.types";
import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import Image from "next/image";
import EmpresaForm from "./EmpresaForm";
import { URL_BASE } from "@/config/constants";
import { IconPencil, IconTrash } from "@tabler/icons-react";

interface EmpresaRowProps {
  empresa: Empresa;
  onSave: (empresa: Empresa, newImage: string | null) => void;
  onDelete: (id: number) => void;
}

export default function EmpresaRow({
  empresa,
  onSave,
  onDelete,
}: EmpresaRowProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <TableRow>
      <TableCell>{empresa.name}</TableCell>
      <TableCell>{empresa.url}</TableCell>
      <TableCell>
        <div
          className="w-6 h-6 rounded-full"
          style={{ backgroundColor: empresa.color_rgb }}
        ></div>
      </TableCell>
      <TableCell>
        <div
          className="w-6 h-6 rounded-full border"
          style={{ backgroundColor: empresa.text_color }}
        ></div>
      </TableCell>
      <TableCell>{empresa.plazas?.length ?? 0}</TableCell>
      <TableCell>
        <Image
          src={`${URL_BASE}${empresa.image_url}`}
          alt={empresa.name}
          width={48}
          height={48}
          className="rounded-full"
        />
      </TableCell>
      <TableCell>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-red-600 hover:text-red-800"
            onClick={() => onDelete(empresa.id)}
            title="Eliminar"
          >
            <IconTrash className="w-5 h-5" />
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-600 hover:text-blue-800"
                title="Editar"
                onClick={() => setIsDialogOpen(true)}
              >
                <IconPencil className="w-5 h-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <EmpresaForm
                empresa={empresa}
                onSave={(updatedEmpresa, newImage) => {
                  onSave(updatedEmpresa, newImage);
                  setIsDialogOpen(false);
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
      </TableCell>
    </TableRow>
  );
}
