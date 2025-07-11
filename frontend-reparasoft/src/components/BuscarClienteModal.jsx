import { useEffect, useState } from "react";
import { buscarClientes } from "../api";

export default function BuscarClienteModal({ onClose, onSelect }) {
  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const buscar = async () => {
    try {
      const res = await buscarClientes(busqueda);
      setClientes(res);
    } catch (err) {
      console.error("Error buscando clientes", err);
    }
  };

  useEffect(() => {
    buscar();
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-3xl rounded shadow-lg p-6 text-black">
        <h2 className="text-xl font-bold mb-4">Clientes</h2>
        <input
          type="text"
          placeholder="Buscar por nombre o DNI..."
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && buscar()}
        />
        <div className="max-h-64 overflow-y-auto">
          <table className="w-full text-left border">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2">Nombre</th>
                <th className="p-2">DNI</th>
                <th className="p-2">Teléfono</th>
                <th className="p-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cli) => (
                <tr
                  key={cli._id}
                  className="hover:bg-yellow-100 cursor-pointer"
                  onClick={() => {
                    onSelect(cli);
                    onClose();
                  }}
                >
                  <td className="p-2">{cli.nombre}</td>
                  <td className="p-2">{cli.dni}</td>
                  <td className="p-2">{cli.telefono}</td>
                  <td className="p-2">{cli.email}</td>
                </tr>
              ))}
              {clientes.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center p-4">No se encontraron resultados</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}