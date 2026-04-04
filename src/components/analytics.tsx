import Script from "next/script";

export function Analytics() {
  const websiteId = process.env.UMAMI_WEBSITE_ID;

  if (!websiteId) {
    return null;
  }

  return (
    <Script
      defer
      src="https://analytics.nsrawat.in/script.js"
      data-website-id={websiteId}
      strategy="afterInteractive"
    />
  );
}
