"use client"; // Necesario para usar hooks en componentes de Next.js

import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setDataToSessionStorage } from "@/lib/alumni-session";
import { ApiResponse } from "@/types/api-response";
import { User } from "@/types/types";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const [form, setForm] = useState({
    dni: "",
    password: "",
  });

  const handleForgotPassword = async () => {
    if (!form.dni) {
      toast.error("Por favor ingrese su DNI para recuperar su contraseña.");
      return;
    }

    if (form.dni.length !== 13) {
      toast.error("El DNI debe tener 13 dígitos.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dni: form.dni }),
      });

      if (!response.ok) {
        throw new Error("Error al procesar la solicitud");
      }

      toast.success("Se ha enviado una nueva contraseña a su correo electrónico.");
    } catch (error) {
      toast.error("Error al procesar su solicitud. Por favor, intente nuevamente.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dni: form.dni,
          password: form.password,
        }),
      });

      const data = (await response.json()) as ApiResponse<User>;
      if (!response.ok) throw new Error(data.message);

      if (data.isSuccess) {
        setError(false);
        setMessage("¡Inicio de sesión exitoso!");
        setDataToSessionStorage(data.data);
        router.push("/");
      } else {
        setError(true);
        setMessage(data.message);
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      setError(true);
      setMessage(errorMessage ?? "Ocurrió un error inesperado.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    if (id === "dni") {
      // Permitir solo números y limitar a 13 caracteres
      const sanitizedValue = value.replace(/\D/g, "").slice(0, 13);
      setForm((prevForm) => ({ ...prevForm, dni: sanitizedValue }));
    } else {
      setForm((prevForm) => ({ ...prevForm, [id]: value }));
    }
  };

  const validateForm = () => {
    if (!form.dni || !form.password) {
      setMessage("Todos los campos son obligatorios.");
      setError(true);
      return false;
    }

    if (form.dni.length !== 13) {
      setMessage("El DNI debe tener 13 dígitos.");
      setError(true);
      return false;
    }

    return true;
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Image
            src="/logo.webp"
            alt="Logo"
            width={64}
            height={64}
            className="mx-auto mb-4"
          />
          <CardTitle className="text-2xl font-bold">Iniciar Sesión</CardTitle>
          <CardDescription className="text-gray-600">
            ¡Bienvenido a Alumni UPN! Registrate para ser parte de nosotros.
          </CardDescription> {/*Tu plataforma de empleabilidad en línea.*/}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="dni">DNI</Label>
              <Input
                id="dni"
                type="text"
                placeholder="0801999912345"
                value={form.dni}
                onChange={handleChange}
                maxLength={13}
                required
                aria-invalid={error}
              />
            </div>
            <div>
              <Label htmlFor="password">Contraseña</Label>
              <Input
                type="password"
                id="password"
                placeholder="******"
                value={form.password}
                onChange={handleChange}
                required
                aria-invalid={error}
              />
            </div>
            {message && (
              <p
                className={`text-center text-sm ${
                  error ? "text-red-600" : "text-green-600"
                }`}
              >
                {message}
              </p>
            )}
            <Button
              type="submit"
              className="w-full bg-primary text-white hover:bg-primary-dark transition-colors duration-200"
              disabled={loading}
            >
              {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
            <Button
              type="button"
              variant="link"
              className="w-full text-sm text-gray-600 hover:text-primary"
              onClick={handleForgotPassword}
              disabled={loading}
            >
              ¿Olvidaste tu contraseña?
            </Button>
          </form>
          <p className="text-center text-sm mt-4">
            ¿No tienes una cuenta?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Regístrate aquí
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
