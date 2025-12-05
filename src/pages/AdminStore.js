import React, { useEffect, useState } from "react";
import api from "../api";

export default function AdminStore() {
  const [cfg, setCfg] = useState(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const r = await api.get("/store-config");
    setCfg(r.data);
  }

  async function save() {
    await api.put(`/store-config/${cfg.id}`, cfg);
    alert("Configurações salvas!");
  }

  if (!cfg) return <div className="container">Carregando...</div>;

  return (
    <div className="container" style={{ maxWidth: 600 }}>
      <h2>Configurações da Loja</h2>
      <hr />

      <label>Nome da Loja</label>
      <input
        value={cfg.storeName}
        onChange={(e) => setCfg({ ...cfg, storeName: e.target.value })}
      />

      <label>Subtítulo da Loja</label>
      <input
        value={cfg.storeSubtitle || ""}
        onChange={(e) => setCfg({ ...cfg, storeSubtitle: e.target.value })}
      />

      <label>Logo (URL)</label>
      <input
        value={cfg.logoUrl || ""}
        onChange={(e) => setCfg({ ...cfg, logoUrl: e.target.value })}
      />

      <label>Cor do Tema</label>
      <input
        type="color"
        value={cfg.themeColor}
        onChange={(e) => setCfg({ ...cfg, themeColor: e.target.value })}
      />

      <label>Pedido Mínimo</label>
      <input
        type="number"
        value={cfg.minimumOrderValue}
        onChange={(e) =>
          setCfg({ ...cfg, minimumOrderValue: parseFloat(e.target.value) })
        }
      />

      <label>Endereço</label>
      <textarea
        value={cfg.addressText || ""}
        onChange={(e) => setCfg({ ...cfg, addressText: e.target.value })}
      />

      <label>Status</label>
      <select
        value={cfg.storeOpen}
        onChange={(e) =>
          setCfg({ ...cfg, storeOpen: e.target.value === "true" })
        }
      >
        <option value="true">Aberto</option>
        <option value="false">Fechado</option>
      </select>

      <br /><br />
      <button onClick={save}>Salvar Alterações</button>
    </div>
  );
}