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

## ✅ Gestión de reservas

![Gestión de reservas](https://github.com/user-attachments/assets/7845f708-c240-4f50-882a-fabd7b700753)

### Selección de fechas y disponibilidad

Seleccionamos la fecha para ver qué habitaciones hay disponibles y cuáles están ocupadas entre esas dos fechas.

![Selección de fechas](https://github.com/user-attachments/assets/6acf17be-b715-4c51-8d6e-9be3185f3268)

### Crear nueva reserva

Si seleccionamos una habitación, al hacer clic enviamos por URL el ID de la habitación más la fecha seleccionada, para proceder a llenar los datos de la habitación y las personas que se van a hospedar.

![Crear reserva](https://github.com/user-attachments/assets/557fbb8d-3591-46d7-8936-8a2911d3f3b1)

Con el botón **"Agregar persona"**, se abre otro formulario igual. Como las habitaciones son para 4 personas, el límite de formularios es 4.

![Agregar persona](https://github.com/user-attachments/assets/0e8a680e-2d49-4d98-93b3-0a9bee521a9e)

También se colocaron alertas para evitar que se ingrese una fecha de entrada más antigua que la de salida.

![Validación de fechas](https://github.com/user-attachments/assets/ad25b128-5581-47fe-8694-0eda8a8dd3fe)

### Consultar reserva existente

Al seleccionar una habitación ocupada, accedemos a los datos de esa reserva.

![Ver reserva](https://github.com/user-attachments/assets/4738862d-1e0c-4bd1-b543-191124536783)

También se selecciona el ID de esa cama y se envía mediante la URL. Además, nos da la opción de volver a la página anterior y editar la reserva.

![Opciones en reserva](https://github.com/user-attachments/assets/2e007deb-6222-4a93-bdfe-1a44dabfaca4)

### Editar reserva

Al entrar a editar una reserva, se generan inputs editables con los datos que ya teníamos para poder modificarlos.

![Editar reserva](https://github.com/user-attachments/assets/bb841304-e179-482b-9516-0c88765f762b)

Debajo aparecen las opciones para agregar persona, confirmar los cambios y borrar la reserva.

![Acciones en edición](https://github.com/user-attachments/assets/952736d6-c712-410d-ade4-2dcb7919d17b)

---

## 🛏️ Gestión de habitaciones y stock de frigobar

Este apartado se creó porque el cliente quería llevar un control del stock del frigobar de cada habitación.

![Gestión de stock](https://github.com/user-attachments/assets/81e44b60-9dfd-42b3-be90-fcf5d5389772)

En este apartado se muestran todas las habitaciones existentes, donde cada una tiene la opción de ver o modificar su stock.

![Habitaciones y opciones](https://github.com/user-attachments/assets/2782f144-f4e0-46a7-a065-27ad2223de84)

El stock se visualiza así:

![Vista de stock](https://github.com/user-attachments/assets/7c0664d5-94a6-460b-bd11-b46abaa8c679)

La opción de editar el stock muestra los productos ya asignados.

![Editar stock](https://github.com/user-attachments/assets/94ebff4f-e96d-42b7-a51d-aa9a78dd0695)

En el input de búsqueda, al ir escribiendo se muestran coincidencias con los productos que podemos agregar. Los productos ya agregados permiten modificar sus cantidades.

![Buscar y agregar productos](https://github.com/user-attachments/assets/6f4a7e78-fe9e-4594-8a43-2525e00c6a95)

---

## ➕ Gestión general de productos

La opción de **Agregar productos** nos permite crear, modificar y borrar productos que puede tener la heladera de la habitación.

![Gestión de productos](https://github.com/user-attachments/assets/e41ceed0-5ecd-4c3e-8c95-0b9e27c290b5)

La opción **Agregar producto** solicita nombre y cantidad en el stock general del hotel.

![Agregar producto](https://github.com/user-attachments/assets/f4b614d4-16b6-4278-b5b9-011d23674e4c)

En la opción **Editar producto**, aparece un input que permite buscar el producto en tiempo real mientras se escribe. Al seleccionarlo, se puede editar.

![Buscar producto para editar](https://github.com/user-attachments/assets/2c704f6a-30c1-4402-8082-e617e7847f74)
![Editar producto](https://github.com/user-attachments/assets/409b096a-5020-418e-a795-46bcb4dd94e0)

---

## 🔐 Acceso protegido

Esta página web está protegida por contraseña, la misma que utiliza el usuario para gestionar su reserva.

![Protección por contraseña](https://github.com/user-attachments/assets/6e8299f3-29a0-4869-ab2d-0b11897182bc)

---

## 🏨 Página principal del sitio web

La página principal incluye un video corto sobre el hotel:

![Video introductorio](https://github.com/user-attachments/assets/6fe37efe-f263-43e6-a69d-3a2f6b563db0)

Al hacer scroll hacia abajo, encontramos la opción para consultar una reserva:

![Formulario de reserva](https://github.com/user-attachments/assets/1d4f66ce-8503-4a5b-9fec-a3dadabdf4e4)

Al completarlo, se genera un mensaje que será enviado al WhatsApp oficial del hotel para recibir más detalles sobre esa fecha.

![Envío por WhatsApp](https://github.com/user-attachments/assets/f50b3e59-2952-4abf-897e-f0674d66fbb2)

---

## 🖼️ Galería del hotel

Al seguir scrolleando, encontraremos la galería con imágenes del hotel.

![Galería](https://github.com/user-attachments/assets/2ce87c6d-5491-42d2-9de7-fefb2a14aabc)

---

## 📱 Versión móvil (Responsive)

A continuación se muestran capturas de pantalla en versión móvil:

![Mobile 1](https://github.com/user-attachments/assets/337384f7-7cc5-489a-972e-afac4dc73791)  
![Mobile 2](https://github.com/user-attachments/assets/b94c76b7-048e-4c82-b501-66029c8d7704)  
![Mobile 3](https://github.com/user-attachments/assets/25d3b280-c747-4415-9b85-87add4cdc768)  
![Mobile 4](https://github.com/user-attachments/assets/7a6851a2-c27a-4b9f-a416-c7df3ff4afb8)  
![Mobile 5](https://github.com/user-attachments/assets/3664cb63-6e08-436e-8824-7f0c7564a82b)  
![Mobile 6](https://github.com/user-attachments/assets/4b4133b4-4145-41dd-a032-0db56e95770d)  
![Mobile 7](https://github.com/user-attachments/assets/27bbe4c0-dafa-4228-9d29-3124bfb3e259)  
![Mobile 8](https://github.com/user-attachments/assets/2a00821e-7856-4b04-af89-0fde6780daef)  
![Mobile 9](https://github.com/user-attachments/assets/1e4b3e35-889e-4dbd-932b-126544c71f30)

























