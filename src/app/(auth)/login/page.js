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
import { GraduationCap, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
      <Card className="shadow-xl border-0">
        <CardHeader className="text-center pb-2 px-6">
          <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-primary rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <GraduationCap className="w-8 h-8 sm:w-9 sm:h-9 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl sm:text-3xl font-bold">Welcome Back</CardTitle>
          <CardDescription className="text-sm sm:text-base mt-1">
            Sign in to the School Management System
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5 pt-6 px-6">
            <div className="space-y-2">
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
                className="h-11"
                required
              />
            </div>
            <div className="space-y-2">
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
                className="h-11"
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 px-4 sm:px-6 md:px-8 pb-8">
            <Button type="submit" className="w-full h-11 text-base" disabled={loading}>
              {loading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : null}
              {loading ? "Signing in..." : "Sign In"}
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-primary font-medium hover:underline"
              >
                Create one
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
