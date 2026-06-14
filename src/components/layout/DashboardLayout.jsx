"use client";

import { useAuth } from "@/components/AuthProvider";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function DashboardLayout({ children }) {
  const { session, loading } = useAuth();
  const router = useRouter();
  const [showContent, setShowContent] = useState(false);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!loading && !session) {
      router.replace("/login");
    }
  }, [loading, session, router]);

  useEffect(() => {
    if (!loading && session && !hasAnimated.current) {
      hasAnimated.current = true;
      requestAnimationFrame(() => {
        setShowContent(true);
      });
    }
  }, [loading, session]);

  if (loading || !session) {
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

  const role = session.role;

  return (
    <div className="h-screen flex overflow-hidden">
      <div className={`transition-all duration-500 ease-out h-full flex-shrink-0 ${showContent ? 'animate-slide-in-left' : 'opacity-0'}`}>
        <Sidebar role={role} />
      </div>
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <div className={`transition-all duration-500 ease-out flex-shrink-0 ${showContent ? 'animate-fade-in-down' : 'opacity-0'}`}>
          <Header role={role} session={{ user: session }} />
        </div>
        <main className={`flex-1 p-4 lg:p-6 overflow-y-auto transition-all duration-500 ease-out ${showContent ? 'page-transition' : 'opacity-0'}`}>
          {children}
        </main>
      </div>
    </div>
  );
}
