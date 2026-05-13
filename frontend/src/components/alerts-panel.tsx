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
      <div className="border border-green-900 bg-black p-4 rounded font-mono">
        <p className="text-green-500 text-xs mb-2 uppercase tracking-widest">
          Alertas
        </p>
        <p className="text-green-900 text-sm">
          ✓ Sin alertas activas
        </p>
      </div>
    );
  }

  return (
    <div className="border border-red-900 bg-black p-4 rounded font-mono">
      <p className="text-red-500 text-xs mb-3 uppercase tracking-widest">
        ⚠ Alertas activas ({alerts.length})
      </p>
      <div className="space-y-2">
        {alerts.map((alert, index) => (
          <div key={index} className="border border-red-950 p-3 rounded">
            <p className="text-red-400 text-sm font-bold">
              {METRIC_LABELS[alert.metric]} — {alert.value.toFixed(1)}%
            </p>
            <p className="text-red-700 text-xs mt-1">
              {alert.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}