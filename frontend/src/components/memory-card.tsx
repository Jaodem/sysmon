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
    usagePercent < 60 ? "bg-green-400" :
    usagePercent < 80 ? "bg-yellow-400" :
    "bg-red-400";

  return (
    <div className="border border-green-900 bg-black p-4 rounded font-mono">
      <p className="text-green-500 text-xs mb-3 uppercase tracking-widest">
        Memoria RAM
      </p>
      <p className="text-green-400 text-3xl font-bold mb-1">
        {usagePercent.toFixed(1)}%
      </p>
      <div className="w-full bg-green-950 rounded h-2 mb-3">
        <div
          className={`h-2 rounded transition-all duration-500 ${barColor}`}
          style={{ width: `${usagePercent}%` }}
        />
      </div>
      <div className="text-green-700 text-xs space-y-1">
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