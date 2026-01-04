"use client";

export default function ModelMetrics() {
  const metrics = [
    { label: "Accuracy", value: 0.945, color: "bg-green-500" },
    { label: "Precision", value: 0.892, color: "bg-blue-500" },
    { label: "Recall", value: 0.917, color: "bg-purple-500" },
    { label: "F1 Score", value: 0.904, color: "bg-orange-500" },
  ];

  return (
    <div className="w-full max-w-md space-y-6 rounded-lg border bg-card p-6 shadow-sm">
      <h3 className="text-lg font-semibold">Model Performance</h3>
      <div className="space-y-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-muted-foreground">
                {metric.label}
              </span>
              <span className="font-mono font-bold">
                {(metric.value * 100).toFixed(1)}%
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className={`h-full rounded-full transition-all duration-1000 ease-out ${metric.color}`}
                style={{ width: `${metric.value * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
