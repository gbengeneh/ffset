"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { api, getToken, setToken } from "@/lib/api-client";

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  role: "admin" | "cashier" | "inventory" | "player";
};

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthUser>;
  logout: () => Promise<void>;
};

const USER_KEY = "ffset_admin_user";
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void Promise.resolve().then(() => {
      const token = getToken();
      const storedUser = window.localStorage.getItem(USER_KEY);

      if (token && storedUser) {
        try {
          setUser(JSON.parse(storedUser) as AuthUser);
        } catch {
          setUser(null);
        }
      }

      setLoading(false);
    });
  }, []);

  const login = async (email: string, password: string) => {
    const response = await api.post<{ token: string; user: AuthUser }>("/auth/login", {
      email,
      password,
    });

    setToken(response.token);
    window.localStorage.setItem(USER_KEY, JSON.stringify(response.user));
    setUser(response.user);

    return response.user;
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {
      // Token may already be invalid/expired — clearing it locally is enough either way.
    } finally {
      setToken(null);
      window.localStorage.removeItem(USER_KEY);
      setUser(null);
    }
  };

  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
