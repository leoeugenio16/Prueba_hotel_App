"use client";
import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";

const Carousel = ({ images = [], info = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true); // Controla la animación

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(intervalId);
  }, [currentSlide]);

  const nextSlide = () => {
    if (currentSlide === images.length) {
      // Si estamos en la imagen "extra" al final, saltamos sin animación a la primera imagen real
      setIsTransitioning(false);
      setCurrentSlide(0);
      setTimeout(() => setIsTransitioning(true), 50); // Restauramos la animación después de un breve delay
    } else {
      setCurrentSlide((prevSlide) => prevSlide + 1);
    }
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
  };

  const handlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
  });

  if (images.length === 0 || info.length === 0) {
    return <p className="text-center text-gray-500">No hay imágenes disponibles.</p>;
  }

  return (
    <div {...handlers} className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
      <div
        className={`flex w-full h-full ${isTransitioning ? "transition-transform duration-500 ease-in-out" : ""}`}
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {[...images, images[0]].map((src, index) => (
          <div key={index} className="w-full h-full flex-shrink-0 relative">
            <img src={src} alt={`Slide ${index}`} className="w-full h-full object-cover" />
            <div className="absolute top-[70%] left-0 w-full text-white text-center bg-gray-900 bg-opacity-75 py-3 px-6">
              <h2 className="text-lg font-bold">{info[index % images.length]?.title || "Sin título"}</h2>
              <p className="text-sm">{info[index % images.length]?.description || "Sin descripción"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
