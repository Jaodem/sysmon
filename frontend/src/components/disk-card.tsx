// Tarjeta que muestra el uso actual del disco
"use client";

import { DiskMetrics } from "@/types/metrics";

interface DiskCardProps {
  data: DiskMetrics;
}

export function DiskCard({ data }: DiskCardProps) {
  const usagePercent = data.usage_percent;

  const barColor =
    usagePercent < 60 ? "bg-green-400" :
    usagePercent < 80 ? "bg-yellow-400" :
    "bg-red-400";

  return (
    <div className="border border-cyan-900 bg-black p-4 rounded font-mono">
      <p className="text-cyan-500 text-xs mb-3 uppercase tracking-widest">
        Disco
      </p>
      <p className="text-cyan-400 text-3xl font-bold mb-1">
        {usagePercent.toFixed(1)}%
      </p>
      <div className="w-full bg-cyan-950 rounded h-2 mb-3">
        <div
          className={`h-2 rounded transition-all duration-500 ${barColor}`}
          style={{ width: `${usagePercent}%` }}
        />
      </div>
      <div className="text-cyan-700 text-xs space-y-1">
        <p>
          Usado: {data.used_gb.toFixed(1)} GB
        </p>
        <p>
          Total: {data.total_gb.toFixed(1)} GB
        </p>
      </div>
    </div>
  );
}