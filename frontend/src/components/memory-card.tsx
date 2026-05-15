// Tarjeta que muestra el uso actual de memoria RAM
"use client";

import { MemoryMetrics } from "@/types/metrics";

interface MemoryCardProps {
  data: MemoryMetrics;
}

export function MemoryCard({ data }: MemoryCardProps) {
  const usagePercent = data.usage_percent;

  // El color cambia según el nivel de uso — verde, amarillo, rojo
  const barColor =
    usagePercent < 60 ? "bg-green-500 dark:bg-green-400" :
    usagePercent < 80 ? "bg-yellow-500 dark:bg-yellow-400" :
    "bg-red-500 dark:bg-red-400";

  return (
    <div className="border rounded p-4 font-mono
      border-green-200 bg-white dark:border-green-900 dark:bg-black">
      <p className="text-xs mb-3 uppercase tracking-widest
        text-green-600 dark:text-green-500">
        Memoria RAM
      </p>
      <p className="text-3xl font-bold mb-1
        text-green-600 dark:text-green-400">
        {usagePercent.toFixed(1)}%
      </p>
      <div className="w-full rounded h-2 mb-3
        bg-green-100 dark:bg-green-950">
        <div
          className={`h-2 rounded transition-all duration-500 ${barColor}`}
          style={{ width: `${usagePercent}%` }}
        />
      </div>
      <div className="text-xs space-y-1
        text-green-700 dark:text-green-700">
        <p>
          Usada: {data.used_mb.toFixed(0)} MB
        </p>
        <p>
          Total: {data.total_mb.toFixed(0)} MB
        </p>
      </div>
    </div>
  );
}