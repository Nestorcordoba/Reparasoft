import { useState, useEffect } from "react";
import { crearOrden } from "../api";

export default function Orders() {
  const [cliente, setCliente] = useState({ nombre: '', dni: '', telefono: '', email: '' });
  const [clientesCoincidentes, setClientesCoincidentes] = useState([]);
  const [reparacion, setReparacion] = useState({
    marca: '', modelo: '', patente: '', kilometraje: '',
    numeroSerie: '', accesorios: '', problema: ''
  });

  const [item, setItem] = useState({
    descripcion: '', precio: '', cantidad: '', descuento: '', iva: ''
  });

  const [items, setItems] = useState([]);
  const [guardando, setGuardando] = useState(false);

  const buscarCliente = async () => {
  if (!cliente.nombre.trim()) {
    alert("Ingresá el nombre o DNI del cliente a buscar en el campo Nombre y Apellido.");
    return;
  }

    try {
      const res = await fetch("http://localhost:4000/api/clientes");
      const todos = await res.json();
      const coincidencias = todos.filter(c =>
        c.nombre.toLowerCase().includes(cliente.nombre.toLowerCase()) ||
        c.dni.includes(cliente.nombre)
      );
      setClientesCoincidentes(coincidencias);
    } catch (err) {
      console.error("Error al buscar cliente:", err);
    }
  };

  const seleccionarCliente = (c) => {
    setCliente(c);
    setClientesCoincidentes([]);
  };

  const agregarItem = () => {
    const precio = parseFloat(item.precio) || 0;
    const cantidad = parseInt(item.cantidad) || 0;
    const descuento = parseFloat(item.descuento) || 0;
    const iva = parseFloat(item.iva) || 0;

    const subtotal = precio * cantidad;
    const desc = subtotal * (descuento / 100);
    const conIVA = (subtotal - desc) * (iva / 100);
    const total = subtotal - desc + conIVA;

    const nuevoItem = {
      ...item,
      precioFinal: (subtotal - desc).toFixed(2),
      total: total.toFixed(2)
    };

    setItems([...items, nuevoItem]);
    setItem({ descripcion: '', precio: '', cantidad: '', descuento: '', iva: '' });
  };

  const guardarOrden = async () => {
    if (!cliente.nombre || !cliente.dni) {
      alert("Por favor, completá el nombre y el DNI del cliente.");
      return;
    }

    setGuardando(true);

    const ordenCompleta = {
      fecha: new Date().toLocaleString(),
      cliente,
      reparacion,
      items
    };

    try {
      await crearOrden(ordenCompleta);
      alert("Orden creada correctamente");
      setCliente({ nombre: '', dni: '', telefono: '', email: '' });
      setReparacion({ marca: '', modelo: '', patente: '', kilometraje: '', numeroSerie: '', accesorios: '', problema: '' });
      setItems([]);
      setItem({ descripcion: '', precio: '', cantidad: '', descuento: '', iva: '' });
    } catch (error) {
      console.error("Error al crear la orden:", error);
      alert("Ocurrió un error al guardar la orden.");
    } finally {
      setGuardando(false);
    }
  };
    
  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4 text-cyan-400">Nueva Orden de Reparación</h1>

      <section>
        <h2 className="text-cyan-400 font-semibold mb-2">Datos del Cliente</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Nombre y Apellido"
            className="input flex-1"
            value={cliente.nombre}
            onChange={(e) => setCliente({ ...cliente, nombre: e.target.value })}
          />
          <button onClick={buscarCliente} className="bg-cyan-700 px-4 py-2 text-white rounded hover:bg-cyan-800">
            Buscar Cliente Existente
          </button>

        </div>

        {clientesCoincidentes.length > 0 && (
          <div className="bg-slate-800 mt-2 p-2 rounded">
            {clientesCoincidentes.map((c, i) => (
              <div
                key={i}
                className="cursor-pointer hover:bg-cyan-600 p-1 rounded"
                onClick={() => seleccionarCliente(c)}
              >
                <strong>{c.nombre}</strong> - DNI: {c.dni} - Tel: {c.telefono} - Email: {c.email}
              </div>
            ))}
          </div>
        )}

        <input type="text" placeholder="DNI" className="input" value={cliente.dni} onChange={(e) => setCliente({ ...cliente, dni: e.target.value })} />
        <input type="text" placeholder="Teléfono" className="input" value={cliente.telefono} onChange={(e) => setCliente({ ...cliente, telefono: e.target.value })} />
        <input type="email" placeholder="Correo Electrónico" className="input" value={cliente.email} onChange={(e) => setCliente({ ...cliente, email: e.target.value })} />
      </section>

      <section className="mt-6">
        <h2 className="text-cyan-400 font-semibold mb-2">Datos de la Reparación</h2>
        <input type="text" placeholder="Marca" className="input" value={reparacion.marca} onChange={(e) => setReparacion({ ...reparacion, marca: e.target.value })} />
        <input type="text" placeholder="Modelo" className="input" value={reparacion.modelo} onChange={(e) => setReparacion({ ...reparacion, modelo: e.target.value })} />
        <input type="text" placeholder="Patente" className="input" value={reparacion.patente} onChange={(e) => setReparacion({ ...reparacion, patente: e.target.value })} />
        <input type="text" placeholder="Kilometraje" className="input" value={reparacion.kilometraje} onChange={(e) => setReparacion({ ...reparacion, kilometraje: e.target.value })} />
        <input type="text" placeholder="Número de Serie" className="input" value={reparacion.numeroSerie} onChange={(e) => setReparacion({ ...reparacion, numeroSerie: e.target.value })} />
        <input type="text" placeholder="Accesorios Recepcionados" className="input" value={reparacion.accesorios} onChange={(e) => setReparacion({ ...reparacion, accesorios: e.target.value })} />
        <textarea placeholder="Problema indicado por el cliente" className="input" value={reparacion.problema} onChange={(e) => setReparacion({ ...reparacion, problema: e.target.value })} />
      </section>

      <section className="mt-6">
        <h2 className="text-cyan-400 font-semibold mb-2">Productos / Servicios Aplicados</h2>
        <input type="text" placeholder="Descripción" className="input" value={item.descripcion} onChange={(e) => setItem({ ...item, descripcion: e.target.value })} />
        <input type="number" placeholder="P. Unit" className="input" value={item.precio} onChange={(e) => setItem({ ...item, precio: e.target.value })} />
        <input type="number" placeholder="Cant" className="input" value={item.cantidad} onChange={(e) => setItem({ ...item, cantidad: e.target.value })} />
        <input type="number" placeholder="%Desc" className="input" value={item.descuento} onChange={(e) => setItem({ ...item, descuento: e.target.value })} />
        <input type="number" placeholder="IVA %" className="input" value={item.iva} onChange={(e) => setItem({ ...item, iva: e.target.value })} />
        <button onClick={agregarItem} className="mt-2 bg-green-600 px-4 py-2 rounded text-white hover:bg-green-700">Agregar Ítem</button>
      </section>

      {items.length > 0 && (
        <section className="mt-4">
          <h3 className="text-cyan-300 font-bold mb-2">Ítems Agregados</h3>
          <ul className="bg-slate-800 p-2 rounded">
            {items.map((i, idx) => (
              <li key={idx} className="border-b border-slate-600 p-2">
                {i.descripcion} - {i.cantidad} x ${i.precio} = <strong>${i.total}</strong>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="text-right mt-6">
        <button
          onClick={guardarOrden}
          disabled={guardando}
          className={`px-4 py-2 rounded text-white ${guardando ? 'bg-cyan-400 cursor-not-allowed' : 'bg-cyan-600 hover:bg-cyan-700'}`}
        >
          {guardando ? 'Guardando...' : 'Guardar Orden'}
        </button>
      </div>
    </div>
  );
}
