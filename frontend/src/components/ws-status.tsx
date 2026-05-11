// Indicador visual del estado de la conexión WebSocket
"use client";

interface WsStatusProps {
  status: "connecting" | "connected" | "disconnected" | "error";
}

// Se mapea cada estado a un color y texto descriptivo
const STATUS_CONFIG = {
  connecting: { color: "text-yellow-400", dot: "bg-yellow-400", label: "Conectando..." },
  connected: { color: "text-green-400", dot: "bg-green-400", label: "Conectado" },
  disconnected: { color: "text-gray-400", dot: "bg-gray-400", label: "Desconectado" },
  error: { color: "text-red-400", dot: "bg-red-400", label: "Error de conexión" },
};

export function WsStatus({ status }: WsStatusProps) {
  const config = STATUS_CONFIG[status];

  return (
    <div className={`flex items-center gap-2 text-sm font-mono ${config.color}`}>
      <div className={`w-2 h-2 rounded-full ${config.dot} animate-pulse`} />
      <span>{config.label}</span>
    </div>
  );
}