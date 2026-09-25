"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import { CliInterface } from "@/components/cli-interface";

const HolographicBackground = dynamic(
  () =>
    import("@/components/holographic-background").then(
      (mod) => mod.HolographicBackground || mod.default,
    ),
  { ssr: false },
);

export default function CliPage() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-50">
      <HolographicBackground className="z-0" variant="cli" />
      <CliInterface onGuiCommand={() => router.push("/")} />
    </div>
  );
}
