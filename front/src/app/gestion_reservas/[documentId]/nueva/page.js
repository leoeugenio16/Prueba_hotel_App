"use client";
import ProtectedPage from "../../../components/ProtectedPage";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import './nueva.css'

const NuevaReserva = () => {
  const params = useParams();
  const { documentId } = params;
  const [fechaEntrada, setFechaEntrada] = useState("");
  const [fechaSalida, setFechaSalida] = useState("");
  const [personas, setPersonas] = useState([
    {
      dni: "",
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
      provincia: "",
      localidad: "",
      calle: "",
      numero: "",
      edad: "",
      idExistente: null,
    },
  ]);
  const [cantPersonas, setCantPersonas] = useState(1);
  const [tipoReserva, setTipoReserva] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const entradaDesdeURL = searchParams.get("entrada");
  const salidaDesdeURL = searchParams.get("salida");
  const nombresPermitidos = ['celeste', 'otroNombre', 'otroNombreMas'];

  const checkAuth = () => {
    const token = localStorage.getItem('jwt');
    const usuario = localStorage.getItem('usuario');

    if (!token || !usuario) {
      router.push('/login');
      return false;
    }

    try {
      const parsedUser = JSON.parse(usuario);

      if (!nombresPermitidos.includes(parsedUser.username.toLowerCase())) {
        alert('Usuario sin permiso. Por favor, ingrese datos del usuario autorizado.');
        router.push('/login');
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error:', error);
      router.push('/login');
      return false;
    }
  };

  const handleDNIChange = async (index, dni) => {
    const updated = [...personas];
    updated[index].dni = dni;
    updated[index].idExistente = null;

    if (dni.length === 8) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/personas?filters[dni_persona][$eq]=${dni}`);
        const data = await res.json();

        if (data?.data?.length > 0) {
          const personaExistente = data.data[0];

          updated[index] = {
            ...updated[index],
            nombre: personaExistente.nombre || "",
            apellido: personaExistente.apellido || "",
            email: personaExistente.email || "",
            telefono: personaExistente.telefono || "",
            idExistente: personaExistente.documentId,
          };
        }
      } catch (error) {
        console.error("Error buscando DNI:", error);
      }
    }

    setPersonas(updated);
  };

  const handleInputChange = (index, field, value) => {
    const updated = [...personas];
    updated[index][field] = value;
    setPersonas(updated);
  };

  const addPersonaInput = () => {
    if (personas.length < 4) {
      setPersonas([
        ...personas,
        {
          dni: "",
          nombre: "",
          apellido: "",
          email: "",
          telefono: "",
          provincia: "",
          localidad: "",
          calle: "",
          numero: "",
          idExistente: null,
        },
      ]);
    }
  };

  useEffect(() => {
    if (entradaDesdeURL) setFechaEntrada(entradaDesdeURL);
    if (salidaDesdeURL) setFechaSalida(salidaDesdeURL);
  }, [entradaDesdeURL, salidaDesdeURL]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const reservaRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reservas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: {
            fecha_de_entrada: fechaEntrada,
            fecha_de_salida: fechaSalida,
            tipo: tipoReserva,
            habitacion: {
              connect: [documentId],
            },
            cant_personas: cantPersonas,
          },
        }),
      });

      if (!reservaRes.ok) {
        const errorData = await reservaRes.json();
        console.error("Error al crear la reserva:", errorData);
        alert("Error al crear la reserva");
        return;
      }

      const reservaData = await reservaRes.json();
      const reservaId = reservaData.data.documentId;

      for (let persona of personas) {
        if (persona.idExistente) {
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/personas/${persona.idExistente}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              data: {
                reserva: {
                  connect: [reservaId],
                },
              },
            }),
          });
        } else {
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/personas`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              data: {
                nombre: persona.nombre,
                apellido: persona.apellido,
                dni_persona: persona.dni,
                telefono: persona.telefono,
                email: persona.email,
                direccion_provincias: persona.provincia,
                direccion_localidades: persona.localidad,
                direccion_calles: persona.calle,
                direccion_numero: persona.numero,
                edad: persona.edad,
                reserva: {
                  connect: [reservaId],
                },
              },
            }),
          });
        }
      }

      alert("Reserva y personas guardadas correctamente");
      router.back();
    } catch (error) {
      console.error("Error general en el proceso de reserva:", error);
      alert("Hubo un error. Intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedPage checkAuth={checkAuth}>
      <div className="contenedor-base">
        <h1 className="form-title">Nueva Reserva</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <div>
              <label className="label">Fecha de entrada</label>
              <input
                type="date"
                value={fechaEntrada}
                onChange={(e) => setFechaEntrada(e.target.value)}
                className="input"
                required
                readOnly={!!entradaDesdeURL}
              />
            </div>
            <div>
              <label className="label">Fecha de salida</label>
              <input
                type="date"
                value={fechaSalida}
                onChange={(e) => setFechaSalida(e.target.value)}
                className="input"
                required
                readOnly={!!salidaDesdeURL}
              />
            </div>
            <div>
              <label className="label">Cantidad de personas</label>
              <input
                type="number"
                value={cantPersonas}
                onChange={(e) => setCantPersonas(e.target.valueAsNumber || 1)}
                className="input"
                min="1"
                max="4"
              />
            </div>
          </div>

          <div>
            <h2 className="label">Tipo de Reserva</h2>
            <select
              value={tipoReserva}
              onChange={(e) => setTipoReserva(e.target.value)}
              className="select"
              required
            >
              <option value="">Seleccionar Tipo de Reserva</option>
              <option value="Booking">Booking</option>
              <option value="Pagina Web">Página Web</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          <div>
            <h2 className="label" style={{ marginBottom: '0.75rem' }}>
              Personas (máx. 4)
            </h2>
            {personas.map((persona, index) => (
              <div key={index} className="card-persona">
                <input
                  type="text"
                  placeholder="DNI"
                  value={persona.dni ?? ""}
                  maxLength={8}
                  onChange={(e) => handleDNIChange(index, e.target.value)}
                  className="input"
                  required
                />
                <input
                  type="text"
                  placeholder="Nombre"
                  value={persona.nombre ?? ""}
                  onChange={(e) => handleInputChange(index, "nombre", e.target.value)}
                  className="input"
                  required
                />
                <input
                  type="text"
                  placeholder="Apellido"
                  value={persona.apellido ?? ""}
                  onChange={(e) => handleInputChange(index, "apellido", e.target.value)}
                  className="input"
                />
                <input
                  type="number"
                  placeholder="Edad"
                  value={persona.edad ?? ""}
                  onChange={(e) => handleInputChange(index, "edad", e.target.value)}
                  className="input"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={persona.email ?? ""}
                  onChange={(e) => handleInputChange(index, "email", e.target.value)}
                  className="input"
                />
                <input
                  type="tel"
                  placeholder="Teléfono"
                  value={persona.telefono ?? ""}
                  onChange={(e) => handleInputChange(index, "telefono", e.target.value)}
                  className="input"
                />
                <input
                  type="text"
                  placeholder="Provincia"
                  value={persona.provincia ?? ""}
                  onChange={(e) => handleInputChange(index, "provincia", e.target.value)}
                  className="input"
                />
                <input
                  type="text"
                  placeholder="Localidad"
                  value={persona.localidad ?? ""}
                  onChange={(e) => handleInputChange(index, "localidad", e.target.value)}
                  className="input"
                />
                <input
                  type="text"
                  placeholder="Calle"
                  value={persona.calle ?? ""}
                  onChange={(e) => handleInputChange(index, "calle", e.target.value)}
                  className="input"
                />
                <input
                  type="text"
                  placeholder="Número"
                  value={persona.numero ?? ""}
                  onChange={(e) => handleInputChange(index, "numero", e.target.value)}
                  className="input"
                />
              </div>
            ))}
          </div>

          {personas.length < 4 && (
            <button type="button" onClick={addPersonaInput} className="btn-add">
              Agregar Persona
            </button>
          )}

          <button type="submit" className="btn-submit">
            Crear Reserva
          </button>
        </form>

        {loading && <div className="loading-text">Creando reserva, por favor espera...</div>}
      </div>
    </ProtectedPage>
  );
};

export default NuevaReserva;