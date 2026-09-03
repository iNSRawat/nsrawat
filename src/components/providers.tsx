"use client";

import { AppProgressProvider } from "@bprogress/next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Provider as JotaiProvider } from "jotai";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "next-themes";

import { Toaster } from "./ui/sonner";

const SoundProvider = dynamic(
  () => import("./sound-provider").then((mod) => mod.SoundProvider),
  { ssr: false },
);

const LaniakeaBackground = dynamic(
  () => import("./laniakea-background").then((mod) => mod.LaniakeaBackground),
  { ssr: false },
);

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <JotaiProvider>
      <ThemeProvider
        enableSystem
        disableTransitionOnChange
        enableColorScheme
        storageKey="theme"
        defaultTheme="system"
        attribute="class"
      >
        {pathname !== "/cli" && <LaniakeaBackground />}
        <SoundProvider>
          <AppProgressProvider
            color="var(--foreground)"
            height="2px"
            delay={500}
            options={{ showSpinner: false }}
          >
            {children}
          </AppProgressProvider>
        </SoundProvider>

        <Toaster position="top-center" />
        <Analytics />
        <SpeedInsights />
      </ThemeProvider>
    </JotaiProvider>
  );
}
