import dynamic from "next/dynamic";

export const demos = {
  // DS Components - These are the user's requested components
  "confusion-matrix-demo": dynamic(() =>
    import("./ds-components/confusion-matrix").then((mod) => mod.default),
  ),
  "model-metrics-demo": dynamic(() =>
    import("./ds-components/model-metrics").then((mod) => mod.default),
  ),
  "training-progress-demo": dynamic(() =>
    import("./ds-components/training-progress").then((mod) => mod.default),
  ),
  "roc-curve-demo": dynamic(() =>
    import("./ds-components/roc-curve").then((mod) => mod.default),
  ),
  "feature-importance-demo": dynamic(() =>
    import("./ds-components/feature-importance").then((mod) => mod.default),
  ),
  "data-distribution-demo": dynamic(() =>
    import("./ds-components/data-distribution").then((mod) => mod.default),
  ),
  "correlation-heatmap-demo": dynamic(() =>
    import("./ds-components/correlation-heatmap").then((mod) => mod.default),
  ),

  // Theme Switcher - utility
  "theme-switcher-demo": dynamic(() =>
    import("@/registry/examples/theme-switcher-demo").then(
      (mod) => mod.default,
    ),
  ),
};
