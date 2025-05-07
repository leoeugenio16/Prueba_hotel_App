// src/app/galeria/page.js
import Link from 'next/link';

export default function Galeria() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat lg:bg-[url('/viñedos.jpg')] md:bg-[url('/viñedos_mobile.jpg')] bg-[url('/viñedos_mobile.jpg')]"
    >
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
    </div>
  );
}