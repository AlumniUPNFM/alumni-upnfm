import { Evento } from "@/services/eventos.types";
import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { dateToFormat } from "@/lib/date-to-format";
import EventoForm from "./EventoForm";

interface EventoRowProps {
  evento: Evento;
  onSave: (evento: Evento) => void;
  onDelete: (id: number) => void;
}

export default function EventoRow({
  evento,
  onSave,
  onDelete,
}: EventoRowProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <TableRow>
      <TableCell>{evento.name}</TableCell>
      <TableCell>{dateToFormat(new Date(evento.fecha))}</TableCell>
      <TableCell>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-red-600 hover:text-red-800"
            onClick={() => onDelete(evento.id)}
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
              <EventoForm
                evento={evento}
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
