import { useState } from "react";
import { buscarClientes } from "../api";

export default function Clientes() {
  const [busqueda, setBusqueda] = useState("");
  const [clientes, setClientes] = useState([]);
  const [resultado, setResultado] = useState(null);

  const manejarBusqueda = async () => {
    try {
      const res = await buscarClientes(busqueda);
      setClientes(res);
      setResultado(res.length > 0);
    } catch (err) {
      console.error("Error al buscar clientes", err);
      setResultado(false);
    }
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4 text-cyan-400">Buscar Cliente</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Ingresar nombre o DNI"
          className="input flex-1"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <button
          onClick={manejarBusqueda}
          className="bg-cyan-700 hover:bg-cyan-800 text-white px-4 py-2 rounded"
        >
          Buscar
        </button>
      </div>

      {resultado === false && (
        <p className="text-red-400 font-semibold">No se encontró ningún cliente con ese nombre o DNI.</p>
      )}

      {resultado && (
        <ul className="bg-slate-800 p-4 rounded">
          {clientes.map((cli) => (
            <li key={cli._id} className="border-b border-slate-600 py-2">
              <strong>{cli.nombre}</strong> - DNI: {cli.dni} - Tel: {cli.telefono} - Email: {cli.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
