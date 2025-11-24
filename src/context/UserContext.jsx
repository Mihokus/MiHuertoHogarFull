import { createContext, useState, useEffect } from "react";
import AuthService from "../services/AuthService";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  useEffect(() => {
    const storedUser = AuthService.getCurrentUser();
    if (storedUser) setUsuario(storedUser);
  }, []);
  const login = (user, token) => {
    AuthService.login(user.email, user.password);
    setUsuario(user);
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
