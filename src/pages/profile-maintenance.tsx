"use client"; // Necesario para usar hooks en componentes de Next.js

import { User } from "@/types/types";
import MainLayout from "../layouts/MainLayout";
import { useEffect, useState } from "react";
import { DATA_KEY_USER } from "@/config/constants";
import { useRouter } from "next/router";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import SelectDegree from "@/components/SelectDegree";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { FETCH_PUT } from "@/lib/fetch";
import ProfileImage from "@/components/ProfileImage";
import { toast } from "sonner";
import { setDataToSessionStorage } from "@/lib/alumni-session";

enum CHANGE_TYPES {
  ADDRESS = "address",
  DNI = "dni",
  AVATAR_URL = "avatar_url",
  EMAIL = "email",
  LAST_NAMES = "last_names",
  NAMES = "names",
  PHONE = "phone",
  BIRTHDATE = "birthdate",
  CREATED_AT = "created_at",
  DEGREE_ID = "degree_id",
}

export default function Page() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<User>({
    address: "",
    dni: "",
    avatar_url: "",
    email: "",
    last_names: "",
    names: "",
    phone: "",
    birthdate: new Date(),
    created_at: new Date(),
    degree_id: -1,
    is_admin: false,
  });

  const [newImage, setNewImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const dataUser = JSON.parse(
          sessionStorage.getItem(DATA_KEY_USER) || "{}"
        ) as User | null;

        if (!dataUser || !dataUser.dni) {
          router.push("/login");
          return;
        }

        setUser(dataUser);
        setUserData(dataUser);
      } catch (error) {
        console.error("Error checking authentication:", error);
        router.push("/login");
      } finally {
        setAuthLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleChangeOnInput = (
    type: CHANGE_TYPES,
    value: string | number | Date
  ) => {
    setUserData((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await FETCH_PUT("/api/profile-maintenance", {
        ...userData,
        new_avatar_base64: newImage,
      });
      if (!res.isSuccess) throw new Error(res.message);

      setDataToSessionStorage(userData);
      setNewImage(null);
      toast("Datos guardados correctamente", {
        className: "bg-green-500",
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: unknown) {
      toast("Ocurrió un error al guardar los datos", {
        className: "bg-red-500",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      {authLoading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : !user ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <p className="text-red-500">No autorizado. Redirigiendo al login...</p>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="space-y-8">
            {/* Header Section */}
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold text-gray-800">Perfil de Usuario</h1>
              <p className="text-gray-600">Actualiza tu información personal</p>
            </div>

            {/* Profile Image Section */}
            <div className="flex flex-col items-center space-y-4 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
              <ProfileImage
                classNameAvatar="size-32 border-4 border-gray-100 shadow-sm"
                dni={user.dni}
                lastNames={user.last_names}
                names={user.names}
              />
              <div className="space-y-2 w-full max-w-xs">
                <Label className="font-medium text-gray-700" htmlFor="nueva-imagen">
                  Cambiar foto de perfil
                </Label>
                <Input
                  type="file"
                  id="nueva-imagen"
                  className="bg-gray-50 border-gray-200"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        if (e.target?.result) {
                          setNewImage(e.target.result as string);
                        }
                      };
                      reader.readAsDataURL(e.target.files[0]);
                    }
                  }}
                />
              </div>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Personal Information Section */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">Información Personal</h2>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="font-medium text-gray-700" htmlFor="nombres">
                      Nombres
                    </Label>
                    <Input
                      type="text"
                      className="bg-gray-50 border-gray-200 focus:border-gray-300"
                      id="nombres"
                      value={userData.names}
                      onChange={(e) => {
                        if (e) handleChangeOnInput(CHANGE_TYPES.NAMES, e.target.value);
                      }}
                      placeholder="Juan Alberto"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="font-medium text-gray-700" htmlFor="apellidos">
                      Apellidos
                    </Label>
                    <Input
                      type="text"
                      className="bg-gray-50 border-gray-200 focus:border-gray-300"
                      id="apellidos"
                      value={userData.last_names}
                      onChange={(e) => {
                        if (e) handleChangeOnInput(CHANGE_TYPES.LAST_NAMES, e.target.value);
                      }}
                      placeholder="Perez Hernández"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="font-medium text-gray-700" htmlFor="dni">
                      DNI
                    </Label>
                    <Input
                      id="dni"
                      className="bg-gray-50 border-gray-200 focus:border-gray-300"
                      type="text"
                      value={userData.dni}
                      onChange={(e) => {
                        if (e) handleChangeOnInput(CHANGE_TYPES.DNI, e.target.value);
                      }}
                      placeholder="0801999912345"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="font-medium text-gray-700" htmlFor="birthdate">
                      Fecha de Nacimiento
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal bg-gray-50 border-gray-200 hover:bg-gray-100",
                            !userData.birthdate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {userData.birthdate ? (
                            format(userData.birthdate, "PPP")
                          ) : (
                            <span>Seleccionar una fecha</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={userData.birthdate || new Date()}
                          onSelect={(date) => {
                            if (date) handleChangeOnInput(CHANGE_TYPES.BIRTHDATE, date);
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>

              {/* Contact Information Section */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">Información de Contacto</h2>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="font-medium text-gray-700" htmlFor="email">
                      Email
                    </Label>
                    <Input
                      id="email"
                      className="bg-gray-50 border-gray-200 focus:border-gray-300"
                      type="email"
                      value={userData.email || ""}
                      onChange={(e) => {
                        if (e) handleChangeOnInput(CHANGE_TYPES.EMAIL, e.target.value);
                      }}
                      placeholder="example@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="font-medium text-gray-700" htmlFor="phone">
                      Teléfono
                    </Label>
                    <Input
                      id="phone"
                      className="bg-gray-50 border-gray-200 focus:border-gray-300"
                      type="text"
                      value={userData.phone || ""}
                      onChange={(e) => {
                        if (e) handleChangeOnInput(CHANGE_TYPES.PHONE, e.target.value);
                      }}
                      placeholder="88285038"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="font-medium text-gray-700" htmlFor="address">
                      Dirección
                    </Label>
                    <Input
                      id="address"
                      className="bg-gray-50 border-gray-200 focus:border-gray-300"
                      type="text"
                      value={userData.address || ""}
                      onChange={(e) => {
                        if (e) handleChangeOnInput(CHANGE_TYPES.ADDRESS, e.target.value);
                      }}
                      placeholder="Calle 123"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="font-medium text-gray-700" htmlFor="degree">
                      Carrera
                    </Label>
                    <SelectDegree
                      idDegree={userData.degree_id}
                      onSelect={(e) => {
                        if (e) handleChangeOnInput(CHANGE_TYPES.DEGREE_ID, e);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <Button 
                disabled={loading} 
                onClick={handleSubmit}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Guardando...
                  </div>
                ) : (
                  "Guardar Cambios"
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/change-password")}
                className="flex-1 border-gray-200 hover:bg-gray-50"
              >
                Cambiar Contraseña
              </Button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
