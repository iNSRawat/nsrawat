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
  { range: "0-10", count: 20 },
  { range: "11-20", count: 35 },
  { range: "21-30", count: 60 },
  { range: "31-40", count: 80 },
  { range: "41-50", count: 95 },
  { range: "51-60", count: 75 },
  { range: "61-70", count: 50 },
  { range: "71-80", count: 30 },
  { range: "81-90", count: 15 },
  { range: "91-100", count: 5 },
];

export default function DataDistribution() {
  return (
    <div className="flex h-[350px] w-full max-w-2xl flex-col gap-4 rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Data Distribution</h3>
      </div>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--border)"
            />
            <XAxis
              dataKey="range"
              stroke="var(--muted-foreground)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="var(--muted-foreground)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
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
            <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
