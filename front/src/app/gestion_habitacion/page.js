"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import './style.css'

const GestionStock = () => {
  const [habitaciones, setHabitaciones] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchHabitaciones = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/habitacions`);
      const data = await res.json();
      setHabitaciones(data.data);
    };

    fetchHabitaciones();
  }, []);

  return (
    <div className="gestion-habitaciones-container">
      <h1 className="gestion-habitaciones-title">Gestión de Stock por Habitación</h1>
      <div className="habitaciones-grid-layout">
        {habitaciones.map((hab) => (
          <div key={hab.documentId} className="habitacion-item">
            <h2 className="habitacion-numero-label">Habitación {hab.numero ?? "Sin número"}</h2>
            <div className="habitacion-actions">
              <button
                onClick={() =>
                  router.push(`/gestion_habitacion/${hab.documentId}/productos`)
                }
                className="action-button action-button-primary"
              >
                Ver<br />Stock
              </button>
              <button
                onClick={() =>
                  router.push(`/gestion_habitacion/${hab.documentId}/agregar`)
                }
                className="action-button action-button-secondary"
              >
                Editar<br />Stock
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GestionStock;
