import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import logo from '../assets/logo.png';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow p-4 flex items-center space-x-6">
      <img src={logo} alt="ReparaSoft Logo" className="h-10" />
      <span className="text-xl font-semibold text-blue-700">ReparaSoft</span>
      {user && (
        <>
          <Link to="/" className="text-gray-700 hover:text-blue-500">Inicio</Link>
          <Link to="/orders" className="text-gray-700 hover:text-blue-500">Crear Órdenes</Link>
          <Link to="/ver-ordenes" className="text-gray-700 hover:text-blue-500">Ver Órdenes</Link>
          <Link to="/clientes" className="text-gray-700 hover:text-blue-500">Clientes</Link>
          <button onClick={handleLogout} className="ml-auto bg-red-500 text-white px-4 py-1 rounded">Salir</button>
        </>
      )}
      {!user && <Link to="/login" className="ml-auto text-blue-600 hover:underline">Login</Link>}
    </nav>
  );
}
