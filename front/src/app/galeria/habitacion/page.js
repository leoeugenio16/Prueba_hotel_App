'use client';
import React, { useState } from 'react';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    '/habitacion1.jpg',
    '/habitacion2.jpg',
    '/habitacion3.jpg',
  ];

  const info = [
    { title: 'Cama 2 PLazas', description: '' },
    { title: 'Sillones y mesas', description: '' },
    { title: 'Baño', description: '' },
  ];

  if (images.length === 0) {
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>No hay imágenes disponibles</p>;
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div style={styles.pageBackground}>
      <div style={styles.carouselContainer}>
        <div style={styles.imageContainer}>
          <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} style={styles.image} />
        </div>

       {/*  <div style={styles.infoContainer}>
          <h2 style={styles.title}>{info[currentIndex]?.title}</h2>
          <p style={styles.description}>{info[currentIndex]?.description}</p>
        </div> */}

        <div style={styles.controls}>
          <button style={styles.button} onClick={handlePrev}>⟵</button>
          <span style={styles.counter}>{currentIndex + 1} / {images.length}</span>
          <button style={styles.button} onClick={handleNext}>⟶</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageBackground: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url("/fondoHabitacion.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    padding: '2rem',
  },
  carouselContainer: {
    maxWidth: '600px',
    width: '100%',
    borderRadius: '15px',
    overflow: 'hidden',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
    background: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    padding: '1rem',
    backdropFilter: 'blur(4px)',
  },
  imageContainer: {
    width: '100%',
    height: '300px',
    overflow: 'hidden',
    borderRadius: '10px',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '10px',
  },
  infoContainer: {
    marginTop: '1rem',
  },
  title: {
    fontSize: '1.5rem',
    color: '#333',
    marginBottom: '0.5rem',
  },
  description: {
    fontSize: '1rem',
    color: '#555',
  },
  controls: {
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
  },
  button: {
    fontSize: '1.5rem',
    padding: '0.5rem 1rem',
    borderRadius: '10px',
    border: 'none',
    background: '#0070f3',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
  counter: {
    fontSize: '1rem',
    color: '#888',
  },
};

export default Carousel;
