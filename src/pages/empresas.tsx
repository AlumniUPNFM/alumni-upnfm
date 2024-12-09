import MainLayout from "../layouts/MainLayout";
import PerfilEmpresarial from "@/components/PerfilEmpresarial";
import { URL_BASE } from "@/config/constants";
import { useEmpresas } from "@/hooks/get-empresas";

export default function ListaTrabajo() {
  const { empresas, error, loading } = useEmpresas();

  return (
    <MainLayout>
      <div className="grid grid-cols-12 gap-6 my-6">
        {loading && (
          <div className="col-span-12 flex justify-center items-center">
            <p>Cargando...</p>
          </div>
        )}
        {error && (
          <div className="col-span-12 flex justify-center items-center">
            <p>
              Ocurrió un error inesperado al obtener los perfiles empresariales
            </p>
          </div>
        )}
        {(empresas ?? []).map(
          ({ color_rgb, text_color, image_url, name, url, plazas }, idx) => (
            <PerfilEmpresarial
              title={name}
              ofertas={plazas?.length ?? 0}
              img={`${URL_BASE}/${image_url}`}
              bgColor={color_rgb}
              textColor={text_color}
              link={url}
              styleClass="col-span-12 md:col-span-6 xl:col-span-3 w-full"
              key={idx}
            />
          )
        )}
      </div>
    </MainLayout>
  );
}
