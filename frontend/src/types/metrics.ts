// Tipos que representan la estructura de datos que envía el backend por WebSocket

export interface CpuMetrics {
  usage_percent: number;
  frequency_mhz: number | null;
}

export interface MemoryMetrics {
  total_mb: number;
  used_mb: number;
  usage_percent: number;
}

export interface DiskMetrics {
  total_gb: number;
  used_gb: number;
  usage_percent: number;
}

export interface AlertEvent {
  metric: "cpu" | "memory" | "disk";
  value: number;
  threshold: number;
  message: string;
}

export interface MetricSnapshot {
  id: number;
  recorded_at: string;
  cpu: CpuMetrics;
  memory: MemoryMetrics;
  disk: DiskMetrics;
  alerts: AlertEvent[];
}

// Tipo para cada punto del historial en los gráficos
export interface ChartDataPoint {
  time: string;
  cpu: number;
  memory: number;
}