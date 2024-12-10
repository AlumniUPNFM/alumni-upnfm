"use client";

import MainLayout from "../layouts/MainLayout";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";
import FormacionForm from "@/components/FormacionForm";
import { Formacion } from "@/services/formaciones.types";
import { DeleteFormacion, SaveFormacion } from "@/services/formaciones";
import FormacionRow from "@/components/FormacionRow";
import { useFormaciones } from "@/hooks/get-formaciones";

export default function FormacionesMaintenance() {
  const { formaciones, loading, error, refresh } = useFormaciones();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSave = async (formacion: Formacion) => {
    try {
      const updatedFormacion = {
        ...formacion,
      };
      const res = await SaveFormacion(updatedFormacion);
      if (res.isSuccess) {
        toast("Formacion guardada correctamente");
        refresh();
      } else {
        toast("Error al guardar la empresa");
      }
    } catch (error) {
      console.error("Error al guardar la empresa", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await DeleteFormacion(id);
      if (res.isSuccess) {
        toast("Formacion eliminada correctamente");
        refresh();
      } else {
        toast("Error al eliminar la empresa");
      }
    } catch (error) {
      console.error("Error al eliminar la empresa", error);
    }
  };

  return (
    <MainLayout>
      <main className="mx-auto max-w-screen-xl p-6 mb-6 font-montserrat">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-custom-black">
            Mantenimiento de Formaciones
          </h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => setIsDialogOpen(true)}
                className="bg-primary text-white"
              >
                Nueva Formacion
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <FormacionForm
                formacion={{
                  id: -1,
                  created_at: new Date(),
                  degree_id: -1,
                  modalidad: "",
                  lugar: "",
                  capacidad: 0,
                  duracion: "",
                  name: "",
                  descripcion: "",
                  fecha: new Date(),
                  id_tipo: -1,
                  url: "",
                  institucion: "",
                  facultad: "",
                  instructor: "",
                }}
                onSave={(formacion) => {
                  handleSave(formacion);
                  setIsDialogOpen(false);
                }}
              />
            </DialogContent>
          </Dialog>
        </header>
        <Table>
          <TableCaption>Lista con todas las Formaciones.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripcion</TableHead>
              <TableHead>Carrera</TableHead>
              <TableHead>Modalidad</TableHead>
              <TableHead>Lugar</TableHead>
              <TableHead>Capacidad</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Duración</TableHead>
              <TableHead>Institucion</TableHead>
              <TableHead>Facultad</TableHead>
              <TableHead>Instructor</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={14} className="text-center">
                  Cargando...
                </TableCell>
              </TableRow>
            )}
            {error && (
              <TableRow>
                <TableCell colSpan={14} className="text-center text-red-500">
                  Error: {error}
                </TableCell>
              </TableRow>
            )}
            {formaciones?.map((empresa) => (
              <FormacionRow
                key={empresa.id}
                formacion={empresa}
                onSave={handleSave}
                onDelete={handleDelete}
              />
            ))}
          </TableBody>
        </Table>
      </main>
    </MainLayout>
  );
}
