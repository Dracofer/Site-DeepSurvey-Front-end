import React,{useState} from "react";
import api from "../api";
import {useNavigate} from "react-router-dom";
export default function Login(){
  const [u,setU]=useState(''); const [p,setP]=useState(''); const nav=useNavigate();
  async function doLogin(){
    try{ const r=await api.post('/auth/login',{username:u,password:p}); if(r.data.token){ localStorage.setItem('token',r.data.token); alert('Logado'); nav('/'); } }catch(e){alert('Erro')}
  }
  return (<div className="container" style={{maxWidth:420}}>
    <h2>Login</h2>
    <input placeholder="Usuário" value={u} onChange={e=>setU(e.target.value)} style={{width:'100%',padding:10,marginBottom:10}}/>
    <input placeholder="Senha" type="password" value={p} onChange={e=>setP(e.target.value)} style={{width:'100%',padding:10,marginBottom:10}}/>
    <div className="btn" onClick={doLogin} style={{display:'inline-block'}}>Entrar</div>
  </div>);
}
