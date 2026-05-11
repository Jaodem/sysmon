// Hook para gestionar la conexión WebSocket con el backend y expone las métricas
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { MetricSnapshot, ChartDataPoint } from "@/types/metrics";

// Máximo de puntos históricos a mantener en memoria para los gráficos
const MAX_HISTORY_POINTS = 30;

type ConnectionStatus = "connecting" | "connected" | "disconnected" | "error";

interface UseMetricsReturn {
  latestSnapshot: MetricSnapshot | null;
  chartHistory: ChartDataPoint[];
  connectionStatus: ConnectionStatus;
  reconnect: () => void;
}

export function useMetrics(url: string): UseMetricsReturn {
  const [latestSnapshot, setLatestSnapshot] = useState<MetricSnapshot | null>(null);
  const [chartHistory, setChartHistory] = useState<ChartDataPoint[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("connecting");
  const wsRef = useRef<WebSocket | null>(null);

  // useRef para las funciones de callback — evita dependencias circulares
  const onOpenRef = useRef(() => setConnectionStatus("connected"));
  const onErrorRef = useRef(() => setConnectionStatus("error"));
  const onCloseRef = useRef(() => setConnectionStatus("disconnected"));
  const onMessageRef = useRef((event: MessageEvent) => {
    const snapshot: MetricSnapshot = JSON.parse(event.data);
    setLatestSnapshot(snapshot);
    setChartHistory((prev) => {
      const newPoint: ChartDataPoint = {
        time: new Date(snapshot.recorded_at).toLocaleTimeString("es-AR"),
        cpu: snapshot.cpu.usage_percent,
        memory: snapshot.memory.usage_percent,
      };
      return [...prev, newPoint].slice(-MAX_HISTORY_POINTS);
    });
  });

  useEffect(() => {
    // Se cierra cualquier conexión anterior antes de abrir una nueva
    wsRef.current?.close();

    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = onOpenRef.current;
    ws.onmessage = onMessageRef.current;
    ws.onerror = onErrorRef.current;
    ws.onclose = onCloseRef.current;

    // Limpieza — cuando el componente se desmonta, se cierra la conexión
    return () => {
      ws.close();
    };
  }, [url]);

  const reconnect = useCallback(() => {
    setConnectionStatus("connecting");
    wsRef.current?.close();

    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = onOpenRef.current;
    ws.onmessage = onMessageRef.current;
    ws.onerror = onErrorRef.current;
    ws.onclose = onCloseRef.current;
  }, [url]);

  return {
    latestSnapshot,
    chartHistory,
    connectionStatus,
    reconnect,
  };
}