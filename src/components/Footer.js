import React from "react";
import { useStoreConfig } from "../context/StoreConfigContext";

export default function Footer() {
  const { cfg } = useStoreConfig();

  return (
    <footer
      className="footer"
      style={{
        padding: 20,
        textAlign: "center",
        background: cfg?.themeColor || "#2c2b6e",
        color: "white"
      }}
    >
      {cfg?.addressText || "Endereço da loja não configurado"}
    </footer>
  );
}