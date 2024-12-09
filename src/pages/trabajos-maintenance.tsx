"use client";

import Image from "next/image";
import MainLayout from "@/layouts/MainLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Trabajo } from "@/services/trabajos.types";
import { toast } from "sonner";
import { useState } from "react";
import { useTrabajos } from "@/hooks/get-trabajos";
import { DeleteTrabajo, SaveTrabajo } from "@/services/trabajos";
import { IconFilePlus, IconPencil, IconTrash } from "@tabler/icons-react";
import TrabajoForm from "@/components/TrabajoForm";
import { URL_BASE } from "@/config/constants";

export default function TrabajosMaintenance() {
  const { trabajos, loading, error, refreshTrabajos } = useTrabajos();
  const [trabajoToEdit, setTrabajoToEdit] = useState<Trabajo | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleSaveTrabajo = async (trabajo: Trabajo) => {
    try {
      const res = await SaveTrabajo(trabajo);
      if (res.isSuccess) {
        toast.success("Trabajo guardado correctamente");
        setTrabajoToEdit(null);
        setIsAddDialogOpen(false);
        // Actualizar la lista de trabajos sin recargar la página
        // Puedes implementar una función para refrescar los datos
        await refreshTrabajos();
      } else {
        toast.error("Error al guardar el trabajo");
      }
    } catch (error) {
      console.error("Error al guardar el trabajo", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await DeleteTrabajo(id);
      if (res.isSuccess) {
        toast.success("Trabajo eliminado correctamente");
        // Actualizar la lista de trabajos sin recargar la página
        // Puedes implementar una función para refrescar los datos
      } else {
        toast.error("Error al eliminar el trabajo");
      }
    } catch (error) {
      console.error("Error al eliminar el trabajo", error);
    }
  };

  return (
    <MainLayout>
      <main className="max-w-7xl mx-auto p-6 font-montserrat">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Mantenimiento de Trabajos
          </h1>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="flex items-center gap-2"
          >
            <IconFilePlus className="w-5 h-5" />
            Agregar Trabajo
          </Button>
        </header>

        <div className="overflow-auto">
          <Table className="min-w-full divide-y divide-gray-200">
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Puesto
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Carrera
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Empresa
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Imagen
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Salario
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ubicación
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo de Oferta
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jornada
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contrato
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Experiencia
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Idiomas
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descripción
                </TableHead>
                <TableHead className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white divide-y divide-gray-200">
              {loading && (
                <TableRow>
                  <TableCell colSpan={13} className="text-center py-4">
                    Cargando...
                  </TableCell>
                </TableRow>
              )}
              {error && (
                <TableRow>
                  <TableCell
                    colSpan={13}
                    className="text-center text-red-500 py-4"
                  >
                    Error al cargar los trabajos.
                  </TableCell>
                </TableRow>
              )}
              {trabajos?.map((trabajo) => (
                <TableRow
                  key={trabajo.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {trabajo.puesto}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {trabajo.degree?.name}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {trabajo.empresa?.name}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    <Image
                      src={`${URL_BASE}${trabajo.empresa?.image_url}`}
                      alt={`Logo de ${trabajo.empresa?.name}`}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {trabajo.salario}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {trabajo.ubicacion}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {trabajo.tipo_oferta}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {trabajo.jornada}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {trabajo.contrato}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {trabajo.experiencia_laboral} años
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {trabajo.idiomas}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-pre-wrap text-sm text-gray-700 max-w-xs">
                    {trabajo.description}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap flex items-center gap-2 justify-center">
                    <Dialog
                      open={trabajoToEdit?.id === trabajo.id}
                      onOpenChange={(open) =>
                        setTrabajoToEdit(open ? trabajo : null)
                      }
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-800"
                          title="Editar"
                        >
                          <IconPencil className="w-5 h-5" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-xl">
                        {trabajoToEdit && (
                          <TrabajoForm
                            trabajo={trabajoToEdit}
                            onSave={handleSaveTrabajo}
                          />
                        )}
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(trabajo.id)}
                      title="Eliminar"
                    >
                      <IconTrash className="w-5 h-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Dialogo para agregar nuevo trabajo */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-xl">
            <TrabajoForm onSave={handleSaveTrabajo} />
          </DialogContent>
        </Dialog>
      </main>
    </MainLayout>
  );
}
