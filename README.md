# 🏨 Prueba_hotel_App

**Prueba_hotel_App** es una aplicación web para la gestión de reservas hoteleras. Desarrollada con tecnologías modernas como JavaScript, PostgreSQL y Strapi, esta herramienta permite a los usuarios realizar reservas de habitaciones de manera eficiente y a los administradores gestionar la disponibilidad, stock y detalles asociados de cada habitación.

---

## 🚀 Características

- ✅ **Gestión de reservas**: Creación, edición y cancelación de reservas con múltiples personas asociadas.
- 🛏️ **Administración de habitaciones**: Alta, baja y modificación de habitaciones disponibles.
- 📋 **Panel de administración**: Interfaz intuitiva con autenticación básica basada en roles.
- 💾 **Integración con base de datos**: PostgreSQL como motor de almacenamiento.
- 🧠 **Backend con Strapi**: API RESTful robusta para el manejo de contenido y autenticación.
- 📦 **Gestión de stock**: Control y asignación de productos (bebidas, snacks, etc.) por habitación.

---

## 🛠️ Tecnologías utilizadas

| Tecnología | Descripción |
|-----------|-------------|
| **Frontend** | JavaScript, HTML5, CSS3 |
| **Backend** | [Strapi](https://strapi.io/) (Node.js) |
| **Base de Datos** | PostgreSQL |
| **Hosting** | [Render](https://render.com/) |

---

## 📦 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/leoeugenio16/Prueba_hotel_App.git
cd Prueba_hotel_App
```

### 2. Instalar dependencias

#### 🔹 Backend (Strapi)

```bash
cd backend
npm install
```

#### 🔹 Frontend

```bash
cd ../frontend
npm install
```

> Asegúrate de tener ambas carpetas (`frontend` y `backend`) correctamente estructuradas antes de continuar.

---

## ▶️ Ejecución del proyecto

### 🔹 Iniciar el Backend

```bash
cd backend
npm run develop
```

### 🔹 Iniciar el Frontend

```bash
cd ../frontend
npm run dev
```

---

## 🔐 Configuración de entorno

### Backend (`/backend/.env`)

Crea un archivo `.env` en la carpeta `backend` con el siguiente contenido:

```env
DATABASE_URL=postgres://usuario:contraseña@localhost:5432/nombre_basedatos
STRAPI_ADMIN_JWT_SECRET=tu_secreto
```

### Frontend (`/frontend/.env.local`)

Crea un archivo `.env.local` en la carpeta `frontend` con la siguiente variable:

```env
NEXT_PUBLIC_API_URL=http://localhost:1337
```

> Cambia la URL según dónde se aloje tu backend (por ejemplo, en Render).

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Puedes hacer lo que quieras con él, siempre y cuando menciones al autor original. ❤️

---

## 🤝 Autor

- Leo Eugenio – [GitHub](https://github.com/leoeugenio16)

---

¡Listo para poner en marcha tu gestión hotelera con **Prueba_hotel_App**!

