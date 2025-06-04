"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import MainLayout from "../layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { DATA_KEY_USER } from "@/config/constants";
import { User } from "@/types/types";

export default function ChangePassword() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const validateForm = () => {
    if (!formData.current_password || !formData.new_password || !formData.confirm_password) {
      toast.error("Todos los campos son obligatorios");
      return false;
    }

    if (formData.new_password !== formData.confirm_password) {
      toast.error("Las contraseñas no coinciden");
      return false;
    }

    if (formData.new_password.length < 8) {
      toast.error("La contraseña debe tener al menos 8 caracteres");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const userData = JSON.parse(sessionStorage.getItem(DATA_KEY_USER) || "{}") as User;
      
      const response = await fetch("/api/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dni: userData.dni,
          current_password: formData.current_password,
          new_password: formData.new_password,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      toast.success("Contraseña actualizada correctamente");
      router.push("/profile-maintenance");
    } catch (error) {
      const errorMessage = (error as Error).message;
      toast.error(errorMessage || "Ocurrió un error al cambiar la contraseña");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <main className="flex flex-col gap-2 mx-auto max-w-xs">
        <h1 className="text-2xl font-bold text-center mb-4">Cambiar Contraseña</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label className="font-bold" htmlFor="current_password">
              Contraseña Actual
            </Label>
            <Input
              type="password"
              id="current_password"
              value={formData.current_password}
              onChange={handleChange}
              placeholder="******"
              required
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label className="font-bold" htmlFor="new_password">
              Nueva Contraseña
            </Label>
            <Input
              type="password"
              id="new_password"
              value={formData.new_password}
              onChange={handleChange}
              placeholder="******"
              required
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label className="font-bold" htmlFor="confirm_password">
              Confirmar Nueva Contraseña
            </Label>
            <Input
              type="password"
              id="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              placeholder="******"
              required
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Cambiando contraseña..." : "Cambiar Contraseña"}
          </Button>
        </form>
      </main>
    </MainLayout>
  );
} 