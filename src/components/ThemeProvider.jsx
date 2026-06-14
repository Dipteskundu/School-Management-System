"use client";

import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";

const ThemeContext = createContext(null);

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState("light");
  const [mounted, setMounted] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");

    const root = document.documentElement;
    if (initialTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    setThemeState(initialTheme);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const setLightTheme = useCallback(() => {
    setThemeState("light");
  }, []);

  const setDarkTheme = useCallback(() => {
    setThemeState("dark");
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, mounted, toggleTheme, setLightTheme, setDarkTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
