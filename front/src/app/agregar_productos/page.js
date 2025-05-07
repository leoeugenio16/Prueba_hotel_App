"use client";
import axios from 'axios';
import './agregarProducto.css';
import { useState, useEffect } from 'react';

const AgregarProducto = () => {
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState(0);
  const [search, setSearch] = useState('');
  const [productosEncontrados, setProductosEncontrados] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [modo, setModo] = useState('agregar');
  const [cargando, setCargando] = useState(false);

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

  const handleAgregar = async (e) => {
    e.preventDefault();
    if (!nombre || cantidad <= 0) {
      alert("Por favor, complete todos los campos con valores válidos");
      return;
    }
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/productos?filters[nombre][$eq]=${nombre}`
      );
      if (res.data.data.length > 0) {
        alert("Ya existe un producto con ese nombre");
        return;
      }
      const resAgregar = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/productos`,
        {
          data: {
            nombre,
            cantidad,
          },
        }
      );
      console.log(resAgregar.data);
      alert("Producto agregado correctamente");
      setNombre('');
      setCantidad(0);
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  };

  const handleEditar = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/productos/${productoSeleccionado.documentId}`,
        {
          data: {
            nombre,
            cantidad,
          },
        }
      );
      console.log(res.data);
      alert("Producto actualizado correctamente");
      setProductoSeleccionado(null);
      setNombre('');
      setCantidad(0);
    } catch (error) {
      console.error("Error al actualizar producto:", error);
    }
  };

  const handleEliminar = async () => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/productos/${productoSeleccionado.documentId}`
      );
      console.log(res.data);
      alert("Producto eliminado correctamente");
      setProductoSeleccionado(null);
      setNombre('');
      setCantidad(0);
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  const seleccionarProducto = (producto) => {
    setProductoSeleccionado(producto);
    setNombre(producto.nombre);
    setCantidad(producto.cantidad);
    setSearch('');
    setProductosEncontrados([]);
  };

  return (
    <div className="contenedor-base">
      <h1 className="titulo">Gestión de Productos</h1>
      <button onClick={() => setModo('agregar')} className="boton-enviar">Agregar Producto</button>
      {modo === 'agregar' && (
        <form onSubmit={handleAgregar} className="formulario">
          <label className="etiqueta">Nombre:</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="input-texto" />
          <label className="etiqueta">Cantidad:</label>
          <input type="number" value={cantidad} onChange={(e) => setCantidad(e.target.valueAsNumber)} className="input-numero" />
          <button type="submit" className="boton-para-agregar">Agregar</button>
        </form>
      )}

      <button onClick={() => setModo('editar')} className="boton-enviar">Editar Producto</button>
      {modo === 'editar' && (
        <div className="formulario">
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar producto" className="input-texto" />
          {cargando ? (
            <p>Cargando...</p>
          ) : (
            search && productosEncontrados.length > 0 && (
              <ul className="lista-productos">
                {productosEncontrados.map((producto) => (
                  <li key={producto.id} onClick={() => seleccionarProducto(producto)}>
                    {producto.nombre}
                  </li>
                ))}
              </ul>
            )
          )}
          {productoSeleccionado && (
            <form onSubmit={handleEditar} className="formulario">
              <label className="etiqueta">Nombre:</label>
              <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="input-texto" />
              <label className="etiqueta">Cantidad:</label>
              <input type="number" value={cantidad} onChange={(e) => setCantidad(e.target.valueAsNumber)} className="input-numero" />
              <button type="submit" className="boton-enviar">Guardar Cambios</button>
            </form>
          )}
        </div>
      )}

      <button onClick={() => setModo('eliminar')} className="boton-enviar">Eliminar Producto</button>
      {modo === 'eliminar' && (
        <div className="formulario">
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar producto" className="input-texto" />
          {cargando ? (
            <p>Cargando...</p>
          ) : (
            <ul className="lista-productos">
              {productosEncontrados.map((producto) => (
                <li key={producto.id} onClick={() => seleccionarProducto(producto)}>
                  {producto.nombre}
                </li>
              ))}
            </ul>
          )}
          {productoSeleccionado && (
            <div>
              <p>¿Estás seguro de que deseas eliminar el producto {productoSeleccionado.nombre}?</p>
              <button onClick={handleEliminar} className="boton-eliminar">Eliminar</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AgregarProducto;