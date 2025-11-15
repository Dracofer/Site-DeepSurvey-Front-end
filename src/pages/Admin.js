import React, {useState, useEffect} from 'react';
import axios, { setAuthToken } from '../api';

export default function Admin(){
  const [tokenChecked, setTokenChecked] = useState(false);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({name:'',price:0,description:'',imageUrl:''});

  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(token) setAuthToken(token);
    setTokenChecked(true);
    loadProducts();
  },[]);

  async function loadProducts(){
    try{
      const res = await axios.get('/products');
      setProducts(res.data || []);
    }catch(e){ console.error(e); }
  }

  async function addProduct(){
    try{
      await axios.post('/products', {...form});
      setForm({name:'',price:0,description:'',imageUrl:''});
      loadProducts();
    }catch(e){ alert('Erro ao adicionar'); console.error(e); }
  }

  if(!tokenChecked) return null;
  return (
    <div>
      <h3>Painel</h3>
      <div style={{display:'flex',gap:16}}>
        <div style={{flex:1}}>
          <div className="card">
            <h4>Adicionar Produto</h4>
            <input className="input" placeholder="Nome" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
            <input className="input" placeholder="Preço" type="number" value={form.price} onChange={e=>setForm({...form,price:parseFloat(e.target.value||0)})} />
            <input className="input" placeholder="Imagem URL" value={form.imageUrl} onChange={e=>setForm({...form,imageUrl:e.target.value})} />
            <textarea className="input" placeholder="Descrição" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
            <button className="btn" onClick={addProduct}>Adicionar</button>
          </div>
        </div>
        <div style={{flex:2}}>
          <h4>Produtos</h4>
          <div style={{display:'grid',gap:8}}>
            {products.map(p=> <div key={p.id} className="card">{p.name} — R$ {p.price}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
}
