"use client";

import { useScroll } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { NSRMark } from "./nsr-mark";

const calcDistance = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect();
  const scrollTop = document.documentElement.scrollTop;
  const headerHeight = 56;
  return scrollTop + rect.top + rect.height - headerHeight;
};

function MarkContainer({
  children,
  className,
  showPlaceholder = true,
}: {
  children: React.ReactNode;
  className?: string;
  showPlaceholder?: boolean;
}) {
  return (
    <div
      className={cn(
        "group/mark-motion relative flex h-8 w-16 items-center justify-center p-1",
        "before:absolute before:inset-0 before:rounded-md before:ring-1 before:ring-inset before:ring-border",
        "before:bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)]",
        "before:bg-[length:6px_6px]",
        "before:transition-opacity before:duration-500",
        showPlaceholder ? "before:opacity-100" : "before:opacity-0",
        "[--pattern-fg:hsl(var(--border)/0.56)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

function NSRMarkMotion() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  const distanceRef = useRef(160);

  useEffect(() => {
    return scrollY.on("change", (latestValue) => {
      setVisible(latestValue >= distanceRef.current);
    });
  }, [scrollY]);

  useEffect(() => {
    const coverMark = document.getElementById("js-cover-mark");
    if (!coverMark) return;

    distanceRef.current = calcDistance(coverMark);

    const resizeObserver = new ResizeObserver(() => {
      distanceRef.current = calcDistance(coverMark);
    });
    resizeObserver.observe(coverMark);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <MarkContainer showPlaceholder={!visible}>
      <NSRMark
        data-visible={visible}
        className="relative z-10 h-full w-full translate-y-2 opacity-0 transition-[opacity,translate] duration-300 data-[visible=true]:translate-y-0 data-[visible=true]:opacity-100"
      />
    </MarkContainer>
  );
}

export function SiteHeaderMark() {
  const pathname = usePathname();
  const isHome = ["/", "/index"].includes(pathname);
  return isHome ? (
    <NSRMarkMotion />
  ) : (
    <MarkContainer showPlaceholder={false}>
      <NSRMark className="relative z-10 h-full w-full" />
    </MarkContainer>
  );
}
