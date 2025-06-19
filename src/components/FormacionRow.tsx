import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { 
  IconPencil, 
  IconTrash, 
  IconSchool, 
  IconFileText, 
  IconUserCheck, 
  IconClock, 
  IconMapPin, 
  IconUsers, 
  IconCalendar, 
  IconBuilding,
  IconLink
} from "@tabler/icons-react";
import { Formacion } from "@/services/formaciones.types";
import FormacionForm from "./FormacionForm";
import { dateToFormat } from "@/lib/date-to-format";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface FormacionRowProps {
  formacion: Formacion;
  onSave: (formacion: Formacion) => void;
  onDelete: (id: number) => void;
  status?: { status: string; variant: "default" | "secondary" | "destructive" | "outline" };
}

export default function FormacionRow({
  formacion,
  onSave,
  onDelete,
  status,
}: FormacionRowProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <TableRow className="hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200 group">
      <TableCell className="px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-colors">
            <IconSchool className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">{formacion.tipo?.name}</p>
            {status && (
              <Badge variant={status.variant} className="text-xs mt-1">
                {status.status}
              </Badge>
            )}
          </div>
        </div>
      </TableCell>
      <TableCell className="px-6 py-6">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-100 rounded-md">
            <IconFileText className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900">{formacion.name}</p>
            <p className="text-sm text-gray-500 truncate max-w-xs">{formacion.descripcion}</p>
          </div>
        </div>
      </TableCell>
      <TableCell className="px-6 py-6">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-purple-100 rounded-md">
            <IconUserCheck className="w-4 h-4 text-purple-600" />
          </div>
          <span className="font-medium text-gray-900">{formacion.degree?.name}</span>
        </div>
      </TableCell>
      <TableCell className="px-6 py-6">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-green-100 rounded-md">
            <IconClock className="w-4 h-4 text-green-600" />
          </div>
          <span className="text-gray-900">{formacion.modalidad}</span>
        </div>
      </TableCell>
      <TableCell className="px-6 py-6">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-orange-100 rounded-md">
            <IconMapPin className="w-4 h-4 text-orange-600" />
          </div>
          <span className="text-gray-900">{formacion.lugar}</span>
        </div>
      </TableCell>
      <TableCell className="px-6 py-6">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-teal-100 rounded-md">
            <IconUsers className="w-4 h-4 text-teal-600" />
          </div>
          <span className="font-semibold text-gray-900">{formacion.capacidad}</span>
        </div>
      </TableCell>
      <TableCell className="px-6 py-6">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-red-100 rounded-md">
            <IconCalendar className="w-4 h-4 text-red-600" />
          </div>
          <span className="text-gray-900">{dateToFormat(new Date(formacion.fecha))}</span>
        </div>
      </TableCell>
      <TableCell className="px-6 py-6">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-gray-100 rounded-md">
            <IconBuilding className="w-4 h-4 text-gray-600" />
          </div>
          <span className="text-gray-900">{formacion.institucion}</span>
        </div>
      </TableCell>
      <TableCell className="px-6 py-6">
        <div className="flex items-center justify-center gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                title="Editar formación"
                onClick={() => setIsDialogOpen(true)}
              >
                <IconPencil className="w-5 h-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
              <FormacionForm
                formacion={formacion}
                onSave={(updatedFormacion) => {
                  onSave(updatedFormacion);
                  setIsDialogOpen(false);
                }}
              />
            </DialogContent>
          </Dialog>
          <Button
            variant="ghost"
            size="sm"
            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all duration-200"
            onClick={() => onDelete(formacion.id)}
            title="Eliminar formación"
          >
            <IconTrash className="w-5 h-5" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
