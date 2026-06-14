"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { GraduationCap, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

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
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[80px] animate-float-1" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[80px] animate-float-2" />
        <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-purple-500/10 blur-[100px] animate-float-1" />
      </div>

      {/* Main Glassmorphic Container */}
      <div className="relative z-10 w-full max-w-lg text-center">
        <div className="relative mx-auto w-24 h-24 bg-primary/10 border border-primary/20 rounded-3xl flex items-center justify-center mb-8 shadow-inner animate-float-1">
          <GraduationCap className="w-12 h-12 text-primary" />
          <div className="absolute inset-0 rounded-3xl bg-primary/5 blur-md animate-glow" />
        </div>

        <h1 className="text-8xl sm:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-600 to-indigo-600 dark:from-primary dark:via-blue-400 dark:to-indigo-400 select-none drop-shadow-sm leading-none">
          404
        </h1>

        <h2 className="mt-6 text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Lost in the Hallways?
        </h2>

        <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
          The page you are looking for doesn&apos;t exist or has been moved to a different classroom.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="w-full sm:w-auto h-12 px-6 text-sm font-medium border-border/80 hover:bg-muted/50 transition-all duration-300 gap-2 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>

          <Button
            asChild
            className="w-full sm:w-auto h-12 px-6 text-sm font-medium shadow-lg hover:shadow-primary/20 hover:scale-[1.02] transition-all duration-300 gap-2 rounded-xl"
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
