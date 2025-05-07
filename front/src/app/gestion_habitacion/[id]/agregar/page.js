"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import "./agregarProductoHabitacion.css";

const AgregarProductoHabitacion = () => {
const { id } = useParams();
const [search, setSearch] = useState("");
const [productosEncontrados, setProductosEncontrados] = useState([]);
const [productosSeleccionados, setProductosSeleccionados] = useState([]);
const [stockId, setStockId] = useState(null);
const [cargando, setCargando] = useState(false);
const [actualizando, setActualizando] = useState(false);

// Buscar stock por documentId de habitación
useEffect(() => {
  const fetchStockHabitacion = async () => {
    try {
      const habRes = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/habitacions?filters[documentId][$eq]=${id}`
      );
      const habitacion = habRes.data.data[0];
      if (!habitacion) return;

      const stockRes = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/stock-habitacions?filters[habitacion][documentId][$eq]=${id}`
      );
      const stock = stockRes.data.data[0];
      if (!stock) {
        const nuevoStockRes = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/stock-habitacions`, {
          data: {
            habitacion: habitacion.documentId,
          },
        });
        setStockId(nuevoStockRes.data.data.documentId);
      } else {
        setStockId(stock.documentId);
      }

      // Cargar productos del stock
      if (stock || nuevoStockRes) {
        const stockIdActual = stock ? stock.documentId : nuevoStockRes.data.data.documentId;
        const stockHabitacionProductosRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/stock-habitacion-productos?filters[stock_habitacion][documentId][$eq]=${stockIdActual}&populate=producto`);
        const productos = stockHabitacionProductosRes.data.data;

        const formateados = productos.map((p) => ({
          id: p.producto.id,
          documentId: p.producto.documentId,
          nombre: p.producto.nombre,
          cantidad: p.cantidad,
        }));
        setProductosSeleccionados(formateados);
      }
    } catch (error) {
      console.error("Error al cargar el stock:", error);
    }
  };
  fetchStockHabitacion();
}, [id]);

// Buscar productos
useEffect(() => {
const fetchProductos = async () => {
if (search.length < 2) return setProductosEncontrados([]);
setCargando(true);
try {
const res = await axios.get(
`${process.env.NEXT_PUBLIC_API_URL}/api/productos?filters[nombre][$containsi]=${search}`
);
setProductosEncontrados(res.data.data);
} catch (error) {
console.error("Error al buscar productos:", error);
} finally {
setCargando(false);
}
};
fetchProductos();
}, [search]);

const agregarProducto = (producto) => {
const yaExiste = productosSeleccionados.find((p) => p.id === producto.id);
if (!yaExiste) {
setProductosSeleccionados((prev) => [
...prev,
{ id: producto.id, documentId: producto.documentId, nombre: producto.nombre, cantidad: 1 },
]);
}
setSearch("");
setProductosEncontrados([]);
};

const actualizarCantidad = (id, nuevaCantidad) => {
setProductosSeleccionados((prev) =>
prev.map((p) => (p.id === id ? { ...p, cantidad: nuevaCantidad } : p))
);
console.log("Cantidad actualizada:", nuevaCantidad);
};

const eliminarProducto = (id) => {
setProductosSeleccionados((prev) => prev.filter((p) => p.id !== id));
};

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!stockId) {
    try {
      const habRes = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/habitacions?filters[documentId][$eq]=${id}`
      );
      const habitacion = habRes.data.data[0];
      if (!habitacion) return;

      const nuevoStockRes = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/stock-habitacions`, {
        data: {
          habitacion: habitacion.documentId,
        },
      });
      setStockId(nuevoStockRes.data.data.documentId);
    } catch (error) {
      console.error("Error al crear el stock:", error);
      return;
    }
  }

  setActualizando(true); // Agregar esto para indicar que se está actualizando

  try {
    for (const producto of productosSeleccionados) {
      const stockHabitacionProducto = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/stock-habitacion-productos?filters[stock_habitacion][documentId][$eq]=${stockId}&filters[producto][documentId][$eq]=${producto.documentId}`);
      if (stockHabitacionProducto.data.data.length > 0) {
        const idStockHabitacionProducto = stockHabitacionProducto.data.data[0].documentId;
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/stock-habitacion-productos/${idStockHabitacionProducto}`, {
          data: {
            cantidad: producto.cantidad,
          },
        });
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/stock-habitacion-productos`, {
          data: {
            stock_habitacion: stockId,
            producto: producto.documentId,
            cantidad: producto.cantidad,
          },
        });
      }
    }

    alert("Stock actualizado correctamente.");
  } catch (error) {
    console.error("Error al actualizar el stock:", error);
  } finally {
    setActualizando(false); // Agregar esto para indicar que se terminó de actualizar
  }
};

return (
<div className="contenedor-base">
<h1 className="reservas-title">Actualizar productos de heladera</h1>
<form onSubmit={handleSubmit} className="form-agregar-producto">
<input
className="input-buscador"
type="text"
placeholder="Buscar producto..."
value={search}
onChange={(e) => setSearch(e.target.value)}
/>
{cargando && <p>Cargando...</p>}
{productosEncontrados.length > 0 && (
<ul className="lista-resultados">
{productosEncontrados.map((prod) => (
<li key={prod.id} onClick={() => agregarProducto(prod)} className="item-resultado">
{prod.nombre}
</li>
))}
</ul>
)}
{productosSeleccionados.length > 0 && (
<div className="lista-seleccionados">
<h2>Productos actuales:</h2>
<ul>
{productosSeleccionados.map((prod) => (
<li key={prod.id} className="item-seleccionado">
{prod.nombre}
<input
className="input-cantidad"
type="number"
min={1}
value={prod.cantidad}
onChange={(e) => {
const val = parseInt(e.target.value);
if (!isNaN(val)) actualizarCantidad(prod.id, val);
}}
onWheel={(e) => e.currentTarget.blur()}
/>
<button type="button" onClick={() => eliminarProducto(prod.id)}>X</button>
</li>
))}
</ul>
</div>
)}
<button className="boton-submit" type="submit" disabled={actualizando}>
{actualizando ? "Cargando..." : "Actualizar stock"}
</button>
</form>
</div>
);
};

export default AgregarProductoHabitacion;