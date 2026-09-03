"use client";

import { useRouter } from "next/navigation";

import { CliInterface } from "@/components/cli-interface";
import { LaniakeaBackground } from "@/components/laniakea-background";

export default function CliPage() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-50">
      <LaniakeaBackground className="z-0" />
      <CliInterface onGuiCommand={() => router.push("/")} />
    </div>
  );
}
