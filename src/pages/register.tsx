"use client"; // Necesario para usar hooks en componentes de Next.js

import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

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
import SelectDegree from "@/components/SelectDegree";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    dni: "",
    names: "",
    lastNames: "",
    degreeId: -1,
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    if (id === "dni") {
      // Permitir solo números y limitar a 13 caracteres
      const sanitizedValue = value.replace(/\D/g, "").slice(0, 13);
      setFormData((prevData) => ({ ...prevData, dni: sanitizedValue }));
    } else {
      setFormData((prevData) => ({ ...prevData, [id]: value }));
    }
  };

  const handleDegreeChange = (degreeId: number) => {
    setFormData((prevData) => ({ ...prevData, degreeId }));
  };

  const validate = () => {
    if (
      !formData.dni ||
      !formData.names ||
      !formData.lastNames ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setMessage("Todos los campos son obligatorios.");
      setError(true);
      return false;
    }

    if (formData.dni.length !== 13) {
      setMessage("El DNI debe tener 13 dígitos.");
      setError(true);
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage("Las contraseñas no coinciden.");
      setError(true);
      return false;
    }

    if (formData.password.length < 8) {
      setMessage("La contraseña debe tener al menos 8 caracteres.");
      setError(true);
      return false;
    }

    if (formData.degreeId === -1) {
      setMessage("Selecciona una carrera.");
      setError(true);
      return false;
    }

    setMessage("");
    setError(false);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dni: formData.dni,
          names: formData.names,
          last_names: formData.lastNames,
          password: formData.password,
          degree_id: formData.degreeId,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setMessage("¡Registro exitoso!");
      router.push("/login");
    } catch (error) {
      const errorMessage = (error as Error).message;
      setError(true);
      setMessage(errorMessage ?? "Ocurrió un error inesperado.");
    } finally {
      setLoading(false);
    }
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
          <CardTitle className="text-2xl font-bold">Registro</CardTitle>
          <CardDescription className="text-gray-600">
            ¡Bienvenido a Alumni UPN!
            <br />
            Regístrate para ver tus ofertas de trabajo.
          </CardDescription> {/*Tu plataforma de empleabilidad en línea.*/}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="dni">DNI</Label>
              <Input
                type="text"
                id="dni"
                value={formData.dni}
                onChange={handleChange}
                placeholder="0801999912345"
                maxLength={13}
                required
              />
            </div>
            <div>
              <Label htmlFor="names">Nombres</Label>
              <Input
                type="text"
                id="names"
                value={formData.names}
                onChange={handleChange}
                placeholder="Juan Alberto"
                required
              />
            </div>
            <div>
              <Label htmlFor="lastNames">Apellidos</Label>
              <Input
                type="text"
                id="lastNames"
                value={formData.lastNames}
                onChange={handleChange}
                placeholder="Perez Hernández"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="degree">Carrera</Label>
              <SelectDegree onSelect={handleDegreeChange} />
            </div>
            <div>
              <Label htmlFor="password">Contraseña</Label>
              <Input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="******"
                required
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
              <Input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="******"
                required
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
              {loading ? "Registrando..." : "Registrarse"}
            </Button>
          </form>
          <p className="text-center text-sm mt-4">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Inicia sesión
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
