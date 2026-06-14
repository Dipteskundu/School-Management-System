"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { GraduationCap, Loader2, Shield, BookOpen, User, Users } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";

const demoCredentials = [
  { role: "Admin", email: "admin@school.com", password: "password123", icon: Shield, color: "bg-red-100 text-red-700 hover:bg-red-200" },
  { role: "Teacher", email: "teacher@school.com", password: "password123", icon: BookOpen, color: "bg-blue-100 text-blue-700 hover:bg-blue-200" },
  { role: "Student", email: "student@school.com", password: "password123", icon: User, color: "bg-green-100 text-green-700 hover:bg-green-200" },
  { role: "Parent", email: "parent@school.com", password: "password123", icon: Users, color: "bg-purple-100 text-purple-700 hover:bg-purple-200" },
];

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fillDemo = (email, password) => {
    setForm({ email, password });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Login failed");
        return;
      }

      toast.success("Login successful!");
      login(data.user);

      const roleRoutes = {
        ADMIN: "/admin",
        TEACHER: "/teacher",
        STUDENT: "/student",
        PARENT: "/parent",
      };

      router.push(roleRoutes[data.user.role] || "/admin");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm">
      <Card className="shadow-xl border-0 animate-scale-in">
        <CardHeader className="text-center pb-2 px-6">
          <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-primary rounded-2xl flex items-center justify-center mb-4 shadow-lg animate-bounce-in">
            <GraduationCap className="w-8 h-8 sm:w-9 sm:h-9 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl sm:text-3xl font-bold animate-fade-in-up" style={{ animationDelay: '100ms' }}>Welcome Back</CardTitle>
          <CardDescription className="text-sm sm:text-base mt-1 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            Sign in to the School Management System
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5 pt-6 px-6">
            <div className="space-y-2 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className="h-11 transition-all duration-200 focus:scale-[1.02]"
                required
              />
            </div>
            <div className="space-y-2 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                className="h-11 transition-all duration-200 focus:scale-[1.02]"
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 px-4 sm:px-6 md:px-8 pb-8">
            <Button 
              type="submit" 
              className="w-full h-11 text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]" 
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : null}
              {loading ? "Signing in..." : "Sign In"}
            </Button>
            <p className="text-sm text-muted-foreground text-center animate-fade-in" style={{ animationDelay: '500ms' }}>
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-primary font-medium hover:underline transition-colors duration-200"
              >
                Create one
              </Link>
            </p>
          </CardFooter>
        </form>

        <div className="px-6 pb-6 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Demo Credentials</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center mb-3">
            Run <code className="font-mono bg-muted px-1 py-0.5 rounded">POST /api/seed</code> first to create demo users
          </p>
          <div className="grid grid-cols-2 gap-2 stagger-children">
            {demoCredentials.map((cred) => {
              const Icon = cred.icon;
              return (
                <button
                  key={cred.role}
                  type="button"
                  onClick={() => fillDemo(cred.email, cred.password)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 hover:scale-105 hover:shadow-md ${cred.color}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {cred.role}
                </button>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
}
