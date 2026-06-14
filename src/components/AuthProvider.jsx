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
    if (!loading && !session && !pathname.startsWith("/login") && !pathname.startsWith("/register")) {
      router.replace("/login");
    }
  }, [loading, session, pathname, router]);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setSession(null);
    router.replace("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const publicPages = ["/login", "/register"];
  if (!session && publicPages.some((p) => pathname.startsWith(p))) {
    return <>{children}</>;
  }

  return (
    <AuthContext.Provider value={{ session, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
