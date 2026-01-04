import type { Registry } from "shadcn/schema";

export const components: Registry["items"] = [
  {
    name: "confusion-matrix",
    type: "registry:component",
    title: "Confusion Matrix",
    author: "N S Rawat",
    description:
      "Interactive confusion matrix to visualize classifier performance.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "src/registry/ds-components/confusion-matrix.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "model-metrics",
    type: "registry:component",
    title: "Model Metrics",
    author: "N S Rawat",
    description:
      "Visual dashboard for key machine learning performance metrics.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "src/registry/ds-components/model-metrics.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "training-progress",
    type: "registry:component",
    title: "Training Progress",
    author: "N S Rawat",
    description:
      "Line chart visualization of model training loss and accuracy over epochs.",
    dependencies: ["recharts"],
    files: [
      {
        path: "src/registry/ds-components/training-progress.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "roc-curve",
    type: "registry:component",
    title: "ROC Curve",
    author: "N S Rawat",
    description:
      "Receiver Operating Characteristic (ROC) curve with Area Under Curve (AUC) metric.",
    dependencies: ["recharts"],
    files: [
      {
        path: "src/registry/ds-components/roc-curve.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "feature-importance",
    type: "registry:component",
    title: "Feature Importance",
    author: "N S Rawat",
    description:
      "Horizontal bar chart showing the relative importance of model features.",
    dependencies: ["recharts"],
    files: [
      {
        path: "src/registry/ds-components/feature-importance.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "data-distribution",
    type: "registry:component",
    title: "Data Distribution",
    author: "N S Rawat",
    description:
      "Histogram visualization showing the frequency distribution of data points.",
    dependencies: ["recharts"],
    files: [
      {
        path: "src/registry/ds-components/data-distribution.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "correlation-heatmap",
    type: "registry:component",
    title: "Correlation Heatmap",
    author: "N S Rawat",
    description:
      "Grid-based heat map visualizing correlation coefficients between features.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "src/registry/ds-components/correlation-heatmap.tsx",
        type: "registry:component",
      },
    ],
  },
];
