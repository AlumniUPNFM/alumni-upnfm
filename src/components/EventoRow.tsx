import { Evento } from "@/services/eventos.types";
import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { IconPencil, IconTrash, IconCalendar, IconClock } from "@tabler/icons-react";
import { dateToFormat } from "@/lib/date-to-format";
import EventoForm from "./EventoForm";
import { Badge } from "@/components/ui/badge";

interface EventoRowProps {
  evento: Evento;
  onSave: (evento: Evento) => void;
  onDelete: (id: number) => void;
  status?: { status: string; variant: "default" | "secondary" | "destructive" | "outline" };
}

export default function EventoRow({
  evento,
  onSave,
  onDelete,
  status,
}: EventoRowProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <TableRow className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-200 group">
      <TableCell className="px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
            <IconCalendar className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">{evento.name}</p>
            <p className="text-sm text-gray-500">ID: {evento.id}</p>
          </div>
        </div>
      </TableCell>
      <TableCell className="px-6 py-6">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-100 rounded-md">
            <IconClock className="w-4 h-4 text-blue-600" />
          </div>
          <span className="font-medium text-gray-900">{dateToFormat(new Date(evento.fecha))}</span>
        </div>
      </TableCell>
      <TableCell className="px-6 py-6">
        {status && (
          <Badge variant={status.variant}>
            {status.status}
          </Badge>
        )}
      </TableCell>
      <TableCell className="px-6 py-6">
        <div className="flex items-center justify-center gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                title="Editar evento"
                onClick={() => setIsDialogOpen(true)}
              >
                <IconPencil className="w-5 h-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
              <EventoForm
                evento={evento}
                onSave={(updatedEvento) => {
                  onSave(updatedEvento);
                  setIsDialogOpen(false);
                }}
              />
            </DialogContent>
          </Dialog>
          <Button
            variant="ghost"
            size="sm"
            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all duration-200"
            onClick={() => onDelete(evento.id)}
            title="Eliminar evento"
          >
            <IconTrash className="w-5 h-5" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
