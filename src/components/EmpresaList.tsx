import { useEmpresas } from "@/hooks/get-empresas";
import PerfilEmpresarial from "@/components/PerfilEmpresarial";
import Link from "next/link";
import { User } from "@/types/types";
import { URL_BASE } from "@/config/constants";
import { IconSettings } from "@tabler/icons-react";

interface EmpresaListProps {
  user: User | null;
}

export default function EmpresaList({ user }: EmpresaListProps) {
  const {
    empresas,
    loading: loadingEmpresas,
    error: errorEmpresas,
  } = useEmpresas();

  return (
    <section className="my-12 font-montserrat">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-xl xl:text-base font-bold">Red de Instituciones</h2>
        <div className="flex gap-3">
          <Link
            href="/empresas"
            className="bg-custom-green text-white rounded-full py-2 px-4 text-xs xl:text-base hover:bg-custom-green-dark transition-colors duration-200 flex items-center justify-center"
          >
            Lista Completa
          </Link>
          {user?.is_admin && (
            <Link
              href="/empresas-maintenance"
              className="bg-primary text-white rounded-full p-2 flex items-center justify-center hover:bg-primary-dark transition-colors duration-200"
            >
              {/* Icono de configuración */}
              <IconSettings></IconSettings>
            </Link>
          )}
        </div>
      </header>
      {loadingEmpresas && <p className="text-center">Cargando...</p>}
      {errorEmpresas && (
        <p className="text-center text-red-500">
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
              />
            )
          )}
      </div>
    </section>
  );
}
