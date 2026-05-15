// Tarjeta que muestra el uso actual del disco
"use client";

import { DiskMetrics } from "@/types/metrics";

interface DiskCardProps {
  data: DiskMetrics;
}

export function DiskCard({ data }: DiskCardProps) {
  const usagePercent = data.usage_percent;

  const barColor =
    usagePercent < 60 ? "bg-cyan-500 dark:bg-cyan-400" :
    usagePercent < 80 ? "bg-yellow-500 dark:bg-yellow-400" :
    "bg-red-500 dark:bg-red-400";

  return (
    <div className="border rounded p-4 font-mono
      border-cyan-200 bg-white dark:border-cyan-900 dark:bg-black">
      <p className="text-xs mb-3 uppercase tracking-widest
        text-cyan-600 dark:text-cyan-500">
        Disco
      </p>
      <p className="text-3xl font-bold mb-1
        text-cyan-600 dark:text-cyan-400">
        {usagePercent.toFixed(1)}%
      </p>
      <div className="w-full rounded h-2 mb-3
        bg-cyan-100 dark:bg-cyan-950">
        <div
          className={`h-2 rounded transition-all duration-500 ${barColor}`}
          style={{ width: `${usagePercent}%` }}
        />
      </div>
      <div className="text-xs space-y-1
        text-cyan-700 dark:text-cyan-700">
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