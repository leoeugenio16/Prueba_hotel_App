"use client";
import { useState } from "react";

export default function Reservas() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [cama, setCama] = useState("");
  const [personas, setPersonas] = useState(1);
  const [seleccionada, setSeleccionada] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleSubmitFechas = (e) => {
    e.preventDefault();

    // Validación opcional
    if (!checkIn || !checkOut) {
      alert("Por favor, seleccioná ambas fechas.");
      return;
    }

    setShowForm(true);
  };

  const handleSubmitReserva = (e) => {
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
    <div className="min-h-screen bg-cover bg-center bg-no-repeat lg:bg-[url('/viñedos.jpg')] md:bg-[url('/viñedos_mobile.jpg')] bg-[url('/viñedos_mobile.jpg')]">
      <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24">
        {!showForm ? (
          <form onSubmit={handleSubmitFechas} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
            <h1 className="text-center p-7 text-4xl font-bold text-black mb-8 mt-20">
              Elegir Fecha
            </h1>
            <div className="mb-4">
              <label className="block text-black mb-2">Check-in</label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full p-2 border rounded text-black"
              />
            </div>
            <div className="mb-4">
              <label className="block text-black mb-2">Check-out</label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                min={checkIn || new Date().toISOString().split("T")[0]}
                className="w-full p-2 border rounded text-black"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Continuar
            </button>
          </form>
        ) : (
          <div>
            <h1 className="text-center p-7 text-4xl font-bold text-black mb-8 mt-20">
              Toca la imagen para elegir cama
            </h1>
            <div className="flex justify-center mb-8 -mt-10">
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
            <form onSubmit={handleSubmitReserva} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
              <div className="mb-4">
                <label className="block text-black mb-2">Nombre</label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full p-2 border rounded text-black"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-black mb-2">Apellido</label>
                <input
                  type="text"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  className="w-full p-2 border rounded text-black"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-black mb-2">Teléfono</label>
                <input
                  type="tel"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  className="w-full p-2 border rounded text-black"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-black mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded text-black"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-black mb-2">Cantidad de Personas</label>
                <input
                  type="number"
                  value={personas}
                  onChange={(e) => setPersonas(e.target.value)}
                  min="1"
                  className="w-full p-2 border rounded text-black"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Consultar disponibilidad
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}