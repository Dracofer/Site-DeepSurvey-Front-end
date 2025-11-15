import React from 'react';
import { Link } from 'react-router-dom';
export default function Navbar(){
  return (
    <header className="navbar">
      <div><strong>LojaProto</strong></div>
      <div>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/admin">Painel</Link>
      </div>
    </header>
  );
}
