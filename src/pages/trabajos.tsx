import { useTrabajos } from "@/hooks/get-trabajos";
import MainLayout from "../layouts/MainLayout";
import OfertaTrabajo from "@/components/OfertaTrabajo";
import { URL_BASE } from "@/config/constants";

export default function Trabajos() {
  const { trabajos, loading, error } = useTrabajos();
  return (
    <MainLayout>
      <div className="grid grid-cols-12 gap-2 font-montserrat">
        <div className="col-span-12">
          <h1 className="text-2xl font-bold">Lista de Trabajos</h1>
        </div>
        <div className="col-span-12">
          {loading && <p>Cargando...</p>}
          {error && <p>Error al cargar los trabajos</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trabajos?.slice(0, 10).map(
              ({
                id,
                puesto,
                salario,
                degree: { name: carrera } = { name: "" },
                created_at: fecha,
                empresa: { name: ubicacion, image_url: img } = {
                  name: "",
                  image_url: "",
                },
              }) => (
                <OfertaTrabajo
                  key={id}
                  id={id}
                  puesto={puesto}
                  salario={salario}
                  carrera={carrera}
                  fecha={new Date(fecha).toISOString().split("T")[0]}
                  img={`${URL_BASE}${img}`}
                  ubicacion={ubicacion}
                />
              )
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
