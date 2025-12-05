import axios from "axios";

const API = process.env.REACT_APP_API_URL || "http://localhost:8083";

const api = axios.create({ baseURL: API });

/* -------------------------------
   🔥 SESSÃO DA SACOLA
--------------------------------*/
let sessionId = localStorage.getItem("sessionId");
if (!sessionId) {
  sessionId = crypto.randomUUID();
  localStorage.setItem("sessionId", sessionId);
}

api.interceptors.request.use((config) => {
  config.headers["X-Session-Id"] = sessionId;

  // garante que o token sempre siga junto
  const savedToken = localStorage.getItem("token");
  if (savedToken) {
    config.headers["Authorization"] = "Bearer " + savedToken;
  }

  return config;
});

/* -------------------------------
   🔥 Função para definir/remover TOKEN 
--------------------------------*/
export function setAuthToken(token) {
  if (token) {
    localStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = "Bearer " + token;
  } else {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
  }
}

/* -------------------------------
   🔥 Ao carregar a página, aplica o token salvo
--------------------------------*/
const savedTokenAtLoad = localStorage.getItem("token");
if (savedTokenAtLoad) {
  api.defaults.headers.common["Authorization"] = "Bearer " + savedTokenAtLoad;
}

export default api;