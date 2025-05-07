"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ProtectedPage from "../components/ProtectedPage";
import './gestion.css'

const GestionReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [habitaciones, setHabitaciones] = useState([]);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [habitacionesDisponibles, setHabitacionesDisponibles] = useState([]);
  const [habitacionesOcupadas, setHabitacionesOcupadas] = useState([]);
  const router = useRouter();
  const nombresPermitidos = ['celeste', 'otroNombre', 'otroNombreMas']; 
  const checkAuth = () => {
    const token = localStorage.getItem('jwt');
    const usuario = localStorage.getItem('usuario');

    /* console.log('Token:', token);
    console.log('Usuario:', usuario); */

    if (!token || !usuario) {
      router.push('/login');
      return false;
    }

    try {
      const parsedUser = JSON.parse(usuario);


      if (!nombresPermitidos.includes(parsedUser.username.toLowerCase())) {
        /* console.log('No autorizado'); */
        alert('Usuario sin permiso. Por favor, ingrese datos del usuario autorizado.');
        router.push('/login');
        return false;
      }

      /* console.log('Autenticado y autorizado'); */
      return true;
    } catch (error) {
      console.error('Error:', error);
      router.push('/login');
      return false;
    }
  };

  useEffect(() => {
    const fetchReservas = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reservas?populate=habitacion`);
      const data = await res.json();
      setReservas(data.data);
    };

    const fetchHabitaciones = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/habitacions`);
      const data = await res.json();
      setHabitaciones(data.data);
    };

    fetchReservas();
    fetchHabitaciones();
  }, []);

  const filtrarHabitaciones = () => {
    if (!fechaInicio || !fechaFin) {
      alert("Por favor, seleccioná ambas fechas.");
      return;
    }

    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);

    if (inicio > fin) {
      alert("La fecha de entrada debe ser anterior a la fecha de salida.");
      return;
    }

    const idsOcupados = reservas
      .filter((reserva) => {
        const entrada = new Date(reserva.fecha_de_entrada);
        const salida = new Date(reserva.fecha_de_salida);
        return entrada < fin && salida > inicio;
      })
      .map((reserva) => reserva.habitacion?.documentId)
      .filter(Boolean);

    const disponibles = habitaciones.filter(
      (hab) => !idsOcupados.includes(hab.documentId)
    );
    const ocupadas = habitaciones.filter(
      (hab) => idsOcupados.includes(hab.documentId)
    );

    setHabitacionesDisponibles(disponibles);
    setHabitacionesOcupadas(ocupadas);
  };

  return (
    <ProtectedPage checkAuth={checkAuth}>
    <div className="contenedor-base">
      <h1 className="reservas-title">Gestión de Reservas</h1>
  
      {/* Filtros de fecha */}
      <div className="filtros-wrapper">
        <div>
          <label className="filtro-label">Fecha de entrada</label>
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="filtro-input"
          />
        </div>
        <div>
          <label className="filtro-label">Fecha de salida</label>
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            className="filtro-input"
          />
        </div>
        <button onClick={filtrarHabitaciones} className="btn-filtrar">
          Ver disponibilidad
        </button>
      </div>
  
      {/* Habitaciones disponibles */}
      <div className="habitaciones-section">
        <h2 className="habitaciones-title-green">🟢 Disponibles</h2>
        {habitacionesDisponibles.length > 0 ? (
          <div className="habitaciones-grid">
            {habitacionesDisponibles.map((hab) => (
              <button
                key={hab.documentId}
                onClick={() =>
                  router.push(`/gestion_reservas/${hab.documentId}/nueva?entrada=${fechaInicio}&salida=${fechaFin}`)
                }
                className="habitacion-btn habitacion-disponible"
              >
                Hab {hab.numero ?? 'N/A'}
              </button>
            ))}
          </div>
        ) : (
          <p className="no-habitaciones">No hay habitaciones disponibles.</p>
        )}
      </div>
  
      {/* Habitaciones ocupadas */}
      <div className="habitaciones-section">
        <h2 className="habitaciones-title-red">🔴 Ocupadas</h2>
        {habitacionesOcupadas.length > 0 ? (
          <div className="habitaciones-grid">
            {habitacionesOcupadas.map((hab) => (
              <button
                key={hab.documentId}
                onClick={() =>
                  router.push(`/gestion_reservas/${hab.documentId}/reserva?entrada=${fechaInicio}&salida=${fechaFin}`)
                }
                className="habitacion-btn habitacion-ocupada"
              >
                Hab {hab.numero ?? 'N/A'}
              </button>
            ))}
          </div>
        ) : (
          <p className="no-habitaciones">No hay habitaciones ocupadas.</p>
        )}
      </div>
    </div>
    </ProtectedPage>
  );
  
};

export default GestionReservas;
