"use client";

import { useAuth } from "@/components/AuthProvider";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({ children }) {
  const { session, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !session) {
      router.replace("/login");
    }
  }, [loading, session, router]);

  if (loading || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const role = session.role;

  return (
    <div className="min-h-screen flex">
      <Sidebar role={role} />
      <div className="flex-1 flex flex-col">
        <Header role={role} session={{ user: session }} />
        <main className="flex-1 p-4 lg:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
