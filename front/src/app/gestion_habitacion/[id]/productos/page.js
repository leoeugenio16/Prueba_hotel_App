"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import './producto.css'

const ProductosHabitacion = () => {
  const [productos, setProductos] = useState([]);
  const [habitacion, setHabitacion] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const resStock = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/stock-habitacions?filters[habitacion][documentId][$eq]=${id}&populate[stock_habitacion_productos][populate][0]=producto`
        );
        const data = await resStock.json();
  
        if (data.data.length > 0) {
          const stockData = data.data[0];
          setProductos(stockData.stock_habitacion_productos || []);
          setHabitacion(stockData.habitacion);
        } else {
          setProductos([]);
          setHabitacion(null);
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };
  
    fetchDatos();
  }, [id]);

  return (
    <div className="productos-container">
      <h1 className="productos-title">
        Productos asignados a habitación {habitacion?.numero ?? ""}
      </h1>
      {productos.length > 0 ? (
        <ul className="productos-list">
        {productos.map((prod) => (
          <li key={prod.documentId} className="producto-item">
            <h2 className="producto-nombre">{prod.producto.nombre}</h2>
            <p className="producto-cantidad">Cantidad: {prod.cantidad}</p>
          </li>
        ))}
      </ul>
      ) : (
        <p className="no-productos">No hay productos asignados.</p>
      )}
    </div>
  );
};

export default ProductosHabitacion;