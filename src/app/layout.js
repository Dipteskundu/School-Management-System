import "./globals.css";
import Providers from "@/components/Providers";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "School Management System",
  description: "A modern school management system with role-based access",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
