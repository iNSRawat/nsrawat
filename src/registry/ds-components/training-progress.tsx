"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = Array.from({ length: 20 }, (_, i) => ({
  epoch: i * 5,
  loss: Math.max(0.1, 1 - Math.log(i + 1) * 0.3 + Math.random() * 0.05),
  accuracy: Math.min(0.98, 0.4 + Math.log(i + 1) * 0.18 + Math.random() * 0.02),
}));

export default function TrainingProgress() {
  return (
    <div className="flex h-[350px] w-full max-w-2xl flex-col gap-4 rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Training History</h3>
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="size-2 rounded-full bg-blue-500" />
            <span>Accuracy</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="size-2 rounded-full bg-red-500" />
            <span>Loss</span>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--border)"
            />
            <XAxis
              dataKey="epoch"
              stroke="var(--muted-foreground)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              label={{
                value: "Epoch",
                position: "insideBottom",
                offset: -5,
                fontSize: 10,
                fill: "var(--muted-foreground)",
              }}
            />
            <YAxis
              yAxisId="left"
              stroke="var(--muted-foreground)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              domain={[0, 1]}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="var(--muted-foreground)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--popover)",
                borderColor: "var(--border)",
                borderRadius: "8px",
              }}
              itemStyle={{ fontSize: "12px" }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="accuracy"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="loss"
              stroke="#ef4444"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
