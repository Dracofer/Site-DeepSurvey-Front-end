import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import FaleConosco from "./pages/FaleConosco";
import Categories from "./pages/Categories";
import CategoryProducts from "./pages/CategoryProducts";
import SearchResults from "./pages/SearchResults";
import Offers from "./pages/Offers";
import Produtos from "./pages/Produtos";
import AdminStore from "./pages/AdminStore";

import useAuth from "./hooks/useAuth";

function AdminRoute({ children }) {
  const auth = useAuth();

  if (!auth.logged) return <Navigate to="/login" />;
  if (!auth.admin) return <Navigate to="/" />;

  return children;
}

export default function App() {
  return (
    <div className="app-root">
      <Navbar />

      <main className="container">
        <Routes>
          {/* Rotas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/produto/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/faleconosco" element={<FaleConosco />} />
          <Route path="/ofertas" element={<Offers />} />
          <Route path="/categorias" element={<Categories />} />
          <Route path="/categoria/:id" element={<CategoryProducts />} />
          <Route path="/buscar" element={<SearchResults />} />
          <Route path="/produtos" element={<Produtos />} />

          {/* ROTAS PROTEGIDAS */}
          <Route
            path="/painel"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />

          <Route
            path="/painel-loja"
            element={
              <AdminRoute>
                <AdminStore />
              </AdminRoute>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}