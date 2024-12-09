import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { Formacion } from "@/services/formaciones.types";
import FormacionForm from "./FormacionForm";
import { dateToFormat } from "@/lib/date-to-format";

interface FormacionRowProps {
  formacion: Formacion;
  onSave: (formacion: Formacion) => void;
  onDelete: (id: number) => void;
}

export default function FormacionRow({
  formacion,
  onSave,
  onDelete,
}: FormacionRowProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <TableRow>
      <TableCell>{formacion.descripcion}</TableCell>
      <TableCell>{formacion.tipo?.name}</TableCell>
      <TableCell>{formacion.degree?.name}</TableCell>
      <TableCell>{formacion.modalidad}</TableCell>
      <TableCell>{formacion.lugar}</TableCell>
      <TableCell>{formacion.capacidad}</TableCell>
      <TableCell>{formacion.horas}</TableCell>
      <TableCell>{dateToFormat(new Date(formacion.fecha))}</TableCell>
      <TableCell>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-red-600 hover:text-red-800"
            onClick={() => onDelete(formacion.id)}
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
              <FormacionForm
                formacion={formacion}
                onSave={(updatedEmpresa) => {
                  onSave(updatedEmpresa);
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
