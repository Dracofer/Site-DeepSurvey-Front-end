import axios from "axios";

const API = "http://localhost:8083"; // sem barra no final

const axiosInstance = axios.create({
  baseURL: API,
});

// Função para definir o token
export function setAuthToken(token) {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + token;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
}

export default axiosInstance;