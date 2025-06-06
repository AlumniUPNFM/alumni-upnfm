import React from "react";
import ImageCarousel from "./ImageCarousel";
import EventosPreview from "./EventosPreview";
import FormacionesPreview from "./FormacionesPreview";

const Hero: React.FC = () => {
  return (
    <main className="bg-white min-h-[80vh] font-montserrat">
      <section className="max-w-6xl mx-auto px-4 py-8">
        {/* Carrusel de imágenes */}
        <div className="mb-10">
          <ImageCarousel />
        </div>
        {/* Formaciones y Eventos uno encima del otro */}
        <div className="flex flex-col gap-10">
          <div>
            <h2 className="text-xl font-bold text-custom-green mb-4">Formaciones</h2>
            <FormacionesPreview gridCols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-custom-green mb-4">Eventos</h2>
            <EventosPreview gridCols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Hero; 