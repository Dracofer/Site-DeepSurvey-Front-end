import React, { useEffect, useState } from "react";
import api from "../api";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

export default function CategoryProducts() {
  const { id } = useParams();
  const [cat, setCat] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    load();
  }, [id]);

  async function load() {
    try {
      const c = await api.get("/categories/" + id);
      setCat(c.data);

      const p = await api.get("/products/category/" + id);
      setProducts(p.data || []);
    } catch (e) {
      console.error(e);
    }
  }

  if (!cat) return <div className="container">Carregando...</div>;

  return (
    <div className="container" style={{ paddingTop: 30 }}>
      <h2 style={{ marginBottom: 20 }}>{cat.name}</h2>

      <div className="products-grid">
        {products.length === 0 && (
          <p>Nenhum produto nessa categoria.</p>
        )}

        {products.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </div>
  );
}