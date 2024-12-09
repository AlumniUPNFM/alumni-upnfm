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
import EventoForm from "@/components/EventoForm";
import { Evento } from "@/services/eventos.types";
import { DeleteEvento, SaveEvento } from "@/services/eventos";
import EventoRow from "@/components/EventoRow";
import { useEventos } from "@/hooks/get-eventos";

export default function EventosMaintenance() {
  const { eventos, loading, error, refresh } = useEventos();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSave = async (evento: Evento) => {
    try {
      const updatedEvento = {
        ...evento,
      };
      const res = await SaveEvento(updatedEvento);
      if (res.isSuccess) {
        toast("Evento guardada correctamente");
        refresh();
      } else {
        toast("Error al guardar la evento");
      }
    } catch (error) {
      console.error("Error al guardar la evento", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await DeleteEvento(id);
      if (res.isSuccess) {
        toast("Evento eliminada correctamente");
        refresh();
      } else {
        toast("Error al eliminar la evento");
      }
    } catch (error) {
      console.error("Error al eliminar la evento", error);
    }
  };

  return (
    <MainLayout>
      <main className="mx-auto max-w-screen-xl p-6 mb-6 font-montserrat">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-custom-black">
            Mantenimiento de Eventos
          </h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => setIsDialogOpen(true)}
                className="bg-primary text-white"
              >
                Nuevo Evento
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <EventoForm
                evento={{
                  id: -1,
                  created_at: new Date(),
                  name: "",
                  fecha: new Date(),
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
          <TableCaption>Lista con todas las Eventos.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={9} className="text-center">
                  Cargando...
                </TableCell>
              </TableRow>
            )}
            {error && (
              <TableRow>
                <TableCell colSpan={9} className="text-center text-red-500">
                  Error: {error}
                </TableCell>
              </TableRow>
            )}
            {eventos?.map((x) => (
              <EventoRow
                key={x.id}
                evento={x}
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
