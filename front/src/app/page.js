"use client";
import { useState } from "react";
import { Hotel, Calendar } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [cama, setCama] = useState("");
  const [personas, setPersonas] = useState(1);
  const [seleccionada, setSeleccionada] = useState(null);
  const router = useRouter();

  const handleReservaSubmit = (e) => {
    e.preventDefault();

    const mensaje = `*Solicitud de Reserva*%0A%0A` +
      `*Nombre:* ${nombre}%0A` +
      `*Apellido:* ${apellido}%0A` +
      `*Teléfono:* ${telefono}%0A` +
      `*Email:* ${email}%0A` +
      `*Tipo de cama:* ${cama}%0A` +
      `*Cantidad de personas:* ${personas}%0A` +
      `*Check-in:* ${checkIn}%0A` +
      `*Check-out:* ${checkOut}%0A%0A` +
      `¿Podrían confirmarme la disponibilidad? ¡Gracias!`;
    const url = `https://wa.me/2604677504?text=${mensaje}`;
    window.open(url, "_blank");
  };



  return (
    <div className="text-black">

      {/* Portada principal con video de fondo */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Video de fondo */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/videoprincipal.mp4" type="video/mp4" />
          Tu navegador no soporta la etiqueta de video.
        </video>

        {/* Contenido encima del video */}
        <div className="relative z-10 bg-white bg-opacity-75 p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-5xl font-bold mb-4 flex items-center justify-center">
            <Hotel className="mr-2" /> Bienvenidos
          </h1>
          <p className="text-xl mb-6">Disfruta de una estadía inolvidable con nosotros.</p>
          <div className="flex justify-center mt-8">
          <button
            onClick={() => router.push("/reservas")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
          >
            <Calendar className="mr-2" /> Reservar Ahora
          </button>
          </div>
        </div>
      </section>

      <section id="reserva-completa" className="py-20 bg-cover bg-center" style={{ backgroundImage: "url('/caballo.jpg')" }}>
        <div className="bg-white bg-opacity-90 max-w-2xl mx-auto p-8 rounded-lg shadow-md">
          <h2 className="text-center text-3xl font-bold mb-8">Completá tu reserva</h2>

          {/* Fechas */}
          <div className="mb-8">
            <label className="block mb-2">Check-in</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <label className="block mb-2">Check-out</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="w-full p-2 mb-4 border rounded"
              required
            />
          </div>

          {/* Tipo de cama */}
          <h3 className="text-xl font-semibold mb-4 text-center">Elegí tu cama</h3>
          {seleccionada === "" && (
            <p className="text-center text-lg text-red-600 mb-4">📌 Presiona una foto para elegir tipo de cama</p>
          )}
          <div className="flex justify-center mb-8">
            <div
              className={`mr-4 border-4 ${seleccionada === "matrimonial" ? "border-blue-600" : "border-gray-300"} cursor-pointer`}
              onClick={() => {
                setCama("Matrimonial");
                setSeleccionada("matrimonial");
              }}
            >
              <img src="/matrimonial.jpeg" alt="Cama Matrimonial" width={200} height={150} />
            </div>
            <div
              className={`border-4 ${seleccionada === "doble" ? "border-blue-600" : "border-gray-300"} cursor-pointer`}
              onClick={() => {
                setCama("Doble");
                setSeleccionada("doble");
              }}
            >
              <img src="/dos personas.jpg" alt="Cama Doble" width={200} height={150} />
            </div>
          </div>

          {/* Datos personales */}
          <form onSubmit={handleReservaSubmit}>
            <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full p-2 mb-4 border rounded" required />
            <input type="text" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} className="w-full p-2 mb-4 border rounded" required />
            <input type="tel" placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} className="w-full p-2 mb-4 border rounded" required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 mb-4 border rounded" required />
            <input type="number" placeholder="Cantidad de personas" value={personas} onChange={(e) => setPersonas(e.target.value)} min="1" className="w-full p-2 mb-4 border rounded" required />

            {/* Botón de envío */}
            <button
              type="submit"
              className={`w-full py-2 rounded hover:bg-blue-700 ${seleccionada === "" ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white"}`}
              disabled={seleccionada === ""}
            >
              {seleccionada === "" ? "Elige una cama" : "Consultar disponibilidad"}
            </button>
          </form>
        </div>
      </section>





      {/* Sección Galería */}
      <section id="galeria" className="min-h-screen bg-cover bg-center bg-no-repeat lg:bg-[url('/viñedos.jpg')] md:bg-[url('/viñedos_mobile.jpg')] bg-[url('/viñedos_mobile.jpg')]">
        <div className="grid p-20 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <Link href="/galeria/habitacion">
              <img src="/habitacion_hotel.jpg" alt="Habitación" className="w-full h-64 object-cover rounded-lg" />
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-600">Habitación</h2>
              </div>
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <Link href="/galeria/piscina">
              <img src="/piscina_hotel.jpg" alt="Piscina" className="w-full h-64 object-cover rounded-lg" />
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-600">Piscina</h2>
              </div>
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <Link href="/galeria/restaurante">
              <img src="/almuerzo_hotel.jpg" alt="Restaurante" className="w-full h-64 object-cover rounded-lg" />
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-600">Restaurante</h2>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
