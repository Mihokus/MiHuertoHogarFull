import { createContext, useState, useEffect } from "react";
import AuthService from "../services/AuthService";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  useEffect(() => {
    const storedUser = AuthService.getCurrentUser();
    if (storedUser) setUsuario(storedUser);
  }, []);

 const login = async (email, password) => {
  const data = await AuthService.login(email, password);
  if (data.usuario) {
    setUsuario(data.usuario);
  }
};

  const logout = () => {
    AuthService.logout();
    setUsuario(null);
  };

  return (
    <UserContext.Provider value={{ usuario, login, logout, setUsuario }}>
      {children}
    </UserContext.Provider>
  );
}
