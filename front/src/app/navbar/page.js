"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Importar useRouter
import { Menu, X } from "lucide-react"; // Icono de cerrar

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter(); // Instancia de useRouter
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para verificar si el usuario está logueado

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Comprobar si el token existe en el localStorage al montar el componente
      const token = localStorage.getItem('jwt');
      if (token) {
        setIsLoggedIn(true); // El usuario está logueado
      }
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('jwt'); // Eliminar el token del localStorage
    setIsLoggedIn(false); // Actualizar el estado
    router.push('/login'); // Redirigir al usuario a la página de login
  };

  const handleCloseMenu = (path) => {
    setShowMenu(false);
    router.push(path); // Navegación sin recarga
  };

  return (
    <nav className="h-20 bg-transparent fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center h-full px-4">
        {/* Logo */}
        <Link href="/">
          <img
            src="/logo_navbar.png"
            alt="Logo del hotel"
            className="h-full object-cover"
          />
        </Link>

        {/* Enlaces Desktop */}
        <div className="hidden md:flex md:space-x-4">
          <Link
            href="/galeria"
            className="text-black hover:text-gray-800 hover:font-bold transition-all duration-300"
          >
            Galería
          </Link>
          <Link
            href="/reservas"
            className="text-black hover:text-gray-800 hover:font-bold transition-all duration-300"
          >
            Reservas
          </Link>
          <Link
            href="/ubicacion"
            className="text-black hover:text-gray-800 hover:font-bold transition-all duration-300"
          >
            Ubicación
          </Link>
          {isLoggedIn && (
            <li>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                Cerrar sesión
              </button>
            </li>
          )}
        </div>

        {/* Botón Menú Mobile */}
        <div className="md:hidden flex items-center">
          <button
            className="bg-transparent p-2 rounded-md"
            onClick={handleToggleMenu}
          >
            {showMenu ? <X size={24} color="#000" /> : <Menu size={24} color="#000" />}
          </button>
        </div>
      </div>

      {/* Menú Mobile con transparencia */}
      {showMenu && (
        <div className="absolute top-14 right-0 w-48 bg-white/10 backdrop-blur-md py-4 px-6 rounded-lg shadow-lg z-50">
          <ul className="space-y-4 text-black">
            <li>
              <button
                className="hover:text-gray-800 hover:font-bold transition-all duration-300"
                onClick={() => handleCloseMenu("/galeria")}
              >
                Galería
              </button>
            </li>
            <li>
              <button
                className="hover:text-gray-800 hover:font-bold transition-all duration-300"
                onClick={() => handleCloseMenu("/reservas")}
              >
                Reservas
              </button>
            </li>
            <li>
              <button
                className="hover:text-gray-800 hover:font-bold transition-all duration-300"
                onClick={() => handleCloseMenu("/ubicacion")}
              >
                Ubicación
              </button>
            </li>
          </ul>
          {isLoggedIn && (
            <li>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                Cerrar sesión
              </button>
            </li>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
