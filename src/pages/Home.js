import React, { useEffect, useState } from "react";
import api from "../api";
import "./Home.css";

export default function Home() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function carregarProdutos() {
    try {
      const resposta = await api.get("/products");
      setProdutos(resposta.data);
    } catch (err) {
      console.log("Erro ao buscar produtos:", err);
    }
  }

  return (
    <div className="container">
      <h2 className="titulo">Produtos</h2>

      <div className="lista-produtos">
        {produtos.length === 0 ? (
          <p>Nenhum produto encontrado.</p>
        ) : (
          produtos.map((p) => (
            <div key={p.id} className="card-produto">
              <img
                src={p.imageUrl || "https://via.placeholder.com/200"}
                alt={p.name}
                className="produto-img"
              />

              <h3 className="produto-nome">{p.name}</h3>

              <p className="produto-preco">
                R$ {p.price ? p.price.toFixed(2) : "0,00"}
              </p>

              <button className="btn-comprar">Comprar</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
