import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("lexintel_token") || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedUser = localStorage.getItem("lexintel_user");
        const storedToken = localStorage.getItem("lexintel_token");

        if (storedUser && storedToken) {
          // Restore session from localStorage
          setUser(JSON.parse(storedUser));
        } else {
          // No session — user needs to log in. Don't auto-call the API.
          setUser(null);
        }
      } catch (err) {
        console.error("Auth init error:", err);
        // Clear corrupted storage
        localStorage.removeItem("lexintel_user");
        localStorage.removeItem("lexintel_token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await api.login(email, password);
      if (res.success) {
        setUser(res.data.user);
        setToken(res.data.token);
        localStorage.setItem("lexintel_user", JSON.stringify(res.data.user));
        localStorage.setItem("lexintel_token", res.data.token);
      }
      return res;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const res = await api.register(userData);
      if (res.success) {
        setUser(res.data.user);
        setToken(res.data.token);
        localStorage.setItem("lexintel_user", JSON.stringify(res.data.user));
        localStorage.setItem("lexintel_token", res.data.token);
      }
      return res;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("lexintel_user");
    localStorage.removeItem("lexintel_token");
  };

  const updateUserProfile = (updatedData) => {
    const updated = { ...user, ...updatedData };
    setUser(updated);
    localStorage.setItem("lexintel_user", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        updateUserProfile,
        isAuthenticated: !!user && !!token
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
