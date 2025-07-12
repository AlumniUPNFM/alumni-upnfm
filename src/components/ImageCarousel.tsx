import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const images = [
  "/carousel/upnfm_1.jpeg",
  "/carousel/upnfm_2.jpeg",
  "/carousel/upnfm_3.jpeg",
  "/carousel/upnfm_4.jpeg",
];

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const overlayText = "Bienvenido a la Red Alumni UPNFM - Conectando Egresados, Oportunidades y Formación Continua";

const ImageCarousel: React.FC = () => {
  return (
    <div className="relative w-full h-64 md:h-96 lg:h-[450px] rounded-xl overflow-hidden shadow-lg">
      {/* Overlay text */}
      <div className="absolute z-20 w-full h-full flex items-center justify-center pointer-events-none">
        <h2 className="text-white xl:text-3xl font-bold text-center drop-shadow-lg px-6 py-3 rounded-xl animate-fade-in">
          {overlayText}
        </h2>
      </div>
      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={4000}
        transitionDuration={900}
        showDots
        arrows={false}
        containerClass="h-64 md:h-96 lg:h-[450px]"
        itemClass="h-64 md:h-96 lg:h-[450px]"
        dotListClass="absolute bottom-4 w-full flex justify-center z-30"
        draggable
        swipeable
        renderDotsOutside={true}
      >
        {images.map((src, idx) => (
          <div key={idx} className="w-full h-64 md:h-96 lg:h-[450px] relative group">
            <img
              src={src}
              alt={`Carrusel ${idx + 1}`}
              className="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-in-out"
              loading="lazy"
            />
            {/* Sombra animada al hacer hover */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageCarousel; 