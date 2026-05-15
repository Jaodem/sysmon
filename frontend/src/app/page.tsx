// Página principal del dashboard de monitoreo
"use client";

import { useMetrics } from "@/hooks/use-metrics";
import { useTheme } from "@/hooks/use-theme";
import { WsStatus } from "@/components/ws-status";
import { MemoryCard } from "@/components/memory-card";
import { DiskCard } from "@/components/disk-card";
import { CpuChart } from "@/components/cpu-chart";
import { AlertsPanel } from "@/components/alerts-panel";
import { ThemeToggle } from "@/components/theme-toggle";

// URL del WebSocket — en desarrollo apunta al backend local
const WS_URL = "ws://localhost:8000/ws/metrics";

export default function DashboardPage() {
  const { latestSnapshot, chartHistory, connectionStatus, reconnect } = useMetrics(WS_URL);
  const { theme, toggleTheme, mounted } = useTheme();

  return (
    <main className="min-h-screen p-6 max-w-5xl mx-auto
      bg-white dark:bg-black">
    
      {/* Encabezado */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-widest uppercase
            text-green-600 dark:text-green-400">
            ▸ Sysmon
          </h1>
          <p className="text-xs mt-1
            text-green-700 dark:text-green-700">
            Monitor de sistema en tiempo real
          </p>
        </div>
        <div className="flex items-center gap-4">
          <WsStatus status={connectionStatus} />
          {connectionStatus !== "connected" && (
            <button
              onClick={reconnect}
              className="text-xs font-mono border px-3 py-1 rounded transition-colors
                border-green-200 text-green-600 hover:border-green-400 hover:text-green-700
                dark:border-green-900 dark:text-green-700 dark:hover:border-green-600 dark:hover:text-green-400"
            >
              Reconectar
            </button>
          )}
          {mounted && <ThemeToggle theme={theme} onToggle={toggleTheme} />}
        </div>
      </div>

      {/* Estado de carga inicial */}
      {!latestSnapshot ? (
        <div className="text-sm animate-pulse
          text-green-600 dark:text-green-700">
          Esperando datos del servidor...
        </div>
      ) : (
        <div className="space-y-6">

          {/* Métrica de CPU destacada */}
          <div className="border rounded p-6 font-mono
            border-green-200 bg-white dark:border-green-900 dark:bg-black">
            <p className="text-xs mb-3 uppercase tracking-widest
              text-green-600 dark:text-green-500">
              CPU
            </p>
            <div className="flex items-end gap-4">
              <p className="text-5xl font-bold
                text-green-600 dark:text-green-400">
                {latestSnapshot.cpu.usage_percent.toFixed(1)}
                <span className="text-2xl">%</span>
              </p>
              {latestSnapshot.cpu.frequency_mhz && (
                <p className="text-sm mb-2
                  text-green-500 dark:text-green-700">
                  {latestSnapshot.cpu.frequency_mhz.toFixed(0)} MHz
                </p>
              )}
            </div>
            <div className="w-full rounded h-2 mt-4
              bg-green-100 dark:bg-green-950">
              <div
                className="h-2 rounded transition-all duration-500
                  bg-green-500 dark:bg-green-400"
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
          <CpuChart data={chartHistory} isDark={theme === "dark"} />

          {/* Panel de alertas */}
          <AlertsPanel alerts={latestSnapshot.alerts} />

          {/* Footer con timestamp */}
          <p className="text-xs text-right
            text-green-300 dark:text-green-900">
            Última actualización: {new Date(latestSnapshot.recorded_at).toLocaleString("es-AR")}
          </p>

        </div>
      )}
    </main>
  );
}