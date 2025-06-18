
import React, { createContext, useState } from 'react';
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    () => localStorage.getItem('username') || null
  );
  const login = (username) => {
    localStorage.setItem('username', username);
    setUser(username);
  };
  const logout = () => {
    localStorage.removeItem('username');
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
