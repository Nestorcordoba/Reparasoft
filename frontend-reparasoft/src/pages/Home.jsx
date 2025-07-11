import React from 'react';


import { useNavigate } from "react-router-dom";
import { Wrench } from "lucide-react"; // ícono moderno

export default function Inicio() {
  const navigate = useNavigate();

  const irACrearOrden = () => {
    navigate("/orders");
  };

  return (
    <div className="logo-inicio-container">
  <img
    src="/logo-reparasoft.png"
    alt="Logo ReparaSoft"
    className="logo-inicio-img"
  />

  <button
    onClick={irACrearOrden}
    className="flex items-center gap-2 bg-cyan-700 hover:bg-cyan-800 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition duration-200"
  >
    <Wrench size={40} />
    Comenzar Reparación
  </button>
</div>
    
  );
  
}


