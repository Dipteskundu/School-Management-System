"use client";

import AuthProvider from "./AuthProvider";
import { Toaster } from "sonner";

export default function Providers({ children }) {
  return (
    <AuthProvider>
      {children}
      <Toaster position="top-right" richColors />
    </AuthProvider>
  );
}
