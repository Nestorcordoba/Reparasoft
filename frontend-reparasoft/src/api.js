const API_URL = "http://localhost:4000/api/ordenes";

export async function obtenerOrdenes() {
  const respuesta = await fetch(API_URL);
  return await respuesta.json();
}

export async function crearOrden(nuevaOrden) {
  const respuesta = await fetch("http://localhost:4000/api/ordenes", {
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
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });
  return await respuesta.json();
}

export async function actualizarOrden(id, datosActualizados) {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datosActualizados)
  });
  return await respuesta.json();
}

export async function buscarClientes(termino = "") {
  const respuesta = await fetch(`http://localhost:4000/api/clientes?q=${encodeURIComponent(termino)}`);
  if (!respuesta.ok) {
    throw new Error("Error al buscar clientes");
  }
  return await respuesta.json();
}
