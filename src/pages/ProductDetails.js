import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

export default function ProductDetails() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    load();
  }, [id]);

  async function load() {
    try {
      const r = await api.get("/products/" + id);
      setP(r.data);
    } catch (e) {
      console.error(e);
    }
  }

  async function add() {
    try {
      // Criar sessionId caso não exista
      let sessionId = localStorage.getItem("sessionId");

      if (!sessionId) {
        sessionId = crypto.randomUUID();
        localStorage.setItem("sessionId", sessionId);
      }

      // Enviar para o carrinho sem login
      await api.post("/cart/add", {
        sessionId: sessionId,
        product: { id: p.id },
        quantity: 1,
      });

      nav("/cart");
    } catch (e) {
      console.error(e);
      alert("Erro ao adicionar à sacola.");
    }
  }

  if (!p) return <div className="container">Carregando...</div>;

  return (
    <div
      className="container"
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 30,
        paddingTop: 40,
      }}
    >
      <img
        src={p.imageUrl ? `/images/${p.imageUrl}` : "https://via.placeholder.com/600"}
        alt={p.name}
        style={{
          width: 420,
          height: 420,
          objectFit: "cover",
          borderRadius: 10,
        }}
      />

      <div style={{ flex: 1 }}>
        <h2 style={{ fontSize: 28, fontWeight: 700 }}>{p.name}</h2>

        <div
          style={{
            color: "#0a7cff",
            fontWeight: 800,
            fontSize: 28,
            marginTop: 10,
            marginBottom: 20,
          }}
        >
          R$ {p.price?.toFixed(2).replace(".", ",")}
        </div>

        <p
          style={{
            fontSize: 16,
            color: "#555",
            lineHeight: "22px",
            maxWidth: 500,
          }}
        >
          {p.description}
        </p>

        <button
          onClick={add}
          className="btn"
          style={{
            padding: "12px 22px",
            fontSize: 17,
            fontWeight: 700,
            borderRadius: 10,
            marginTop: 25,
            width: 220,
          }}
        >
          Adicionar à sacola
        </button>
      </div>
    </div>
  );
}