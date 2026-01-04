"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const features = ["Age", "Income", "Score", "Tenure"];
const correlationData = [
  [1.0, 0.7, -0.2, -0.4],
  [0.7, 1.0, 0.5, 0.1],
  [-0.2, 0.5, 1.0, 0.6],
  [-0.4, 0.1, 0.6, 1.0],
];

export default function CorrelationHeatmap() {
  const getColor = (value: number) => {
    if (value === 1) return "bg-blue-600 dark:bg-blue-500";
    if (value > 0.5) return "bg-blue-400 dark:bg-blue-400";
    if (value > 0) return "bg-blue-200 dark:bg-blue-300";
    if (value === 0) return "bg-gray-100 dark:bg-gray-800";
    if (value > -0.5) return "bg-red-200 dark:bg-red-300";
    return "bg-red-400 dark:bg-red-400";
  };

  return (
    <div className="flex w-full max-w-md flex-col gap-4 rounded-lg border bg-card p-6 shadow-sm">
      <h3 className="text-lg font-semibold">Correlation Heatmap</h3>

      <div className="relative">
        {/* Matrix */}
        <div className="grid grid-cols-5 gap-1">
          {/* Header Row (Empty top-left, then labels) */}
          <div />
          {features.map((f) => (
            <div
              key={f}
              className="flex items-center justify-center text-xs font-medium text-muted-foreground"
            >
              {f}
            </div>
          ))}

          {/* Data Rows */}
          {features.map((rowFeature, rowIndex) => (
            <>
              {/* Row Label */}
              <div
                key={`param-${rowFeature}`}
                className="flex items-center justify-end pr-2 text-xs font-medium text-muted-foreground"
              >
                {rowFeature}
              </div>

              {/* Cells */}
              {correlationData[rowIndex].map((value, colIndex) => (
                <TooltipProvider key={`${rowIndex}-${colIndex}`}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className={`flex aspect-square items-center justify-center rounded-md text-xs font-medium transition-transform hover:scale-110 cursor-help ${getColor(value)} ${Math.abs(value) > 0.6 ? "text-white" : "text-slate-900"}`}
                      >
                        {value.toFixed(1)}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {features[rowIndex]} vs {features[colIndex]}:{" "}
                        <strong>{value}</strong>
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-2 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <div className="size-3 rounded bg-red-400"></div>Neg
        </div>
        <div className="flex items-center gap-1">
          <div className="size-3 rounded bg-gray-100"></div>None
        </div>
        <div className="flex items-center gap-1">
          <div className="size-3 rounded bg-blue-600"></div>Pos
        </div>
      </div>
    </div>
  );
}
