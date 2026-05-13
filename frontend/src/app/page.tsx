// Página principal del dashboard de monitoreo
"use client";

import { useMetrics } from "@/hooks/use-metrics";
import { WsStatus } from "@/components/ws-status";
import { MemoryCard } from "@/components/memory-card";
import { DiskCard } from "@/components/disk-card";
import { CpuChart } from "@/components/cpu-chart";
import { AlertsPanel } from "@/components/alerts-panel";

// URL del WebSocket — en desarrollo apunta al backend local
const WS_URL = "ws://localhost:8000/ws/metrics";

export default function DashboardPage() {
  const { latestSnapshot, chartHistory, connectionStatus, reconnect } = useMetrics(WS_URL);

  return (
    <main className="min-h-screen p-6 max-w-5xl mx-auto">
    
      {/* Encabezado */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-green-400 text-2xl font-bold tracking-widest uppercase">
            ▸ Sysmon
          </h1>
          <p className="text-green-700 text-xs mt-1">
            Monitor de sistema en tiempo real
          </p>
        </div>
        <div className="flex items-center gap-4">
          <WsStatus status={connectionStatus} />
          {connectionStatus !== "connected" && (
            <button
              onClick={reconnect}
              className="text-xs text-green-700 border border-green-900 px-3 py-1 rounded hover:border-green-600 hover:text-green-400 transition-colors"
            >
              Reconectar
            </button>
          )}
        </div>
      </div>

      {/* Estado de carga inicial */}
      {!latestSnapshot ? (
        <div className="text-green-700 text-sm animate-pulse">
          Esperando datos del servidor...
        </div>
      ) : (
        <div className="space-y-6">

          {/* Métrica de CPU destacada */}
          <div className="border border-green-900 bg-black p-6 rounded font-mono">
            <p className="text-green-500 text-xs mb-3 uppercase tracking-widest">
              CPU
            </p>
            <div className="flex items-end gap-4">
              <p className="text-green-400 text-5xl font-bold">
                {latestSnapshot.cpu.usage_percent.toFixed(1)}
                <span className="text-2xl">%</span>
              </p>
              {latestSnapshot.cpu.frequency_mhz && (
                <p className="text-green-700 text-sm mb-2">
                  {latestSnapshot.cpu.frequency_mhz.toFixed(0)} MHz
                </p>
              )}
            </div>
            <div className="w-full bg-green-950 rounded h-2 mt-4">
              <div
                className="h-2 rounded bg-green-400 transition-all duration-500"
                style={{ width: `${latestSnapshot.cpu.usage_percent}%` }}
              />
            </div>
          </div>

          {/* Tarjetas de RAM y disco */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MemoryCard data={latestSnapshot.memory} />
            <DiskCard data={latestSnapshot.disk} />
          </div>

          {/* Gráfico histórico */}
          <CpuChart data={chartHistory} />

          {/* Panel de alertas */}
          <AlertsPanel alerts={latestSnapshot.alerts} />

          {/* Footer con timestamp */}
          <p className="text-green-900 text-xs text-right">
            Última actualización: {new Date(latestSnapshot.recorded_at).toLocaleString("es-AR")}
          </p>

        </div>
      )}
    </main>
  );
}