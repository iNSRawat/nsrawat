"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { fpr: 0, tpr: 0 },
  { fpr: 0.05, tpr: 0.4 },
  { fpr: 0.1, tpr: 0.6 },
  { fpr: 0.2, tpr: 0.8 },
  { fpr: 0.3, tpr: 0.88 },
  { fpr: 0.4, tpr: 0.92 },
  { fpr: 0.5, tpr: 0.95 },
  { fpr: 0.6, tpr: 0.97 },
  { fpr: 0.7, tpr: 0.98 },
  { fpr: 0.8, tpr: 0.99 },
  { fpr: 0.9, tpr: 0.995 },
  { fpr: 1, tpr: 1 },
];

export default function ROCCurve() {
  return (
    <div className="flex h-[350px] w-full max-w-2xl flex-col gap-4 rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">ROC Curve</h3>
        <div className="text-sm text-muted-foreground">AUC: 0.92</div>
      </div>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--border)"
            />
            <XAxis
              dataKey="fpr"
              type="number"
              domain={[0, 1]}
              tickFormatter={(value) => value.toFixed(1)}
              stroke="var(--muted-foreground)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              label={{
                value: "False Positive Rate",
                position: "insideBottom",
                offset: -5,
                fontSize: 10,
                fill: "var(--muted-foreground)",
              }}
            />
            <YAxis
              type="number"
              domain={[0, 1]}
              tickFormatter={(value) => value.toFixed(1)}
              stroke="var(--muted-foreground)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              label={{
                value: "True Positive Rate",
                position: "insideLeft",
                angle: -90,
                offset: 10,
                fontSize: 10,
                fill: "var(--muted-foreground)",
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--popover)",
                borderColor: "var(--border)",
                borderRadius: "8px",
              }}
              itemStyle={{ fontSize: "12px" }}
              formatter={(value: number) =>
                typeof value === "number" ? value.toFixed(3) : "0"
              }
            />
            <ReferenceLine
              segment={[
                { x: 0, y: 0 },
                { x: 1, y: 1 },
              ]}
              stroke="var(--muted-foreground)"
              strokeDasharray="3 3"
            />
            <Area
              type="monotone"
              dataKey="tpr"
              stroke="#8b5cf6"
              fill="#8b5cf6"
              fillOpacity={0.2}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
