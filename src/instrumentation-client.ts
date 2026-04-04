// Lazy load PostHog to avoid blocking FCP/INP with ~200KB synchronous load
if (
  process.env.NODE_ENV === "production" &&
  process.env.NEXT_PUBLIC_POSTHOG_KEY
) {
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;
  const posthogUiHost = process.env.NEXT_PUBLIC_POSTHOG_UI_HOST;

  const initPostHog = () => {
    import("posthog-js").then(({ default: posthog }) => {
      posthog.init(posthogKey, {
        api_host: posthogHost,
        ui_host: posthogUiHost,
        defaults: "2025-05-24",
        cookieless_mode: "on_reject",
      });
      posthog.has_opted_out_capturing();
    });
  };

  // Defer loading until browser is idle
  if (typeof requestIdleCallback !== "undefined") {
    requestIdleCallback(initPostHog);
  } else {
    setTimeout(initPostHog, 3000);
  }
}
