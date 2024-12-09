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

  useEffect(() => {
    const dataUser = JSON.parse(
      sessionStorage.getItem(DATA_KEY_USER) || "{}"
    ) as User | null;

    if (!dataUser) {
      router.push("/login");
      return;
    }

    setUser(dataUser);
    setUserData(dataUser);
  }, []);

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
      {!user ? (
        <h1>Cargando...</h1>
      ) : (
        <main className="flex flex-col gap-2 mx-auto max-w-xs">
          <div className="grid w-full justify-center items-center gap-1.5">
            <ProfileImage
              classNameAvatar="size-24"
              dni={user.dni}
              lastNames={user.last_names}
              names={user.names}
            ></ProfileImage>
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label className="font-bold" htmlFor="nombres">
              Nombres
            </Label>
            <Input
              type="text"
              className="bg-white"
              id="nombres"
              value={userData.names}
              onChange={(e) => {
                if (e) handleChangeOnInput(CHANGE_TYPES.NAMES, e.target.value);
              }}
              placeholder="Juan Alberto"
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label className="font-bold" htmlFor="apellidos">
              Apellidos
            </Label>
            <Input
              type="text"
              className="bg-white"
              id="apellidos"
              value={userData.last_names}
              onChange={(e) => {
                if (e)
                  handleChangeOnInput(CHANGE_TYPES.LAST_NAMES, e.target.value);
              }}
              placeholder="Perez Hernández"
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label className="font-bold" htmlFor="dni">
              DNI
            </Label>
            <Input
              id="dni"
              className="bg-white"
              type="text"
              value={userData.dni}
              onChange={(e) => {
                if (e) handleChangeOnInput(CHANGE_TYPES.DNI, e.target.value);
              }}
              placeholder="0801999912345"
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label className="font-bold" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              className="bg-white"
              type="email"
              value={userData.email || ""}
              onChange={(e) => {
                if (e) handleChangeOnInput(CHANGE_TYPES.EMAIL, e.target.value);
              }}
              placeholder="example@example.com"
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label className="font-bold" htmlFor="phone">
              Teléfono
            </Label>
            <Input
              id="phone"
              className="bg-white"
              type="text"
              value={userData.phone || ""}
              onChange={(e) => {
                if (e) handleChangeOnInput(CHANGE_TYPES.PHONE, e.target.value);
              }}
              placeholder="88285038"
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label className="font-bold" htmlFor="address">
              Dirección
            </Label>
            <Input
              id="address"
              className="bg-white"
              type="text"
              value={userData.address || ""}
              onChange={(e) => {
                if (e)
                  handleChangeOnInput(CHANGE_TYPES.ADDRESS, e.target.value);
              }}
              placeholder="Calle 123"
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label className="font-bold" htmlFor="birthdate">
              Fecha de Nacimiento
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "justify-start text-left font-normal",
                    !userData.birthdate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {userData.birthdate ? (
                    format(userData.birthdate, "PPP")
                  ) : (
                    <span>Seleccionar una fecha</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
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

          <div className="grid w-full items-center gap-1.5">
            <Label className="font-bold" htmlFor="degree">
              Carrera
            </Label>
            <SelectDegree
              idDegree={userData.degree_id}
              onSelect={(e) => {
                if (e) handleChangeOnInput(CHANGE_TYPES.DEGREE_ID, e);
              }}
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label className="font-bold" htmlFor="nombres">
              Nueva imagen de perfil
            </Label>
            <Input
              type="file"
              id="nueva-imagen"
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
          <Button disabled={loading} onClick={handleSubmit}>
            Guardar
          </Button>
        </main>
      )}
    </MainLayout>
  );
}
