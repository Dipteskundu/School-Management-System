import DashboardLayout from "@/components/layout/DashboardLayout";

export const dynamic = "force-dynamic";

export default function Layout({ children }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
