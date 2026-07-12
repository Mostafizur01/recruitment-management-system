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
  const [loading] = useState(false);

  const login = (userData, userToken) => {
    localStorage.setItem("token", userToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(userToken);
    setUser(userData);
  };

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <LogAndRegContext.Provider value={{ user, token, login, logOut, loading }}>
      {children}
    </LogAndRegContext.Provider>
  );
};
