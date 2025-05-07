"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import ProtectedPage from "../../../components/ProtectedPage";
import './reserva.css'

const DetalleReserva = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.documentId;

  const fechaEntrada = searchParams.get("entrada");
  const fechaSalida = searchParams.get("salida");

  const [reserva, setReserva] = useState(null);
  const [habitacion, setHabitacion] = useState(null);
  const [personas, setPersonas] = useState([]);
  const [diasEstadia, setDiasEstadia] = useState(0);
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
    const fetchReserva = async () => {
      if (!id || !fechaEntrada || !fechaSalida) {
        console.warn("Faltan datos:", { id, fechaEntrada, fechaSalida });
        return;
      }

      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/reservas?filters[habitacion][documentId][$eq]=${id}&filters[fecha_de_entrada][$lte]=${fechaSalida}&filters[fecha_de_salida][$gte]=${fechaEntrada}&populate=*`;

        console.log("🔎 Fetching reserva con URL:", url);

        const res = await fetch(url);
        const data = await res.json();

        console.log("📦 Respuesta de la API:", data);

        const reservaEncontrada = data.data[0];

        if (reservaEncontrada) {
          console.log("✅ Reserva encontrada:", reservaEncontrada);

          const hab = reservaEncontrada.habitacion;
          const pers = reservaEncontrada.personas;

          console.log("🏠 Habitacion:", hab);
          console.log("👥 Personas:", pers);

          setReserva(reservaEncontrada);
          setHabitacion(hab || null);
          setPersonas(pers || []);

          const entrada = new Date(reservaEncontrada.fecha_de_entrada);
          const salida = new Date(reservaEncontrada.fecha_de_salida);
          const diffTime = Math.abs(salida - entrada);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          setDiasEstadia(diffDays);
        } else {
          console.warn("⚠️ No se encontró ninguna reserva para la habitación y fechas indicadas.");
          setReserva(null);
        }
      } catch (error) {
        console.error("❌ Error al obtener la reserva:", error);
      }
    };

    fetchReserva();
  }, [id, fechaEntrada, fechaSalida]);

  if (!reserva) return <p className="p-6">No se encontró una reserva activa para esta habitación en esas fechas.</p>;

  return (
    <ProtectedPage checkAuth={checkAuth}>
      <div className="contenedor-base">
        <h1>📝 Detalle de la Reserva</h1>

        <div className="info">
          <p>
            <span>🏠 Habitación:</span> {habitacion?.numero || habitacion?.documentId || "N/A"}
          </p>
          <p>
            <span>📅 Desde:</span> {reserva.fecha_de_entrada}
          </p>
          <p>
            <span>📅 Hasta:</span> {reserva.fecha_de_salida}
          </p>
          <p>
            <span>⏳ Cantidad de noches:</span> {diasEstadia}
          </p>
          <p>
            <span>🏃‍➡️ Cantidad de personas:</span> {reserva.cant_personas}
          </p>
        </div>

        <div className="personas">
          <h2>👥 Personas en la reserva:</h2>
          {personas.length > 0 ? (
            <ul>
              {personas.map((persona) => (
                <li key={persona.documentId}>
                  <div>
                    <h3>Información de la Persona</h3>
                    <p>Nombre: {persona.nombre}</p>
                    <p>Apellido: {persona.apellido}</p>
                    <p>DNI: {persona.dni_persona}</p>
                    <p>Teléfono: {persona.telefono}</p>
                    <p>Email: {persona.email}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-red-400 font-semibold">No hay personas registradas en esta reserva.</p>
          )}
        </div>

        <div className="mt-8">
          <button
            onClick={() => router.push(`/gestion_reservas/${reserva.habitacion.documentId}/editar/${reserva.documentId}?entrada=${fechaEntrada}&salida=${fechaSalida}`)}
            className="btn-editar"
          >
            Editar Reserva
          </button>
          <button onClick={() => router.back()} className="volver">
            ⬅️ Volver
          </button>
        </div>
      </div>
    </ProtectedPage>
  );


};

export default DetalleReserva;
