'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import './administracion.css';

const Administracion = () => {
  const router = useRouter();

  return (
    <div className="administracion-container">
      <h1 className="administracion-title">Administración</h1>
      <div className="administracion-options">
        <button className="administracion-button" onClick={() => router.push('/gestion_reservas')}>
          Gestionar Reservas
        </button>
        <button className="administracion-button" onClick={() => router.push('/gestion_habitacion')}>
          Gestionar Habitaciones
        </button>
        <button className="administracion-button" onClick={() => router.push('/agregar_productos')}>
          Agregar Productos
        </button>
      </div>
    </div>
  );
};

export default Administracion;