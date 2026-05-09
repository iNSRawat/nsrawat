"use client";

import * as React from "react";

export function VisitorCount() {
  const [visitors, setVisitors] = React.useState<number | null>(null);

  React.useEffect(() => {
    fetch("/api/visitors")
      .then((res) => res.json())
      .then((resData) => {
        const data = resData as { success: boolean; visitors?: number };
        if (data.success && data.visitors) {
          setVisitors(data.visitors);
        }
      })
      .catch(() => {});
  }, []);

  if (visitors === null) return <span>You&apos;re the 35,479th visitor</span>;

  return (
    <span>
      You&apos;re the{" "}
      <span className="font-bold text-foreground">
        {visitors.toLocaleString()}th
      </span>{" "}
      visitor
    </span>
  );
}
