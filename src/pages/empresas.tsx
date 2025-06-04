/**
 * @fileoverview Página de Empresas - Lista completa de instituciones aliadas
 *
 * Esta página muestra todas las empresas/instituciones aliadas de la plataforma, permitiendo a los usuarios
 * explorar sus perfiles de manera visual, profesional y corporativa. Utiliza un diseño plano, con degradados sutiles
 * y una jerarquía visual clara, consistente con el resto de la aplicación.
 */

import MainLayout from "../layouts/MainLayout";
import PerfilEmpresarial from "@/components/PerfilEmpresarial";
import { URL_BASE } from "@/config/constants";
import { useEmpresas } from "@/hooks/get-empresas";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

/**
 * @component ListaEmpresas
 * @description Página principal para visualizar la lista completa de empresas/instituciones aliadas
 * @returns {JSX.Element} Página de empresas
 */
export default function ListaEmpresas() {
  const { empresas, error, loading } = useEmpresas();

  return (
    <MainLayout>
      <section className="max-w-7xl mx-auto py-10 px-4 font-montserrat">
        <header className="mb-8 flex items-center gap-3">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-2 rounded-lg">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 21V7a2 2 0 012-2h3.28a2 2 0 011.42.59l1.42 1.42a2 2 0 001.42.59H19a2 2 0 012 2v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /></svg>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Lista de Empresas Aliadas</h1>
        </header>
        <div className="bg-gradient-to-br from-gray-50/50 to-gray-50 rounded-xl p-6 border border-gray-100">
          {loading && (
            <LoadingSpinner text="Cargando empresas..." size={40} variant="default" />
          )}
          {error && (
            <p className="text-center text-red-500 bg-red-50/30 p-4 rounded-lg border border-red-100">
              Ocurrió un error inesperado al obtener los perfiles empresariales
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {(empresas ?? []).map(
              ({ color_rgb, text_color, image_url, name, url, plazas }, idx) => (
                <PerfilEmpresarial
                  title={name}
                  ofertas={plazas?.length ?? 0}
                  img={`${URL_BASE}/${image_url}`}
                  bgColor={color_rgb}
                  textColor={text_color}
                  link={url}
                  styleClass="w-full"
                  key={idx}
                />
              )
            )}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
