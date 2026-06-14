"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/AuthProvider";
import {
  GraduationCap,
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  ClipboardCheck,
  FileText,
  DollarSign,
  Settings,
  BarChart3,
  Bell,
  LogOut,
} from "lucide-react";

const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/students", label: "Students", icon: Users },
  { href: "/admin/teachers", label: "Teachers", icon: BookOpen },
  { href: "/admin/classes", label: "Classes", icon: Calendar },
  { href: "/admin/subjects", label: "Subjects", icon: FileText },
  { href: "/admin/fees", label: "Fees", icon: DollarSign },
  { href: "/admin/reports", label: "Reports", icon: BarChart3 },
  { href: "/admin/announcements", label: "Announcements", icon: Bell },
];

const teacherLinks = [
  { href: "/teacher", label: "Dashboard", icon: LayoutDashboard },
  { href: "/teacher/attendance", label: "Attendance", icon: ClipboardCheck },
  { href: "/teacher/grades", label: "Grades", icon: FileText },
  { href: "/teacher/schedule", label: "Schedule", icon: Calendar },
  { href: "/teacher/announcements", label: "Announcements", icon: Bell },
];

const studentLinks = [
  { href: "/student", label: "Dashboard", icon: LayoutDashboard },
  { href: "/student/grades", label: "Grades", icon: FileText },
  { href: "/student/attendance", label: "Attendance", icon: ClipboardCheck },
  { href: "/student/fees", label: "Fees", icon: DollarSign },
  { href: "/student/schedule", label: "Schedule", icon: Calendar },
];

const parentLinks = [
  { href: "/parent", label: "Dashboard", icon: LayoutDashboard },
  { href: "/parent/child", label: "Child Profile", icon: Users },
  { href: "/parent/grades", label: "Grades", icon: FileText },
  { href: "/parent/attendance", label: "Attendance", icon: ClipboardCheck },
  { href: "/parent/fees", label: "Fees", icon: DollarSign },
];

export default function Sidebar({ role, isMobile = false }) {
  const pathname = usePathname();
  const { logout } = useAuth();

  const getLinks = () => {
    switch (role) {
      case "ADMIN":
        return adminLinks;
      case "TEACHER":
        return teacherLinks;
      case "STUDENT":
        return studentLinks;
      case "PARENT":
        return parentLinks;
      default:
        return adminLinks;
    }
  };

  const links = getLinks();

  return (
    <div className={cn(
      "flex flex-col w-64 bg-card h-full",
      !isMobile && "hidden lg:flex lg:border-r"
    )}>
      <div className="flex items-center gap-2 px-6 py-5 border-b">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <GraduationCap className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="font-bold text-lg">SMS</span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive =
            pathname === link.href ||
            (link.href !== `/` && pathname.startsWith(link.href));

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t space-y-1">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <Settings className="w-5 h-5" />
          Settings
        </Link>
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors w-full"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
}
