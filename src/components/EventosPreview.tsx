import React from "react";
import { useEventos } from "@/hooks/get-eventos";
import { dateToFormat } from "@/lib/date-to-format";

const EventosPreview: React.FC = () => {
  const { eventos, loading, error } = useEventos();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-6 text-custom-gray">Cargando eventos...</div>
    );
  }
  if (error) {
    return (
      <div className="text-center text-red-500 bg-red-50/30 p-4 rounded-lg border border-red-100">
        Error al cargar los eventos
      </div>
    );
  }
  if (!eventos || eventos.length === 0) {
    return (
      <div className="text-center text-custom-gray p-4">No hay eventos próximos.</div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {eventos
        .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
        .slice(0, 4)
        .map((evento) => (
          <div
            key={evento.id}
            className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/10 shadow-sm hover:border-primary/30 transition-all duration-200"
          >
            <h3 className="text-lg font-bold text-primary mb-2 truncate">{evento.name}</h3>
            <p className="text-sm text-custom-gray mb-1">
              <span className="font-semibold text-primary">Fecha:</span> {dateToFormat(new Date(evento.fecha))}
            </p>
          </div>
        ))}
    </div>
  );
};

export default EventosPreview; 