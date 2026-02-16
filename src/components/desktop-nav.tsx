"use client";

import { usePathname } from "next/navigation";
import React from "react";

import { Nav } from "@/components/nav";
import type { NavItem } from "@/types/nav";

export function DesktopNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  const filteredItems = React.useMemo(
    () => items.filter((item) => item.href !== "/"),
    [items],
  );

  return (
    <Nav className="max-sm:hidden" items={filteredItems} activeId={pathname} />
  );
}
