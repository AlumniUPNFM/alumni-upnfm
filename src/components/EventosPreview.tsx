import React from "react";
import { useEventos } from "@/hooks/get-eventos";
import { dateToFormat } from "@/lib/date-to-format";

interface Props {
  gridCols?: string;
}

const EventosPreview: React.FC<Props> = ({ gridCols = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" }) => {
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

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const futureEventos = eventos?.filter(evento => {
    const eventDate = new Date(evento.fecha);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate >= today;
  });

  if (!futureEventos || futureEventos.length === 0) {
    return (
      <div className="text-center p-8 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/10">
        <h3 className="text-xl font-bold text-primary mb-2">No hay eventos próximos</h3>
        <p className="text-custom-gray">¡Mantente atento a nuestras próximas actividades!</p>
      </div>
    );
  }

  return (
    <div className={`grid ${gridCols} gap-4`}>
      {futureEventos
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