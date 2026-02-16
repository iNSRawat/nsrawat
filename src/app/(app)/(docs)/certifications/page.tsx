import type { Metadata } from "next";

import { CertificationItem } from "@/features/portfolio/components/certifications/certification-item";
import { CERTIFICATIONS } from "@/features/portfolio/data/certifications";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Certifications",
  description:
    "Professional certifications and credentials earned by N S Rawat in Data Science, Machine Learning, and Analytics.",
};

export default function CertificationsPage() {
  return (
    <div className="min-h-svh">
      <div className="screen-line-after px-2 sm:px-4">
        <h1 className="text-2xl font-semibold sm:text-3xl">Certifications</h1>
      </div>

      <div className="p-2 sm:p-4">
        <p className="font-mono text-sm text-balance text-muted-foreground">
          {metadata.description as string}
        </p>
      </div>

      <Separator />

      <div className="p-2 sm:p-4">
        <div className="grid gap-3 sm:gap-4">
          {CERTIFICATIONS.map((cert) => (
            <CertificationItem
              key={cert.credentialID || cert.title}
              certification={cert}
              className="rounded-lg border border-edge bg-card p-2"
            />
          ))}
        </div>
      </div>

      <Separator />

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
        className,
      )}
    />
  );
}
