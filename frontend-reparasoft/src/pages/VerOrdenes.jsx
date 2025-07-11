import React, { useEffect, useState } from 'react';
import { obtenerOrdenes, eliminarOrden as eliminarOrdenAPI, actualizarOrden as actualizarOrdenAPI } from '../api';

export default function VerOrdenes() {
  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {
    async function cargarDatos() {
      try {
        const datos = await obtenerOrdenes();
        setOrdenes(datos);
      } catch (error) {
        console.error("Error al obtener órdenes:", error);
      }
    }
    cargarDatos();
  }, []);

  const ordenesOrdenadas = [...ordenes].sort((a, b) => {
    const fechaA = new Date(a.fecha);
    const fechaB = new Date(b.fecha);
    return fechaB - fechaA; // Descendente: más reciente primero
  });

    const actualizarComentario = async (id, nuevoComentario) => {
    await actualizarOrdenAPI(id, { comentario: nuevoComentario });
    const actualizadas = ordenes.map(orden =>
      orden._id === id ? { ...orden, comentario: nuevoComentario } : orden
    );
    setOrdenes(actualizadas);
   };


    const eliminarOrden = async (id) => {
      await eliminarOrdenAPI(id);
      const actualizadas = ordenes.filter(o => o._id !== id);
      setOrdenes(actualizadas);
    };

  const editarOrden = (orden) => {
    localStorage.setItem("orden-edicion", JSON.stringify(orden));
    alert("Funcionalidad de edición en desarrollo.");
  };

    const actualizarEstado = async (id, nuevoEstado) => {
      await actualizarOrdenAPI(id, { estado: nuevoEstado });
      const actualizadas = ordenes.map(o =>
        o._id === id ? { ...o, estado: nuevoEstado } : o
      );
      setOrdenes(actualizadas);
    };

  const estados = [
    "Recibido",
    "En Diagnóstico",
    "Presupuesto Enviado",
    "Aprobado / En Reparación",
    "Reparado / Finalizado",
    "Listo para Retiro / Entrega",
    "Entregado / Cerrado",
    "No Reparado / Rechazado",
    "Esperando repuestos",
    "En espera de cliente",
    "Reparación parcial",
    "Garantía",
    "Reparado – En prueba",
    "Reparación cancelada"
  ];

  useEffect(() => {
    const img = new Image();
    img.src = "/logo-setip.png";
  }, []);

  const Row = ({ label, value }) => (
    <div className="flex gap-2 text-sm">
      <span className="campo-label">{label}:</span>
      <span className="text-gray-800">{value}</span>
    </div>
  );

  return (
    <div className="p-4 bg-white text-black min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-blue-800">Listado de Órdenes</h1>

      {ordenes.length === 0 ? (
        <p className="text-gray-600">No hay órdenes registradas.</p>
      ) : (
        <div className="space-y-4">
          {ordenesOrdenadas.map((orden, idx) => (
            <div key={orden._id} className={`${idx % 2 === 0 ? 'orden-par' : 'orden-impar'}`}>
              <Row label="#" value={orden._id} />
              <Row label="Fecha" value={orden.fecha} />
              <Row label="Cliente" value={orden.cliente.nombre} />
              <Row label="DNI" value={orden.cliente.dni} />
              <Row label="Tel" value={orden.cliente.telefono} />
              <Row label="Email" value={orden.cliente.email} />
              <Row label="Marca" value={orden.reparacion.marca} />
              <Row label="Modelo" value={orden.reparacion.modelo} />
              <Row label="Patente" value={orden.reparacion.patente} />
              <Row label="Kms" value={orden.reparacion.kilometraje} />
              <Row label="Serie" value={orden.reparacion.numeroSerie} />
              <Row label="Accesorios" value={orden.reparacion.accesorios} />
              <Row label="Problema" value={orden.reparacion.problema} />

              <div className="mt-2">
                <label className="campo-label">Estado de Reparación:</label>
                <select
                  value={orden.estado || ""}
                  onChange={(e) => actualizarEstado(orden._id, e.target.value)}
                  className="block mt-1 p-2 border rounded w-full text-sm"
                >
                  <option value="">Seleccionar estado</option>
                  {estados.map((estado, i) => (
                    <option key={i} value={estado}>{estado}</option>
                  ))}
                </select>
              </div>
              <div className="mt-3">
                <label className="campo-label block mb-1">Historial / Comentarios:</label>
                <textarea
                  className="historial-comentarios w-full border border-gray-400 rounded p-2 text-sm bg-white text-black"
                  rows={4}
                  placeholder="Escriba un comentario..."
                  value={orden.comentario || ""}
                  onChange={(e) => actualizarComentario(orden._id, e.target.value)}
                />
              </div>

              <Row label="Ítems" value={orden.items.length} />
              {orden.items.length > 0 && (
                <div className="mt-2 ml-4 border-l-4 border-blue-300 pl-3 space-y-1">
                  <h3 className="text-sm font-semibold text-blue-700">Productos / Servicios:</h3>
                  {orden.items.map((item, i) => (
                    <div key={i} className="text-sm text-gray-700 border-b border-gray-200 py-1">
                      <div><span className="campo-label">Descripción:</span> {item.descripcion}</div>
                      <div><span className="campo-label">P. Unit:</span> ${item.precio}</div>
                      <div><span className="campo-label">Cantidad:</span> {item.cantidad}</div>
                      <div><span className="campo-label">% Desc:</span> {item.descuento}</div>
                      <div><span className="campo-label">IVA %:</span> {item.iva}</div>
                      <div><span className="campo-label">Total:</span> ${item.total}</div>
                    </div>
                    ))}
                </div>
                )}

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => editarOrden(orden)}
                  className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500 text-xs"
                >
                  Editar
                </button>
                <button
                  onClick={() => eliminarOrden(orden._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs"
                >
                  Eliminar
                </button>
                <button
                  onClick={() => imprimirOrden(orden)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs mt-2"
                >
                  Imprimir Orden
                </button>
              </div>
            </div>
          ))}
        </div>
        )}
    </div>
    );
}

const imprimirOrden = (orden) => {
  const logoUrl = "/logo-setip.png";
  const itemsHtml = orden.items?.map(item => `
    <div class="item">
      <div><b>Descripción:</b> ${item.descripcion}</div>
      <div><b>P. Unit:</b> $${item.precio}</div>
      <div><b>Cantidad:</b> ${item.cantidad}</div>
      <div><b>% Desc:</b> ${item.descuento}</div>
      <div><b>IVA %:</b> ${item.iva}</div>
      <div><b>Total:</b> $${item.total}</div>
    </div>
  `).join("");

  const html = `
    ${document.getElementById("print-template").innerHTML}
  `.replace("{numero}", orden._id)
   .replace("{fecha}", orden.fecha)
   .replace("{cliente}", orden.cliente.nombre || "")
   .replace("{dni}", orden.cliente.dni || "")
   .replace("{telefono}", orden.cliente.telefono || "")
   .replace("{email}", orden.cliente.email || "")
   .replace("{marca}", orden.reparacion.marca || "")
   .replace("{modelo}", orden.reparacion.modelo || "")
   .replace("{patente}", orden.reparacion.patente || "")
   .replace("{kms}", orden.reparacion.kilometraje || "")
   .replace("{serie}", orden.reparacion.numeroSerie || "")
   .replace("{accesorios}", orden.reparacion.accesorios || "")
   .replace("{problema}", orden.reparacion.problema || "")
   .replace("{estado}", orden.estado || "")
   .replace("{comentarios}", orden.comentario || "Sin comentarios")
   .replace("{items_html}", itemsHtml)
   .replace("{logo_url}", logoUrl);

  const ventana = window.open('', '_blank');
  ventana.document.write(html);
  ventana.document.close();
  ventana.focus();
  ventana.print();
 };






