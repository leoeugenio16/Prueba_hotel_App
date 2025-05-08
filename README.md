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

### Frontend (`/frontend/.env`)

Crea un archivo `.env` en la carpeta `frontend` con la siguiente variable:

```env
NEXT_PUBLIC_API_URL=http://localhost:1337
```

## 🤝 Autor

- Leo Eugenio – [GitHub](https://github.com/leoeugenio16)

---


## 🎞️ imagenes

- ✅ **Gestión de reservas**:
![image](https://github.com/user-attachments/assets/7845f708-c240-4f50-882a-fabd7b700753)

-  **Seleccionamos la fecha para ver que habitaciones hay disponibles y que habitaciones estan ocupadas entre esas dos fechas**:
![image](https://github.com/user-attachments/assets/6acf17be-b715-4c51-8d6e-9be3185f3268)

-  **si seleccionamosla opcion 1 por ejemplo, al hacer clic enviamos por url el id de la habitacion mas la fecha que habiamos seleccionado para proceder a llenar los datos de la habitacion y las personas que se vna a ospedar ahi **:
![image](https://github.com/user-attachments/assets/557fbb8d-3591-46d7-8936-8a2911d3f3b1)

- ** con el boton que dice agregar persona nos abre otro formulario igual para agregar perosna, como la habitaciones son de 4 el limite de formularios es 4 **

![image](https://github.com/user-attachments/assets/a73034ed-e309-48d7-aec6-39a441cb6751)








