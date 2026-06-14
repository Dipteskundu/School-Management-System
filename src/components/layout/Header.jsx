"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Settings, Bell, LogOut, Sun, Moon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./Sidebar";

export default function Header({ role, session }) {
  const router = useRouter();
  const { logout } = useAuth();
  const { theme, toggleTheme, mounted } = useTheme();

  const getInitials = (name) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";
  };

  const getRoleBadge = () => {
    const colors = {
      ADMIN: "bg-red-100 text-red-700",
      TEACHER: "bg-blue-100 text-blue-700",
      STUDENT: "bg-green-100 text-green-700",
      PARENT: "bg-purple-100 text-purple-700",
    };
    return colors[role] || "bg-gray-100 text-gray-700";
  };

  return (
    <header className="h-16 border-b bg-card flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger
            render={<Button variant="ghost" size="icon" className="lg:hidden transition-transform duration-200 hover:scale-110" />}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <Sidebar role={role} isMobile={true} />
          </SheetContent>
        </Sheet>

        <div className="hidden md:block">
          <h1 className="font-semibold text-lg capitalize">
            {role?.toLowerCase()} Dashboard
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleTheme}
          className="relative transition-all duration-300 hover:scale-110 hover:bg-muted"
          disabled={!mounted}
        >
          {mounted && theme === "dark" ? (
            <Sun className="w-5 h-5 text-yellow-500" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </Button>

        <Button variant="ghost" size="icon" className="relative transition-transform duration-200 hover:scale-110">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="ghost" className="relative h-10 w-10 rounded-full transition-transform duration-200 hover:scale-110" />}
          >
            <Avatar className="h-10 w-10 transition-shadow duration-200 hover:ring-2 hover:ring-primary/20">
              <AvatarFallback>
                {getInitials(session?.user?.name)}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 animate-scale-in" align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {session?.user?.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {session?.user?.email}
                  </p>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mt-1 w-fit ${getRoleBadge()}`}
                  >
                    {role}
                  </span>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="transition-colors duration-200 cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={toggleTheme}
              className="transition-colors duration-200 cursor-pointer"
            >
              {theme === "dark" ? (
                <Sun className="mr-2 h-4 w-4" />
              ) : (
                <Moon className="mr-2 h-4 w-4" />
              )}
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </DropdownMenuItem>
            <DropdownMenuItem className="transition-colors duration-200 cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive transition-colors duration-200 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
