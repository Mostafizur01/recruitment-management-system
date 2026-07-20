import { useState } from "react";
import { LogAndRegContext } from "../hooks/logAndRegContextValue.js";

export const LogAndRegProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    if (typeof window === "undefined") return null;
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token") || null;
  });
  const [loading, setLoading] = useState(false);

  const login = (userData, userToken) => {
    const normalizedUser = {
      ...userData,
      role: String(userData.role).trim().toLowerCase(),
    };
    localStorage.setItem("token", userToken);
    localStorage.setItem("user", JSON.stringify(normalizedUser));
    setToken(userToken);
    setUser(normalizedUser);
  };

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <LogAndRegContext.Provider
      value={{ user, token, login, logOut, loading, setLoading }}
    >
      {children}
    </LogAndRegContext.Provider>
  );
};
