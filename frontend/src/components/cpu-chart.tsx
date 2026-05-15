// Gráfico de línea con el historial de uso de CPU y RAM
"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { ChartDataPoint } from "@/types/metrics";

interface CpuChartProps {
  data: ChartDataPoint[];
  isDark: boolean;
}

export function CpuChart({ data, isDark }: CpuChartProps) {
  const gridColor = isDark ? "#052e16" : "#dcfce7";
  const tickColor = isDark ? "#166534" : "#4b7a5a";
  const tooltipBg = isDark ? "#000" : "#fff";
  const tooltipBorder = isDark ? "#166534" : "#86efac";
  const tooltipLabel = isDark ? "#4ade80" : "#16a34a";
  
  return (
    <div className="border rounded p-4 font-mono
      border-green-200 bg-white dark:border-green-900 dark:bg-black">
      <p className="text-xs mb-4 uppercase tracking-widest
        text-green-600 dark:text-green-500">
        Historial — CPU & RAM (últimos 30 puntos)
      </p>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis
            dataKey="time"
            tick={{ fill: tickColor, fontSize: 10 }}
            interval="preserveStartEnd"
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: tickColor, fontSize: 10 }}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip
            contentStyle={{ backgroundColor: tooltipBg, border: `1px solid ${tooltipBorder}` }}
            labelStyle={{ color: tooltipLabel }}
            itemStyle={{ color: tooltipLabel }}
          />
          <Legend wrapperStyle={{ color: tooltipLabel, fontSize: 12 }} />
          <Line type="monotone" dataKey="cpu" name="CPU"
            stroke="#4ade80" strokeWidth={2} dot={false} isAnimationActive={false} />
          <Line type="monotone" dataKey="memory" name="RAM"
            stroke="#22d3ee" strokeWidth={2} dot={false} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}