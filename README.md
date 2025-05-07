🏨 Prueba_hotel_App
Aplicación web para la gestión de reservas hoteleras, desarrollada con tecnologías modernas como JavaScript, PostgreSQL y Strapi. Este proyecto permite a los usuarios realizar reservas de habitaciones de manera eficiente y a los administradores gestionar la disponibilidad y detalles de las mismas.

🚀 Características
Gestión de reservas: Creación, edición y cancelación de reservas.

Administración de habitaciones: Alta, baja y modificación de habitaciones disponibles.

Panel de administración: Interfaz intuitiva para la gestión de datos.

Integración con base de datos: Uso de PostgreSQL para almacenamiento robusto.

Backend con Strapi: API RESTful para manejo de contenido y autenticación.

🛠️ Tecnologías utilizadas
Frontend: JavaScript, HTML5, CSS3

Backend: Strapi (Node.js)

Base de datos: PostgreSQL

Hosting: Render
📦 Instalación
1. Clonar el repositorio
bash
Copiar
Editar
git clone https://github.com/leoeugenio16/Prueba_hotel_App.git
cd Prueba_hotel_App
2. Instalar dependencias

🔹 Backend (Strapi)

bash
Copiar
Editar
cd backend
npm install

🔹 Frontend

bash
Copiar
Editar
cd ../frontend
npm install
Asegurate de tener ambas carpetas (frontend y backend) correctamente estructuradas.

▶️ Ejecución del proyecto

🔹 Iniciar el backend

bash
Copiar
Editar
cd backend
npm run develop

🔹 Iniciar el frontend

bash
Copiar
Editar
cd ../frontend
npm run dev

🔐 Configuración de entorno

Crear un archivo .env en la carpeta backend con las siguientes variables:

env
Copiar
Editar
DATABASE_URL=postgres://usuario:contraseña@localhost:5432/nombre_basedatos
STRAPI_ADMIN_JWT_SECRET=tu_secreto
