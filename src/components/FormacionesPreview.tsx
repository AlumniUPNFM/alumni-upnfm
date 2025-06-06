import React from "react";
import { useFormaciones } from "@/hooks/get-formaciones";
import { dateToFormat } from "@/lib/date-to-format";

interface Props {
  gridCols?: string;
}

const FormacionesPreview: React.FC<Props> = ({ gridCols = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" }) => {
  const { formaciones, loading, error } = useFormaciones();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-6 text-custom-gray">Cargando formaciones...</div>
    );
  }
  if (error) {
    return (
      <div className="text-center text-red-500 bg-red-50/30 p-4 rounded-lg border border-red-100">
        Error al cargar las formaciones
      </div>
    );
  }
  if (!formaciones || formaciones.length === 0) {
    return (
      <div className="text-center text-custom-gray p-4">No hay formaciones próximas.</div>
    );
  }

  return (
    <div className={`grid ${gridCols} gap-4`}>
      {formaciones
        .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
        .slice(0, 4)
        .map((formacion) => (
          <div
            key={formacion.id}
            className="bg-gradient-to-r from-custom-green/5 to-custom-green/10 rounded-lg p-4 border border-custom-green/10 shadow-sm hover:border-custom-green/30 transition-all duration-200"
          >
            <h3 className="text-lg font-bold text-custom-green mb-2 truncate">{formacion.name}</h3>
            <p className="text-sm text-custom-gray mb-1">
              <span className="font-semibold text-custom-green">Fecha:</span> {dateToFormat(new Date(formacion.fecha))}
            </p>
            <p className="text-xs text-custom-green/80 mb-1">
              <span className="font-semibold">Tipo:</span> {formacion.tipo?.name || "-"}
            </p>
            <p className="text-xs text-custom-green/80">
              <span className="font-semibold">Modalidad:</span> {formacion.modalidad || "-"}
            </p>
          </div>
        ))}
    </div>
  );
};

export default FormacionesPreview; 