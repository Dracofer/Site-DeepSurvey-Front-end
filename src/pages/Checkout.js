import React, { useEffect, useState } from "react";
import api from "../api";
import "./Checkout.css";

export default function Checkout() {
  const [items, setItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [delivery, setDelivery] = useState(0);
  const [total, setTotal] = useState(0);

  const cidades = {
    "Jandira-SP": 10,
    "Barueri-SP": 20,
    "Itapevi-SP": 20,
    "Cotia-SP": 20,
  };

  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    cep: "",
    street: "",
    number: "",
    complement: "",
    reference: "",
    paymentMethod: "Dinheiro",
    change: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const sessionId = localStorage.getItem("sessionId");
    if (!sessionId) return;

    try {
      const r = await api.get("/cart/" + sessionId);
      const data = r.data || [];
      setItems(data);

      const st = data.reduce(
        (acc, i) => acc + (i.price || 0) * (i.quantity || 0),
        0
      );

      setSubtotal(st);
      setTotal(st);
    } catch (err) {
      console.error("Erro ao carregar carrinho", err);
    }
  }

  function calcDelivery(cidade) {
    const valor = cidades[cidade] || 0;
    setDelivery(valor);
    setTotal(subtotal + valor);
  }

  // -----------------------------------------
  // 🔴 VALIDAÇÃO DO FORMULÁRIO
  // -----------------------------------------
  function validateForm() {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Informe seu nome completo.";

    if (!form.phone.trim() || form.phone.length < 10)
      newErrors.phone = "Informe um Whatsapp válido.";

    if (!form.city.trim()) newErrors.city = "Selecione sua cidade.";

    if (!form.cep.trim() || form.cep.replace(/\D/g, "").length < 8)
      newErrors.cep = "CEP inválido.";

    if (!form.street.trim()) newErrors.street = "Informe a rua.";

    if (!form.number.trim()) newErrors.number = "Informe o número.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  // -----------------------------------------
  // 🔵 ENVIO DO PEDIDO
  // -----------------------------------------
  async function submitOrder() {
    if (!validateForm()) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const sessionId = localStorage.getItem("sessionId");

    let changeValue = form.change || null;
    if (changeValue !== null) changeValue = Number(changeValue);

    const req = {
      sessionId,
      name: form.name,
      phone: form.phone,
      region: form.city,
      cep: form.cep,
      street: form.street,
      number: form.number,
      complement: form.complement,
      reference: form.reference,
      paymentMethod: form.paymentMethod,
      change: changeValue,
    };

    try {
      const r = await api.post("/orders/checkout", req);
      const order = r.data;

      localStorage.removeItem("sessionId");

      let msg =
  `DEEPSURVEY SUPLEMENTOS\n` +
  `------------------------------\n\n` +
  `Pedido #${order.id}\n\n` +
  `Itens:\n`;

order.items.forEach((i) => {
  msg += `${i.quantity}x ${i.product.name} - R$ ${Number(i.price)
    .toFixed(2)
    .replace(".", ",")}\n`;
});

msg += `\nSubtotal: R$ ${subtotal.toFixed(2).replace(".", ",")}\n`;
msg += `Entrega: R$ ${delivery.toFixed(2).replace(".", ",")}\n`;
msg += `Total: R$ ${total.toFixed(2).replace(".", ",")}\n\n`;

msg += `Endereço:\n`;
msg += `${form.street} ${form.number}`;
if (form.complement) msg += ` - ${form.complement}`;
msg += `, ${form.city}`;
msg += `, CEP: ${form.cep}`;
if (form.reference) msg += ` (Ref: ${form.reference})`;
msg += `\n\n`;

msg += `Pagamento: ${form.paymentMethod}\n`;
if (form.change)
  msg += `Troco para R$ ${form.change}\n\n`;
else
  msg += `\n`;

msg += `www.deepsurveysuplementos.com.br`;

      const encoded = encodeURIComponent(msg);

      window.location.href =
        `https://api.whatsapp.com/send?phone=5511947935371&text=${encoded}`;
    } catch (err) {
      console.error("Erro no checkout:", err);
      alert("Erro ao enviar pedido.");
    }
  }

  function fmt(v) {
    return Number(v || 0).toFixed(2).replace(".", ",");
  }

  // -----------------------------------------
  // 🔶 EXIBIÇÃO DO FORMULÁRIO
  // -----------------------------------------
  return (
    <div className="container" style={{ maxWidth: 1100, paddingTop: 30 }}>
      <h2>Pedido Delivery</h2>

      <div style={{ display: "flex", gap: 40, alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <div className="section-title">🧍 Dados do cliente</div>

          {/* Nome */}
          <input
            className={`form-input ${errors.name ? "error" : ""}`}
            placeholder="Nome completo"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s\.'-]/g, ""),
              })
            }
          />
          {errors.name && <div className="input-error">{errors.name}</div>}

          {/* Whatsapp */}
          <input
            className={`form-input ${errors.phone ? "error" : ""}`}
            placeholder="Whatsapp"
            value={form.phone}
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value.replace(/\D/g, ""),
              })
            }
          />
          {errors.phone && <div className="input-error">{errors.phone}</div>}

          <div className="section-title" style={{ marginTop: 25 }}>
            📦 Entrega
          </div>

          {/* Cidade */}
          <label>Cidade:</label>
          <select
            className={`form-input ${errors.city ? "error" : ""}`}
            value={form.city}
            onChange={(e) => {
              setForm({ ...form, city: e.target.value });
              calcDelivery(e.target.value);
            }}
          >
            <option value="">Selecione...</option>
            {Object.keys(cidades).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.city && <div className="input-error">{errors.city}</div>}

          {/* CEP */}
          <input
            className={`form-input ${errors.cep ? "error" : ""}`}
            placeholder="CEP"
            value={form.cep}
            onChange={(e) =>
              setForm({
                ...form,
                cep: e.target.value.replace(/[^0-9-]/g, ""),
              })
            }
          />
          {errors.cep && <div className="input-error">{errors.cep}</div>}

          {/* Rua */}
          <input
            className={`form-input ${errors.street ? "error" : ""}`}
            placeholder="Rua"
            value={form.street}
            onChange={(e) =>
              setForm({
                ...form,
                street: e.target.value.replace(
                  /[^A-Za-zÀ-ÖØ-öø-ÿ0-9\s\.,'-]/g,
                  ""
                ),
              })
            }
          />
          {errors.street && <div className="input-error">{errors.street}</div>}

          {/* Número */}
          <input
            className={`form-input ${errors.number ? "error" : ""}`}
            placeholder="Número"
            value={form.number}
            onChange={(e) =>
              setForm({
                ...form,
                number: e.target.value.replace(/[^0-9A-Za-z\-\/]/g, ""),
              })
            }
          />
          {errors.number && <div className="input-error">{errors.number}</div>}

          {/* Complemento */}
          <input
            className="form-input"
            placeholder="Complemento"
            value={form.complement}
            onChange={(e) => setForm({ ...form, complement: e.target.value })}
          />

          {/* Referência */}
          <input
            className="form-input"
            placeholder="Ponto de referência"
            value={form.reference}
            onChange={(e) =>
              setForm({
                ...form,
                reference: e.target.value.replace(
                  /[^A-Za-zÀ-ÖØ-öø-ÿ0-9\s\.,'-]/g,
                  ""
                ),
              })
            }
          />

          <div className="section-title" style={{ marginTop: 25 }}>
            💳 Pagamento
          </div>

          {/* Método de pagamento */}
          <select
            className="form-input"
            value={form.paymentMethod}
            onChange={(e) =>
              setForm({ ...form, paymentMethod: e.target.value })
            }
          >
            <option>Dinheiro</option>
            <option>Débito</option>
            <option>Crédito</option>
            <option>Pix</option>
          </select>

          {/* Troco */}
          <input
            className="form-input"
            placeholder="Troco (opcional)"
            value={form.change}
            onChange={(e) =>
              setForm({
                ...form,
                change: e.target.value.replace(/[^0-9,\.]/g, ""),
              })
            }
          />

          <button className="btn-confirm" onClick={submitOrder}>
            Enviar pedido via WhatsApp
          </button>
        </div>

        {/* RESUMO */}
        <div style={{ width: 320 }}>
          <div
            style={{
              background: "#fff8d5",
              padding: 18,
              borderRadius: 6,
              boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
              border: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ textAlign: "center", fontWeight: 700 }}>
              DEEPSURVEY SUPLEMENTOS
            </div>

            <div
              style={{
                textAlign: "center",
                color: "#777",
                margin: "8px 0 12px",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 80,
                  borderTop: "2px solid rgba(0,0,0,0.15)",
                }}
              />
            </div>

            <div style={{ textAlign: "center", fontWeight: 700, marginBottom: 6 }}>
              Pedido
            </div>

            <div style={{ height: 8 }} />

            <div style={{ borderTop: "1px dashed rgba(0,0,0,0.12)", paddingTop: 10 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <div style={{ color: "#333" }}>Subtotal:</div>
                <div style={{ fontWeight: 700 }}>R$ {fmt(subtotal)}</div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ color: "#333" }}>Entrega:</div>
                <div style={{ fontWeight: 700 }}>
                  {delivery > 0 ? `R$ ${fmt(delivery)}` : "—"}
                </div>
              </div>

              <div
                style={{
                  borderTop: "1px solid rgba(0,0,0,0.06)",
                  marginTop: 10,
                  paddingTop: 10,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ fontWeight: 800 }}>Total:</div>
                  <div style={{ fontWeight: 800 }}>R$ {fmt(total)}</div>
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: 14,
                textAlign: "center",
                color: "#333",
                fontSize: 13,
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: 6 }}>
                {form.paymentMethod}
              </div>
            </div>
          </div>

          <div style={{ textAlign: "center", color: "#888", marginTop: 12 }}>
            O seu pedido será enviado para o nosso WhatsApp
          </div>
        </div>
      </div>
    </div>
  );
}