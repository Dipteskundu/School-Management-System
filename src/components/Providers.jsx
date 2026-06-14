"use client";

import dynamic from "next/dynamic";

const AuthProvider = dynamic(() => import("./AuthProvider"), {
  ssr: false,
  loading: () => <>{/* children will be rendered after mount */}</>,
});

export default function Providers({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
