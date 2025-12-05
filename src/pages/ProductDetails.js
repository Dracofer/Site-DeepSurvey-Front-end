import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

export default function ProductDetails() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const nav = useNavigate();

  const [currentImage, setCurrentImage] = useState(null);
  const [zoomImage, setZoomImage] = useState(null); // <-- zoom modal

  useEffect(() => {
    load();
  }, [id]);

  async function load() {
    try {
      const r = await api.get("/products/" + id);
      setP(r.data);

      // Define a imagem principal
      const mainImg = r.data.imageUrl?.startsWith("http")
        ? r.data.imageUrl
        : `/images/${r.data.imageUrl}`;

      setCurrentImage(mainImg);
    } catch (e) {
      console.error(e);
    }
  }

  async function add() {
    try {
      let sessionId = localStorage.getItem("sessionId");
      if (!sessionId) {
        sessionId = crypto.randomUUID();
        localStorage.setItem("sessionId", sessionId);
      }

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

  // Todas as imagens do produto
  const mainImg = p.imageUrl?.startsWith("http")
    ? p.imageUrl
    : `/images/${p.imageUrl}`;

  const extraImages = Array.isArray(p.images)
    ? p.images.map((img) =>
        img.startsWith("http") ? img : `/images/${img}`
      )
    : [];

  const gallery = [mainImg, ...extraImages];

  return (
    <div
      className="container"
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 40,
        paddingTop: 40,
      }}
    >
      {/* CARROSSEL DE IMAGENS */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {/* IMAGEM PRINCIPAL */}
        <img
          src={currentImage}
          onClick={() => setZoomImage(currentImage)} // <-- abre zoom
          alt={p.name}
          style={{
            width: 420,
            height: 420,
            objectFit: "contain",
            borderRadius: 10,
            cursor: "zoom-in",
            transition: "0.2s",
            background: "#fff"
          }}
        />

        {/* MINIATURAS */}
        <div style={{ display: "flex", gap: 10 }}>
          {gallery.map((img, i) => (
            <img
              key={i}
              src={img}
              onClick={() => setCurrentImage(img)} // <-- troca imagem principal
              alt=""
              style={{
                width: 80,
                height: 80,
                objectFit: "contain",
                borderRadius: 6,
                border:
                  img === currentImage
                    ? "2px solid #0a7cff"
                    : "1px solid #ccc",
                cursor: "pointer",
                background: "#fff",
                padding: 3
              }}
            />
          ))}
        </div>
      </div>

      {/* DETALHES DO PRODUTO */}
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

        <p style={{ fontSize: 16, color: "#555", lineHeight: "22px" }}>
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

      {/* MODAL DE ZOOM */}
      {zoomImage && (
        <div
          onClick={() => setZoomImage(null)}
          style={{
            position: "fixed",
            top: 0, left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "zoom-out",
            zIndex: 9999
          }}
        >
          <img
            src={zoomImage}
            alt="Zoom"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: 10
            }}
          />
        </div>
      )}
    </div>
  );
}