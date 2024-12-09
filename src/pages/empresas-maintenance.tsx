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
import { Empresa } from "@/services/empresas.types";
import { useEmpresas } from "@/hooks/get-empresas";
import { DeleteEmpresa, SaveEmpresa } from "@/services/empresas";
import { toast } from "sonner";
import EmpresaForm from "@/components/EmpresaForm";
import EmpresaRow from "@/components/EmpresaRow";

export default function EmpresasMaintenance() {
  const { empresas, loading, error, refreshEmpresas } = useEmpresas();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSave = async (empresa: Empresa, newImage: string | null) => {
    try {
      const updatedEmpresa = {
        ...empresa,
        image_base64: newImage,
      };
      const res = await SaveEmpresa(updatedEmpresa);
      if (res.isSuccess) {
        toast("Empresa guardada correctamente");
        refreshEmpresas();
      } else {
        toast("Error al guardar la empresa");
      }
    } catch (error) {
      console.error("Error al guardar la empresa", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await DeleteEmpresa(id);
      if (res.isSuccess) {
        toast("Empresa eliminada correctamente");
        refreshEmpresas();
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
            Mantenimiento de Instituciones
          </h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => setIsDialogOpen(true)}
                className="bg-primary text-white"
              >
                Nueva Empresa
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <EmpresaForm
                empresa={{
                  id: -1,
                  name: "",
                  color_rgb: "#ffffff",
                  text_color: "#000000",
                  image_url: "",
                  created_at: new Date(),
                  url: "",
                }}
                onSave={(empresa, newImage) => {
                  handleSave(empresa, newImage);
                  setIsDialogOpen(false);
                }}
              />
            </DialogContent>
          </Dialog>
        </header>
        <Table>
          <TableCaption>Lista con todas las Instituciones.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Color</TableHead>
              <TableHead>Texto</TableHead>
              <TableHead>Plazas</TableHead>
              <TableHead>Imagen</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  Cargando...
                </TableCell>
              </TableRow>
            )}
            {error && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-red-500">
                  Error: {error}
                </TableCell>
              </TableRow>
            )}
            {empresas?.map((empresa) => (
              <EmpresaRow
                key={empresa.id}
                empresa={empresa}
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
