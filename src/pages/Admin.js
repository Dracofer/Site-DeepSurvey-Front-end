import React,{useState,useEffect} from "react";
import api from "../api";
export default function Admin(){
  const [name,setName]=useState(''); const [price,setPrice]=useState(''); const [img,setImg]=useState(''); const [products,setProducts]=useState([]);
  useEffect(()=>{load()},[]);
  async function load(){ try{ const r=await api.get('/products'); setProducts(r.data||[])}catch(e){console.error(e)}}
  async function add(){ try{ await api.post('/products',{name,price:parseFloat(price||0),imageUrl:img}); setName(''); setPrice(''); setImg(''); load(); }catch(e){alert('erro')}}
  return (<div className="container">
    <h2>Painel Admin</h2>
    <div style={{display:'flex',gap:8,marginBottom:12}}>
      <input placeholder="Nome" value={name} onChange={e=>setName(e.target.value)}/>
      <input placeholder="Preço" value={price} onChange={e=>setPrice(e.target.value)}/>
      <input placeholder="Imagem URL" value={img} onChange={e=>setImg(e.target.value)}/>
      <div className="btn" onClick={add}>Adicionar</div>
    </div>
    <div>{products.map(p=> <div key={p.id}>{p.name} - R$ {p.price}</div>)}</div>
  </div>);
}
