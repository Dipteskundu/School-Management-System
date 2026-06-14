"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function DashboardLayout({ children }) {
  const [session] = useState({ user: { role: "ADMIN", name: "Admin User", email: "admin@school.com" } });

  const role = session.user?.role;

  return (
    <div className="min-h-screen flex">
      <Sidebar role={role} />
      <div className="flex-1 flex flex-col">
        <Header role={role} session={session} />
        <main className="flex-1 p-4 lg:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
