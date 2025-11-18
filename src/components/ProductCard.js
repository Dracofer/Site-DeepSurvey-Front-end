import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ProductCard({ p }) {
  const nav = useNavigate();

  const isOffer = p.oldPrice && p.oldPrice > p.price;

  return (
    <div style={{position:'relative'}} className="card">

      {isOffer && <div className="badge">Oferta</div>}

      <Link to={`/produto/${p.id}`} style={{width:"100%"}}>
        <img 
          className="img" 
          src={p.imageUrl ? `/images/${p.imageUrl}` : "/images/placeholder.jpeg"} 
          alt={p.name}
        />
        <h3>{p.name}</h3>
      </Link>

      <div style={{width:"100%",textAlign:"center"}} className="price-row">
        <div className="old-price">
          {isOffer ? `De: R$ ${p.oldPrice.toFixed(2).replace('.',',')}` : ''}
        </div>
        <div className="price">R$ {p.price?.toFixed(2).replace(".",",")}</div>
      </div>

      <button 
        className="btn"
        onClick={() => nav(`/produto/${p.id}`)}
      >
        Comprar
      </button>

    </div>
  );
}