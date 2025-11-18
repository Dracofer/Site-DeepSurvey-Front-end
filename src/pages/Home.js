import React, {useEffect,useState} from "react";
import api from "../api";
import ProductCard from "../components/ProductCard";

export default function Home(){
  const [products,setProducts]=useState([]);
  const [categories,setCategories]=useState([]);

  useEffect(()=>{ load(); },[]);

  async function load(){
    try{
      const r = await api.get("/products");
      setProducts(r.data || []);
      const c = await api.get("/categories");
      setCategories(c.data || []);
    }catch(e){ console.error(e) }
  }

  // Promotions: oldPrice > price OR price < threshold
  const promotions = products.filter(p => p.oldPrice && p.oldPrice > p.price);

  // group by category id
  const byCategory = {};
  products.forEach(p => {
    const cid = p.category?.id || 0;
    if(!byCategory[cid]) byCategory[cid] = [];
    byCategory[cid].push(p);
  });

  return (
    <div>
      <div className="container">

        {/* Promotions section */}
        {promotions.length>0 && (
          <section style={{marginBottom:28}}>
            <div className="section-row">
              <h2>Ofertas</h2>
              <div className="view-all">Ver todas</div>
            </div>
            <div className="products-grid">
              {promotions.map(p => <ProductCard key={'off'+p.id} p={p} />)}
            </div>
          </section>
        )}

        {/* For each category from backend, render section */}
        {categories.map(cat => (
          <section key={cat.id} style={{marginBottom:28}}>
            <div className="section-row">
              <h2>{cat.name}</h2>
              <div className="view-all">Ver tudo</div>
            </div>
            <div className="products-grid">
              {(byCategory[cat.id] || []).map(p => <ProductCard key={p.id} p={p} />)}
            </div>
          </section>
        ))}

      </div>
    </div>
  );
}
