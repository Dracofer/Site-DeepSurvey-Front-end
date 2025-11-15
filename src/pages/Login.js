import React, {useState} from 'react';
import axios, { setAuthToken } from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);
  const nav = useNavigate();

  async function submit(e){
    e.preventDefault();
    try{
      const res = await axios.post('/auth/login', { username, password });
      const token = res.data.token;
      localStorage.setItem('token', token);
      setAuthToken(token);
      setMsg('Logado com sucesso');
      setTimeout(()=>nav('/admin'), 700);
    }catch(err){
      console.error(err);
      setMsg('Erro no login');
    }
  }

  return (
    <div style={{maxWidth:420}}>
      <h3>Login</h3>
      {msg && <div style={{marginBottom:8}}>{msg}</div>}
      <form onSubmit={submit} className="admin-form">
        <input className="input" placeholder="username" value={username} onChange={e=>setUsername(e.target.value)} />
        <input className="input" placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="btn" type="submit">Entrar</button>
      </form>
    </div>
  );
}
