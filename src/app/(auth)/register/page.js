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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { GraduationCap, Loader2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (value) => {
    setForm({ ...form, role: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    if (!form.role) {
      toast.error("Please select a role");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Registration failed");
        return;
      }

      toast.success("Registration successful! Please login.");
      router.push("/login");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm">
      <Card className="shadow-xl border-0 animate-scale-in">
        <CardHeader className="text-center pb-2 px-4 sm:px-6 md:px-8">
          <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-primary rounded-2xl flex items-center justify-center mb-4 shadow-lg animate-bounce-in">
            <GraduationCap className="w-8 h-8 sm:w-9 sm:h-9 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl sm:text-3xl font-bold animate-fade-in-up" style={{ animationDelay: '100ms' }}>Create Account</CardTitle>
          <CardDescription className="text-sm sm:text-base mt-1 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            Join the School Management System
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 pt-6 px-4 sm:px-6 md:px-8">
            <div className="space-y-2 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <Label htmlFor="name" className="text-sm font-medium">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                className="h-11 transition-all duration-200 focus:scale-[1.02]"
                required
              />
            </div>
            <div className="space-y-2 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
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
            <div className="grid grid-cols-2 gap-4 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Min. 6 characters"
                  value={form.password}
                  onChange={handleChange}
                  className="h-11 transition-all duration-200 focus:scale-[1.02]"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Re-enter password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="h-11 transition-all duration-200 focus:scale-[1.02]"
                  required
                />
              </div>
            </div>
            <div className="space-y-2 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
              <Label htmlFor="role" className="text-sm font-medium">
                Role
              </Label>
              <Select value={form.role} onValueChange={handleRoleChange}>
                <SelectTrigger className="w-full h-11 transition-all duration-200 focus:scale-[1.02]">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent className="animate-scale-in">
                  <SelectItem value="TEACHER" className="transition-colors duration-200">Teacher</SelectItem>
                  <SelectItem value="STUDENT" className="transition-colors duration-200">Student</SelectItem>
                  <SelectItem value="PARENT" className="transition-colors duration-200">Parent</SelectItem>
                </SelectContent>
              </Select>
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
              {loading ? "Creating account..." : "Create Account"}
            </Button>
            <p className="text-sm text-muted-foreground text-center animate-fade-in" style={{ animationDelay: '700ms' }}>
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary font-medium hover:underline transition-colors duration-200"
              >
                Sign in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
