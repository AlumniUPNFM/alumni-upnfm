"use client";

import Image from "next/image";
import HeaderButton from "./HeaderButton";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "@/types/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import ProfileImage from "./ProfileImage";
import Link from "next/link";
import {
  getDataFromSessionStorage,
  removeDataFromSessionStorage,
} from "@/lib/alumni-session";

const Header = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const [userLogged, setUserLogged] = useState<User | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isWork = currentPath === "/";
  const isCalendar = currentPath === "/calendar";
  const isProfiles = currentPath === "/profiles";
  const isFormacionContinua = currentPath === "/formacion-continua";
  const isNotifications = currentPath === "/notifications";

  useEffect(() => {
    const user = getDataFromSessionStorage();
    setUserLogged(user);
  }, []);

  const handleLogout = () => {
    removeDataFromSessionStorage();
    setUserLogged(null);
    router.refresh();
  };

  return (
    <header className="bg-primary mb-6 py-4 font-montserrat">
      <div className="mx-4 lg:mx-36 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo-alumni-upnfm.png"
            alt="Logo"
            width={512}
            height={512}
            className="w-20 bg-white rounded-full cursor-pointer p-2 hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </Link>
        {/* Botón del menú móvil */}
        <div className="lg:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {/* Icono del menú */}
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {!isMobileMenuOpen && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-menu-2"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 6l16 0" />
                  <path d="M4 12l16 0" />
                  <path d="M4 18l16 0" />
                </svg>
              )}
            </svg>
          </button>
        </div>
        {/* Navegación y perfil de usuario */}
        <div
          className={`${
            isMobileMenuOpen ? "flex" : "hidden"
          } flex-col lg:flex lg:flex-row lg:items-center lg:gap-6`}
        >
          {/* Navegación */}
          <nav className="flex flex-col lg:flex-row items-center gap-3">
            <svg
              onClick={() => setIsMobileMenuOpen(false)}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-x text-primary bg-white rounded-full p-1 cursor-pointer lg:hidden"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M18 6l-12 12" />
              <path d="M6 6l12 12" />
            </svg>
            <HeaderButton
              isAnchor={true}
              isDisabled={true}
              selected={isWork}
              href="/"
              text="Trabajo"
              styleClass="w-full xl:w-max"
            />
            <HeaderButton
              isAnchor={true}
              selected={isCalendar}
              href="/calendar"
              text="Calendario"
              styleClass="w-full xl:w-max"
            />
            <HeaderButton
              isAnchor={true}
              selected={isProfiles}
              href="/profiles"
              text="Perfiles"
              styleClass="w-full xl:w-max"
            />
            <HeaderButton
              isAnchor={true}
              selected={isFormacionContinua}
              href="/formacion-continua"
              text="Formación Continua"
              styleClass="w-full xl:w-max"
            />
            <HeaderButton
              isAnchor={true}
              isDisabled={true}
              selected={isNotifications}
              href="/notifications"
              text="Notificaciones"
              styleClass="w-full xl:w-max"
            />
          </nav>
          {/* Perfil de usuario o botón de iniciar sesión */}
          {userLogged ? (
            <div className="w-full flex justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <ProfileImage
                    dni={userLogged.dni}
                    names={userLogged.names}
                    lastNames={userLogged.last_names}
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link className="no-underline" href="/profile-maintenance">
                      Perfil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="w-full flex justify-center mt-4 xl:mt-0">
              <HeaderButton
                isAnchor={true}
                selected={false}
                href="/login"
                text="Iniciar Sesión"
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
