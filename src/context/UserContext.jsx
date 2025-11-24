import { createContext, useState, useEffect } from "react";
import AuthService from "../services/AuthService";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) setUsuario(user);
  }, []);

  const logout = () => {
    AuthService.logout();
    setUsuario(null);
  };

  return (
    <UserContext.Provider value={{ usuario, setUsuario, logout }}>
      {children}
    </UserContext.Provider>
  );
}
