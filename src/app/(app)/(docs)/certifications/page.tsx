import type { Metadata } from "next";

import { StripedSeparator } from "@/components/striped-separator";
import { CertificationItem } from "@/features/portfolio/components/certifications/certification-item";
import { CERTIFICATIONS } from "@/features/portfolio/data/certifications";

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

      <StripedSeparator />

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

      <StripedSeparator />

      <div className="h-4" />
    </div>
  );
}
