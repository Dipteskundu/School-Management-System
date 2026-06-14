"use client";

import AuthProvider from "./AuthProvider";
import ThemeProvider from "./ThemeProvider";
import { Toaster } from "sonner";

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        {children}
        <Toaster position="top-right" richColors />
      </AuthProvider>
    </ThemeProvider>
  );
}
