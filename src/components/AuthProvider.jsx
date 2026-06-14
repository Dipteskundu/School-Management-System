"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const fetchSession = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/session");
      if (res.ok) {
        const data = await res.json();
        return data.user;
      }
      return null;
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetchSession().then((user) => {
      if (!cancelled) {
        setSession(user);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [fetchSession]);

  useEffect(() => {
    if (!loading) {
      if (!session && !pathname.startsWith("/login") && !pathname.startsWith("/register")) {
        router.replace("/login");
      } else if (session && (pathname.startsWith("/login") || pathname === "/")) {
        const roleRoutes = {
          ADMIN: "/admin",
          TEACHER: "/teacher",
          STUDENT: "/student",
          PARENT: "/parent",
        };
        router.replace(roleRoutes[session.role] || "/admin");
      }
    }
  }, [loading, session, pathname, router]);

  const login = (user) => {
    setSession(user);
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setSession(null);
    router.replace("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-muted"></div>
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent absolute inset-0"></div>
          </div>
          <p className="text-sm text-muted-foreground animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ session, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
