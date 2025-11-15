import React from 'react';
export default function ProductCard({p}){
  return (
    <div className="card">
      <img className="product-img" src={p.imageUrl || 'https://via.placeholder.com/400'} alt={p.name} />
      <h4 style={{margin:'8px 0 4px'}}>{p.name}</h4>
      <div style={{color:'#6b7280'}}>R$ {p.price?.toFixed(2) ?? '0.00'}</div>
      <div style={{marginTop:8}}><button className="btn">Comprar</button></div>
    </div>
  );
}
