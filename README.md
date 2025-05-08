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

![image](https://github.com/user-attachments/assets/0e8a680e-2d49-4d98-93b3-0a9bee521a9e)

- ** colocamos alerts para evitar que se ingrese una fecha de entrada mas vieja que la fecha de salida **

![image](https://github.com/user-attachments/assets/ad25b128-5581-47fe-8694-0eda8a8dd3fe)

- ** Al seleccionar una de las habitaciones ocupadas nos va a llevar a los datos de esa reserva **

![image](https://github.com/user-attachments/assets/4738862d-1e0c-4bd1-b543-191124536783)

- ** tambien se selecciona el id de esa cama y se envia mediante la url , tambien nos da la opcion de volver a la pagina anterior y de editar la reserva  **
![image](https://github.com/user-attachments/assets/2e007deb-6222-4a93-bdfe-1a44dabfaca4)

- ** Al entrar en editar la reserva , nos genera input editables con los datos que ya teniamos para poder modificarlos **
![image](https://github.com/user-attachments/assets/bb841304-e179-482b-9516-0c88765f762b)

- ** y debajo la opcion de agregar persona, confirmar los cambios y borrar la reserva ** 

![image](https://github.com/user-attachments/assets/952736d6-c712-410d-ade4-2dcb7919d17b)

- ** ahora en gestion de habitacion, este apartado se creo por que el cliente indica que queire llevar un conrtrol de el stock que hay en cada frigobar que contiene las habitaciones ** 

![image](https://github.com/user-attachments/assets/81e44b60-9dfd-42b3-be90-fcf5d5389772)

- ** en este apartado se muestran todas las habitaciones existente donde cada una cuenta con la opcion de ver el stock o modificarlo ** 

![image](https://github.com/user-attachments/assets/2782f144-f4e0-46a7-a065-27ad2223de84)

- ** el stock se muestra asi **

![image](https://github.com/user-attachments/assets/7c0664d5-94a6-460b-bd11-b46abaa8c679)

- ** y la opcion de editar el stock se ve asi , donde muestra los prodcutos que ya estan asignados ** 

![image](https://github.com/user-attachments/assets/94ebff4f-e96d-42b7-a51d-aa9a78dd0695)


- ** en el input de busqueda de prodcutos al ir escribiendo nos va msotrando coincidencias de los prodcutos que podemos agregar, como asi tambien los prodcutos agregados nos da l opcion de agregar o modificar las cantidades **

![image](https://github.com/user-attachments/assets/6f4a7e78-fe9e-4594-8a43-2525e00c6a95)

- ** en la opcion de agregar productos nos va a dar la posibilidad de crear modificar y borrar los productos que puede llegar a tener la heladera de la habitacion ** 

![image](https://github.com/user-attachments/assets/e41ceed0-5ecd-4c3e-8c95-0b9e27c290b5)

- ** la opcion agregar prodcuto nos pide nombre y cantidad en el stock general del hotel **

![image](https://github.com/user-attachments/assets/f4b614d4-16b6-4278-b5b9-011d23674e4c)

- ** la opcion editar prodcuto nos sale el input en el cual vamos a ir buscnado el producto ent iempo real mientras vamos escribiendo y al seleccionarlo nos da la opcion de editar **

![image](https://github.com/user-attachments/assets/2c704f6a-30c1-4402-8082-e617e7847f74)

![image](https://github.com/user-attachments/assets/409b096a-5020-418e-a795-46bcb4dd94e0)

- ** esta pagina web esta protegida por contraseña ya que es la misma que usa el usuario para poder gestionar su reserva ** 

![image](https://github.com/user-attachments/assets/6e8299f3-29a0-4869-ab2d-0b11897182bc)

- ** la pagina principal que se usa para la gestion de reserva tiene la primera pagina donde muestra un video corto sobre el hotel ** 

![image](https://github.com/user-attachments/assets/6fe37efe-f263-43e6-a69d-3a2f6b563db0)

- ** si scrolleamos para abajo podrmeos ver la opcion de consultar por la reserva ** 

![image](https://github.com/user-attachments/assets/1d4f66ce-8503-4a5b-9fec-a3dadabdf4e4)


- ** donde al completarlo nos genera un mensaje que sera enviado al whatsaap oficial del hotel para que pueda darnos mas detalels con respecto a esa fecha "


![image](https://github.com/user-attachments/assets/f50b3e59-2952-4abf-897e-f0674d66fbb2)


- ** si seguimos scrolleando encontraremos la galeria con las imagenes del hotel **

![image](https://github.com/user-attachments/assets/2ce87c6d-5491-42d2-9de7-fefb2a14aabc)

- ** a continaucion dejo fotos de la misma web en version movil ya que es responsive ** 

![image](https://github.com/user-attachments/assets/337384f7-7cc5-489a-972e-afac4dc73791)
![image](https://github.com/user-attachments/assets/b94c76b7-048e-4c82-b501-66029c8d7704)
![image](https://github.com/user-attachments/assets/25d3b280-c747-4415-9b85-87add4cdc768)
![image](https://github.com/user-attachments/assets/7a6851a2-c27a-4b9f-a416-c7df3ff4afb8)
![image](https://github.com/user-attachments/assets/3664cb63-6e08-436e-8824-7f0c7564a82b)
![image](https://github.com/user-attachments/assets/4b4133b4-4145-41dd-a032-0db56e95770d)
![image](https://github.com/user-attachments/assets/27bbe4c0-dafa-4228-9d29-3124bfb3e259)
![image](https://github.com/user-attachments/assets/2a00821e-7856-4b04-af89-0fde6780daef)
![image](https://github.com/user-attachments/assets/1e4b3e35-889e-4dbd-932b-126544c71f30)






























