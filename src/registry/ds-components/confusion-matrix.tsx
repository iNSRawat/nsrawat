"use client";

interface ConfusionMatrixProps {
  data?: {
    tp: number;
    tn: number;
    fp: number;
    fn: number;
  };
  labels?: [string, string];
}

export default function ConfusionMatrix({
  data = { tp: 85, tn: 100, fp: 10, fn: 5 },
  labels = ["Positive", "Negative"],
}: ConfusionMatrixProps) {
  const total = data.tp + data.tn + data.fp + data.fn;

  const getIntensity = (value: number) => {
    return Math.max(0.1, value / total);
  };

  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border bg-card p-6 shadow-sm">
      <h3 className="text-lg font-semibold">Confusion Matrix</h3>
      <div className="flex">
        {/* Y-axis Label */}
        <div className="flex items-center justify-center pr-4">
          <span className="-rotate-90 text-sm font-medium text-muted-foreground">
            Actual Class
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {/* X-axis Label */}
          <div className="flex justify-center pb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Predicted Class
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {/* Header Row */}
            <div className="text-center text-xs font-medium text-muted-foreground">
              {labels[0]}
            </div>
            <div className="text-center text-xs font-medium text-muted-foreground">
              {labels[1]}
            </div>

            {/* Row 1 */}
            <div
              className="relative flex h-24 w-24 flex-col items-center justify-center rounded-md border transition-all hover:scale-105"
              style={{
                backgroundColor: `rgba(34, 197, 94, ${getIntensity(data.tp)})`,
              }}
            >
              <span className="text-2xl font-bold">{data.tp}</span>
              <span className="text-xs text-muted-foreground/80">
                True Positive
              </span>
            </div>

            <div
              className="relative flex h-24 w-24 flex-col items-center justify-center rounded-md border transition-all hover:scale-105"
              style={{
                backgroundColor: `rgba(239, 68, 68, ${getIntensity(data.fp)})`,
              }}
            >
              <span className="text-2xl font-bold">{data.fp}</span>
              <span className="text-xs text-muted-foreground/80">
                False Positive
              </span>
            </div>

            {/* Row 2 */}
            <div
              className="relative flex h-24 w-24 flex-col items-center justify-center rounded-md border transition-all hover:scale-105"
              style={{
                backgroundColor: `rgba(239, 68, 68, ${getIntensity(data.fn)})`,
              }}
            >
              <span className="text-2xl font-bold">{data.fn}</span>
              <span className="text-xs text-muted-foreground/80">
                False Negative
              </span>
            </div>

            <div
              className="relative flex h-24 w-24 flex-col items-center justify-center rounded-md border transition-all hover:scale-105"
              style={{
                backgroundColor: `rgba(34, 197, 94, ${getIntensity(data.tn)})`,
              }}
            >
              <span className="text-2xl font-bold">{data.tn}</span>
              <span className="text-xs text-muted-foreground/80">
                True Negative
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
