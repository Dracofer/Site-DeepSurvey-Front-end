import { createContext, useContext, useEffect, useState } from "react";
import api from "../api";

const StoreConfigContext = createContext();

export function StoreConfigProvider({ children }) {
  const [cfg, setCfg] = useState(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const r = await api.get("/store-config");
    setCfg(r.data);
  }

  return (
    <StoreConfigContext.Provider value={{ cfg, setCfg, load }}>
      {children}
    </StoreConfigContext.Provider>
  );
}

export function useStoreConfig() {
  return useContext(StoreConfigContext);
}