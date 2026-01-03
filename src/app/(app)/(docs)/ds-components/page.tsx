import type { Metadata } from "next";

import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Data Science Components",
  description:
    "Interactive data science components showcasing visualizations, model metrics, and ML concepts.",
};

const DS_COMPONENTS = [
  {
    id: "confusion-matrix",
    title: "Confusion Matrix",
    description: "Visualize classification model performance",
    preview: (
      <div className="grid grid-cols-2 gap-1 font-mono text-xs">
        <div className="rounded bg-green-500/20 p-2 text-center">TP: 85</div>
        <div className="rounded bg-red-500/20 p-2 text-center">FP: 10</div>
        <div className="rounded bg-red-500/20 p-2 text-center">FN: 5</div>
        <div className="rounded bg-green-500/20 p-2 text-center">TN: 100</div>
      </div>
    ),
  },
  {
    id: "model-metrics",
    title: "Model Metrics Dashboard",
    description: "Display key ML model performance metrics",
    preview: (
      <div className="space-y-2 font-mono text-xs">
        <div className="flex justify-between">
          <span>Accuracy</span>
          <span className="text-green-500">94.5%</span>
        </div>
        <div className="flex justify-between">
          <span>Precision</span>
          <span className="text-blue-500">89.2%</span>
        </div>
        <div className="flex justify-between">
          <span>Recall</span>
          <span className="text-purple-500">91.7%</span>
        </div>
        <div className="flex justify-between">
          <span>F1 Score</span>
          <span className="text-orange-500">90.4%</span>
        </div>
      </div>
    ),
  },
  {
    id: "feature-importance",
    title: "Feature Importance Chart",
    description: "Visualize important features in ML models",
    preview: (
      <div className="space-y-1 font-mono text-xs">
        <div className="flex items-center gap-2">
          <div className="h-3 w-24 rounded bg-blue-500" />
          <span>age</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-20 rounded bg-blue-500/80" />
          <span>income</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-14 rounded bg-blue-500/60" />
          <span>score</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-10 rounded bg-blue-500/40" />
          <span>tenure</span>
        </div>
      </div>
    ),
  },
  {
    id: "training-progress",
    title: "Training Progress",
    description: "Show model training epochs and loss",
    preview: (
      <div className="font-mono text-xs">
        <div className="mb-2 flex justify-between text-muted-foreground">
          <span>Epoch 50/100</span>
          <span>Loss: 0.023</span>
        </div>
        <div className="h-2 overflow-hidden rounded bg-muted">
          <div className="h-full w-1/2 rounded bg-gradient-to-r from-blue-500 to-green-500" />
        </div>
      </div>
    ),
  },
  {
    id: "data-distribution",
    title: "Data Distribution",
    description: "Histogram-style data distribution view",
    preview: (
      <div className="flex h-16 items-end gap-1">
        {[20, 35, 60, 80, 95, 75, 50, 30, 15].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t bg-gradient-to-t from-blue-600 to-blue-400"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    ),
  },
  {
    id: "correlation-heatmap",
    title: "Correlation Heatmap",
    description: "Feature correlation visualization",
    preview: (
      <div className="grid grid-cols-4 gap-0.5 font-mono text-[8px]">
        <div className="rounded bg-red-500 p-1 text-center text-white">1.0</div>
        <div className="rounded bg-red-300 p-1 text-center">0.7</div>
        <div className="rounded bg-blue-200 p-1 text-center">-0.2</div>
        <div className="rounded bg-blue-300 p-1 text-center">-0.4</div>
        <div className="rounded bg-red-300 p-1 text-center">0.7</div>
        <div className="rounded bg-red-500 p-1 text-center text-white">1.0</div>
        <div className="rounded bg-red-200 p-1 text-center">0.5</div>
        <div className="rounded bg-gray-200 p-1 text-center">0.1</div>
        <div className="rounded bg-blue-200 p-1 text-center">-0.2</div>
        <div className="rounded bg-red-200 p-1 text-center">0.5</div>
        <div className="rounded bg-red-500 p-1 text-center text-white">1.0</div>
        <div className="rounded bg-red-300 p-1 text-center">0.6</div>
        <div className="rounded bg-blue-300 p-1 text-center">-0.4</div>
        <div className="rounded bg-gray-200 p-1 text-center">0.1</div>
        <div className="rounded bg-red-300 p-1 text-center">0.6</div>
        <div className="rounded bg-red-500 p-1 text-center text-white">1.0</div>
      </div>
    ),
  },
];

export default function DSComponentsPage() {
  return (
    <div className="min-h-svh">
      <div className="screen-line-after px-4">
        <h1 className="text-3xl font-semibold">Data Science Components</h1>
      </div>

      <div className="p-4">
        <p className="font-mono text-sm text-balance text-muted-foreground">
          {metadata.description}
        </p>
      </div>

      <Separator />

      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
        {DS_COMPONENTS.map((component) => (
          <div
            key={component.id}
            className="overflow-hidden rounded-lg border border-edge transition-colors hover:border-muted-foreground/30"
          >
            <div className="border-b border-edge bg-accent/30 p-4">
              <h2 className="font-semibold">{component.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {component.description}
              </p>
            </div>
            <div className="bg-background p-4">{component.preview}</div>
          </div>
        ))}
      </div>

      <Separator />

      <div className="p-4">
        <h2 className="mb-4 text-xl font-semibold">Usage Example</h2>
        <pre className="overflow-x-auto rounded-lg bg-zinc-950 p-4 text-sm text-zinc-100">
          {`# Using sklearn for model evaluation
from sklearn.metrics import confusion_matrix, classification_report

# Generate predictions
y_pred = model.predict(X_test)

# Confusion Matrix
cm = confusion_matrix(y_test, y_pred)
print(cm)

# Full metrics report
print(classification_report(y_test, y_pred))`}
        </pre>
      </div>

      <div className="h-4" />
    </div>
  );
}

function Separator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-8 w-full",
        "before:absolute before:-left-[100vw] before:-z-1 before:h-8 before:w-[200vw]",
        "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56",
        className
      )}
    />
  );
}
