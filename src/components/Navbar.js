import React from "react";
import { Link } from "react-router-dom";
export default function Navbar(){
  return (
    <>
      <div className="topbar">
        <div>Pedido mínimo: R$ 10,00</div>
        <div>Estabelecimento aberto</div>
      </div>
      <header className="header">
        <div className="header-inner">
          <div className="logo">
           <img 
  src="/images/logo.jpeg" 
  alt="logo" 
  style={{
    height: 150,
    width: 150,
    objectFit: "cover",
    borderRadius: "50%", // opcional, deixa redondo como marca
    marginRight: 12
  }}
/>
            <div>
              <h1 style={{ fontSize: "1.8rem", margin: 0 }}>DeepSurvey</h1>
<small style={{ fontSize: "1rem" }}>Suplementos.</small>
            </div>
          </div>
          <div className="searchbox">
            <input placeholder="Digite sua busca..." />
          </div>
          <div style={{display:"flex",gap:12}}>
            <Link to="/cart">Minha sacola</Link>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </header>
      <nav className="navbar">
        <Link to="/">Início</Link>
        <Link to="/">Categorias</Link>
        <Link to="/">Ofertas</Link>
        <Link to="/">Fale conosco</Link>
      </nav>
    </>
  );
}
