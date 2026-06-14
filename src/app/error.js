"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application runtime error:", error);
  }, [error]);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background px-4 sm:px-6">
      {/* Self-contained CSS Animations */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0) scale(1.05); }
          50% { transform: translateY(15px) scale(0.95); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        .animate-float-1 {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-2 {
          animation: float-reverse 10s ease-in-out infinite;
        }
        .animate-glow {
          animation: pulse-glow 4s ease-in-out infinite;
        }
      `}</style>

      {/* Floating Animated Background Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-destructive/10 blur-[80px] animate-float-1" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-amber-500/10 blur-[80px] animate-float-2" />
      </div>

      {/* Main Glassmorphic Container */}
      <div className="relative z-10 w-full max-w-lg text-center">
        <div className="relative mx-auto w-24 h-24 bg-destructive/10 border border-destructive/20 rounded-3xl flex items-center justify-center mb-8 shadow-inner animate-float-1">
          <AlertTriangle className="w-12 h-12 text-destructive" />
          <div className="absolute inset-0 rounded-3xl bg-destructive/5 blur-md animate-glow" />
        </div>

        <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-foreground select-none">
          Something went wrong
        </h1>

        <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
          An unexpected error occurred in the system. We&apos;ve logged the issue and are looking into it.
        </p>

        {error?.message && (
          <div className="mt-6 p-4 bg-muted/50 border rounded-xl max-w-md mx-auto text-left overflow-x-auto">
            <code className="text-xs text-destructive font-mono break-all font-semibold">
              Error: {error.message}
            </code>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={() => reset()}
            className="w-full sm:w-auto h-12 px-6 text-sm font-medium shadow-lg hover:shadow-destructive/20 hover:scale-[1.02] transition-all duration-300 gap-2 rounded-xl bg-destructive hover:bg-destructive/95 text-destructive-foreground"
          >
            <RotateCw className="w-4 h-4 animate-spin-hover" />
            Try Again
          </Button>

          <Button
            asChild
            variant="outline"
            className="w-full sm:w-auto h-12 px-6 text-sm font-medium border-border/80 hover:bg-muted/50 transition-all duration-300 gap-2 rounded-xl"
          >
            <Link href="/admin">
              <Home className="w-4 h-4" />
              Go to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
