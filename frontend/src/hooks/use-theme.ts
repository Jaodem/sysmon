"use client";

import { useTheme as useNextTheme } from "next-themes";

type Theme = "dark" | "light";

interface UseThemeReturn {
  theme: Theme;
  toggleTheme: () => void;
  mounted: boolean;
}

export function useTheme(): UseThemeReturn {
  const { theme, setTheme, systemTheme } = useNextTheme();

  const resolvedTheme = (theme ?? systemTheme ?? "dark") as Theme;

  function toggleTheme() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  return {
    theme: resolvedTheme,
    toggleTheme,
    mounted: true,
  };
}