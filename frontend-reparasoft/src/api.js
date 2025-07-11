// Usa la variable de entorno, o localhost como fallback
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

// --- ÓRDENES ---

export async function obtenerOrdenes() {
  const respuesta = await fetch(`${BASE_URL}/ordenes`);
  return await respuesta.json();
}

export async function crearOrden(nuevaOrden) {
  const respuesta = await fetch(`${BASE_URL}/ordenes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nuevaOrden)
  });

  if (!respuesta.ok) {
    throw new Error("Error al crear orden");
  }

  return await respuesta.json();
}

export async function eliminarOrden(id) {
  const respuesta = await fetch(`${BASE_URL}/ordenes/${id}`, {
    method: "DELETE"
  });
  return await respuesta.json();
}

export async function actualizarOrden(id, datosActualizados) {
  const respuesta = await fetch(`${BASE_URL}/ordenes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datosActualizados)
  });
  return await respuesta.json();
}

// --- CLIENTES ---

export async function buscarClientes(termino = "") {
  const respuesta = await fetch(`${BASE_URL}/clientes?q=${encodeURIComponent(termino)}`);
  if (!respuesta.ok) {
    throw new Error("Error al buscar clientes");
  }
  return await respuesta.json();
}
