"use client";

import { AlertEvent } from "@/types/metrics";

interface AlertsPanelProps {
  alerts: AlertEvent[];
}

const METRIC_LABELS: Record<string, string> = {
  cpu: "CPU",
  memory: "RAM",
  disk: "Disco",
};

export function AlertsPanel({ alerts }: AlertsPanelProps) {
  if (alerts.length === 0) {
    return (
      <div className="border rounded p-4 font-mono
        border-green-200 bg-white dark:border-green-900 dark:bg-black">
        <p className="text-xs mb-2 uppercase tracking-widest
          text-green-600 dark:text-green-500">
          Alertas
        </p>
        <p className="text-sm text-green-400 dark:text-green-900">
          ✓ Sin alertas activas
        </p>
      </div>
    );
  }

  return (
    <div className="border rounded p-4 font-mono
      border-red-300 bg-white dark:border-red-900 dark:bg-black">
      <p className="text-xs mb-3 uppercase tracking-widest
        text-red-600 dark:text-red-500">
        ⚠ Alertas activas ({alerts.length})
      </p>
      <div className="space-y-2">
        {alerts.map((alert, index) => (
          <div key={index} className="border p-3 rounded
            border-red-200 dark:border-red-950">
            <p className="text-sm font-bold
              text-red-600 dark:text-red-400">
              {METRIC_LABELS[alert.metric]} — {alert.value.toFixed(1)}%
            </p>
            <p className="text-xs mt-1
              text-red-400 dark:text-red-700">
              {alert.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}