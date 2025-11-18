import axios from "axios";

// URL do backend
const API = process.env.REACT_APP_API_URL || "http://localhost:8083";

// cria a instância axios
const api = axios.create({ baseURL: API });

// ------------------------------
// 🔥 GERAR / RECUPERAR SESSION ID
// ------------------------------
let sessionId = localStorage.getItem("sessionId");

if (!sessionId) {
  sessionId = crypto.randomUUID();
  localStorage.setItem("sessionId", sessionId);
}

// ------------------------------
// 🔥 INTERCEPTOR QUE ENVIA sessionId EM TODAS AS REQUISIÇÕES
// ------------------------------
api.interceptors.request.use((config) => {
  config.headers["X-Session-Id"] = sessionId;
  return config;
});

// Mantém função de Auth (para admin futuramente)
export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common["Authorization"] = "Bearer " + token;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}

export default api;