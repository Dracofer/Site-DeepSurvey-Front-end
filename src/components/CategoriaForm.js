import React, { useState } from "react";
import api from "../api";

export default function CategoriaForm({ onSave }) {

  const [name, setName] = useState("");

  async function criar() {
    await api.post("/categories", { name });
    alert("Categoria criada!");
    setName("");
    onSave();
  }

  return (
    <div style={{ marginBottom: 20 }}>
      <h3>Nova Categoria</h3>
      <input
        placeholder="Nome da categoria"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={criar}>Criar</button>
    </div>
  );
}