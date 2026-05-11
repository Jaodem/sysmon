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
}

export function CpuChart({ data }: CpuChartProps) {
  return (
    <div className="border border-green-900 bg-black p-4 rounded font-mono">
      <p className="text-green-500 text-xs mb-4 uppercase tracking-widest">
        Historial — CPU & RAM (últimos 30 puntos)
      </p>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#052e16" />
          <XAxis
            dataKey="time"
            tick={{ fill: "#166534", fontSize: 10 }}
            interval="preserveStartEnd"
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: "#166534", fontSize: 10 }}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#000", border: "1px solid #166534" }}
            labelStyle={{ color: "#4ade80" }}
            itemStyle={{ color: "#4ade80" }}
          />
          <Legend wrapperStyle={{ color: "#4ade80", fontSize: 12 }} />
          <Line
            type="monotone"
            dataKey="cpu"
            name="CPU"
            stroke="#4ade80"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="memory"
            name="RAM"
            stroke="#22d3ee"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}