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

export interface MetricSnapshot {
  id: number;
  recorded_at: string;
  cpu: CpuMetrics;
  memory: MemoryMetrics;
  disk: DiskMetrics;
}

// Tipo para cada punto del historial en los gráficos
export interface ChartDataPoint {
  time: string;
  cpu: number;
  memory: number;
}