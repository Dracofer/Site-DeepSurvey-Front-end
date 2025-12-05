import React, { useState } from "react";
import api, { setAuthToken } from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [u, setU] = useState('');
  const [p, setP] = useState('');
  const nav = useNavigate();

  async function doLogin() {
    try {
      const r = await api.post('/auth/login', { username: u, password: p });

      if (r.data.token) {

        // 🔥 Salva token + configura axios
        setAuthToken(r.data.token);

        // 🔥 Pega as roles retornadas pelo backend
        const roles = r.data.roles || [];

        // 🔥 Se for ADMIN -> vai para o painel
        if (roles.includes("ROLE_ADMIN")) {
          alert("Bem-vindo administrador!");
          return nav('/painel');
        }

        // 🔥 Se for usuário normal -> volta pra home
        alert("Login realizado!");
        return nav('/');
      }

    } catch (e) {
      console.error(e);
      alert("Usuário ou senha incorretos");
    }
  }

  return (
    <div className="container" style={{ maxWidth: 420 }}>
      <h2>Login</h2>

      <input
        placeholder="Usuário"
        value={u}
        onChange={e => setU(e.target.value)}
        style={{ width: '100%', padding: 10, marginBottom: 10 }}
      />

      <input
        placeholder="Senha"
        type="password"
        value={p}
        onChange={e => setP(e.target.value)}
        style={{ width: '100%', padding: 10, marginBottom: 10 }}
      />

      <div
        className="btn"
        onClick={doLogin}
        style={{ display: 'inline-block' }}
      >
        Entrar
      </div>
    </div>
  );
}