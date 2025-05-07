"use client";
import ProtectedPage from "../../../../components/ProtectedPage";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const EditarReserva = () => {
  const params = useParams();
  const { reservaId } = params;
  const [fechaEntrada, setFechaEntrada] = useState("");
  const [fechaSalida, setFechaSalida] = useState("");
  const [personas, setPersonas] = useState([]);
  const [tipoReserva, setTipoReserva] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const nombresPermitidos = ['celeste', 'otroNombre', 'otroNombreMas'];
  const [cantPersonas, setCantPersonas] = useState(1);

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

  useEffect(() => {
    const fetchReserva = async () => {
      if (!params.reservaId) {
        console.warn("Faltan datos:", { reservaId: params.reservaId });
        return;
      }

      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/reservas/${params.reservaId}?populate=*`;

        console.log("🔎 Fetching reserva con URL:", url);

        const res = await fetch(url);
        const data = await res.json();

        console.log("📦 Respuesta de la API:", data);

        if (data.data) {
          setFechaEntrada(data.data.fecha_de_entrada);
          setFechaSalida(data.data.fecha_de_salida);
          setPersonas(data.data.personas.map((persona) => ({
            dni: persona.dni_persona,
            nombre: persona.nombre,
            apellido: persona.apellido,
            email: persona.email,
            telefono: persona.telefono,
            provincia: persona.direccion_provincias,
            localidad: persona.direccion_localidades,
            calle: persona.direccion_calles,
            numero: persona.direccion_numero,
            edad: persona.edad,
            idExistente: persona.documentId,
          })));
          setTipoReserva(data.data.tipo);
          setCantPersonas(data.data.cant_personas || 1);
        } else {
          console.warn("⚠️ No se encontró ninguna reserva con el ID indicado.");
        }
      } catch (error) {
        console.error("❌ Error al obtener la reserva:", error);
      }
    };

    fetchReserva();
  }, [params.reservaId]);

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
          edad: "",
          idExistente: null,
        },
      ]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reservas/${params.reservaId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: {
            fecha_de_entrada: fechaEntrada,
            fecha_de_salida: fechaSalida,
            tipo: tipoReserva,
            cant_personas: cantPersonas,
          },
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Error al editar la reserva:", errorData);
        alert("Error al editar la reserva");
        return;
      }

      for (let persona of personas) {
        if (persona.idExistente) {
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/personas/${persona.idExistente}`, {
            method: "PUT",
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

      alert("Reserva editada correctamente");
      router.back();
    } catch (error) {
      console.error("Error al editar la reserva:", error);
      alert("Error al editar la reserva");
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteReserva = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reservas/${params.reservaId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Reserva eliminada correctamente");
        router.back();
      } else {
        const errorData = await res.json();
        console.error("Error al eliminar la reserva:", errorData);
        alert("Error al eliminar la reserva");
      }
    } catch (error) {
      console.error("Error al eliminar la reserva:", error);
      alert("Error al eliminar la reserva");
    }
  };
  return (
    <ProtectedPage checkAuth={checkAuth}>
      <div className="contenedor-base">
        <h1 className="form-title">Editar Reserva</h1>
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
            Guardar cambios
          </button>
          <button type="button" onClick={() => {
            if (confirm("¿Estás seguro de que deseas eliminar esta reserva?")) {
              handleDeleteReserva();
            }
          }} className="btn-delete">
            Eliminar Reserva
          </button>
        </form>

        {loading && <div className="loading-text">Editando reserva, por favor espera...</div>}
      </div>
    </ProtectedPage>
  );
};

export default EditarReserva;