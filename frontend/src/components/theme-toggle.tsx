// Botón para alternar entre tema claro y oscuro
"use client";

interface ThemeToggleProps {
  theme: "dark" | "light";
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="text-xs font-mono border px-3 py-1 rounded transition-colors
        border-green-900 text-green-700 hover:border-green-600 hover:text-green-400
        dark:border-green-900 dark:text-green-700 dark:hover:border-green-600 dark:hover:text-green-400
        light:border-gray-300 light:text-gray-500 light:hover:border-gray-500 light:hover:text-gray-700"
    >
      {theme === "dark" ? "☀ Tema claro" : "☾ Tema oscuro"}
    </button>
  )
}