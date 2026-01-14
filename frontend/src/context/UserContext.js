import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const stored = localStorage.getItem("xtechon_user");
    if (stored) setUser(JSON.parse(stored));
  }, []);
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("xtechon_user", JSON.stringify(userData));
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("xtechon_user");
  };
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
