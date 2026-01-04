"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { feature: "Income", importance: 0.35 },
  { feature: "Age", importance: 0.25 },
  { feature: "Education", importance: 0.15 },
  { feature: "Occupation", importance: 0.1 },
  { feature: "Marital", importance: 0.08 },
  { feature: "Children", importance: 0.05 },
];

export default function FeatureImportance() {
  return (
    <div className="flex h-[350px] w-full max-w-2xl flex-col gap-4 rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Feature Importance</h3>
      </div>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 0, right: 20, left: 40, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={false}
              stroke="var(--border)"
            />
            <XAxis
              type="number"
              domain={[0, 0.4]}
              stroke="var(--muted-foreground)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              dataKey="feature"
              type="category"
              stroke="var(--muted-foreground)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              width={80}
            />
            <Tooltip
              cursor={{ fill: "var(--accent)", opacity: 0.2 }}
              contentStyle={{
                backgroundColor: "var(--popover)",
                borderColor: "var(--border)",
                borderRadius: "8px",
              }}
              itemStyle={{ fontSize: "12px" }}
            />
            <Bar
              dataKey="importance"
              fill="#f59e0b"
              radius={[0, 4, 4, 0]}
              barSize={24}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
