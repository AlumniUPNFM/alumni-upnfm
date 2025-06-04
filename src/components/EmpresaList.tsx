/**
 * @fileoverview Componente EmpresaList - Muestra una red de instituciones/empresas
 *
 * Este componente presenta una vista de las instituciones aliadas, mostrando sus perfiles empresariales
 * destacados y permitiendo el acceso a la lista completa o a la gestión (si el usuario es administrador).
 * Utiliza un diseño plano, corporativo y con degradados sutiles para mantener coherencia visual.
 */

import { useEmpresas } from "@/hooks/get-empresas";
import PerfilEmpresarial from "@/components/PerfilEmpresarial";
import Link from "next/link";
import { User } from "@/types/types";
import { URL_BASE } from "@/config/constants";
import { IconSettings, IconBuildingBank } from "@tabler/icons-react";

/**
 * @interface EmpresaListProps
 * @description Propiedades requeridas para el componente EmpresaList
 * @property {User | null} user - Información del usuario actual, puede ser null si no hay sesión
 */
interface EmpresaListProps {
  user: User | null;
}

/**
 * @component EmpresaList
 * @description Componente principal que renderiza la red de instituciones/empresas aliadas
 * @param {EmpresaListProps} props - Propiedades del componente
 * @returns {JSX.Element} Componente de lista de empresas
 */
export default function EmpresaList({ user }: EmpresaListProps) {
  const {
    empresas,
    loading: loadingEmpresas,
    error: errorEmpresas,
  } = useEmpresas();

  return (
    <section className="my-12 font-montserrat">
      {/* Encabezado con título y botones de acción */}
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-2 rounded-lg">
            <IconBuildingBank className="text-primary w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Red de Instituciones</h2>
        </div>
        <div className="flex gap-3">
          <Link
            href="/empresas"
            className="bg-gradient-to-r from-primary/90 to-primary text-white rounded-lg py-2 px-6 text-sm font-medium hover:opacity-90 transition-all duration-200 flex items-center justify-center gap-2"
          >
            Lista Completa
          </Link>
          {user?.is_admin && (
            <Link
              href="/empresas-maintenance"
              className="bg-gradient-to-r from-custom-green/90 to-custom-green text-white rounded-lg p-2 flex items-center justify-center hover:opacity-90 transition-all duration-200"
              title="Gestionar instituciones"
            >
              <IconSettings className="w-5 h-5" />
            </Link>
          )}
        </div>
      </header>
      {loadingEmpresas && (
        <div className="py-8">
          <p className="text-center text-gray-500">Cargando...</p>
        </div>
      )}
      {errorEmpresas && (
        <p className="text-center text-red-500 bg-red-50/30 p-4 rounded-lg border border-red-100">
          Error al cargar los perfiles empresariales
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {empresas
          ?.slice(0, 4)
          .map(
            ({ id, color_rgb, text_color, image_url, name, url, plazas }) => (
              <PerfilEmpresarial
                key={id}
                title={name}
                ofertas={plazas?.length ?? 0}
                img={`${URL_BASE}/${image_url}`}
                bgColor={color_rgb}
                textColor={text_color}
                link={url}
                styleClass="border-0 bg-gradient-to-br from-primary/5 to-primary/10 hover:from-primary/10 hover:to-primary/20"
              />
            )
          )}
      </div>
    </section>
  );
}
