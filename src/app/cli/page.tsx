"use client";

import { useRouter } from "next/navigation";

import { CliInterface } from "@/components/cli-interface";

export default function CliPage() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-50">
      <CliInterface onGuiCommand={() => router.push("/")} />
    </div>
  );
}
