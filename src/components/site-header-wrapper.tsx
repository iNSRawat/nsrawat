"use client";

import { useScroll } from "motion/react";
import { useEffect, useState } from "react";

import { Icons } from "@/components/icons";

export function SiteHeaderWrapper(props: React.ComponentProps<"header">) {
  const { scrollY } = useScroll();

  const [affix, setAffix] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latestValue) => {
      setAffix(latestValue >= 8);
    });
  }, [scrollY]);

  return <header data-affix={affix} {...props} />;
}

export function MobileSearchTrigger() {
  const handleSearchClick = () => {
    // Dispatch Ctrl+K / Cmd+K to open the command menu
    const event = new KeyboardEvent("keydown", {
      key: "k",
      code: "KeyK",
      ctrlKey: true,
      bubbles: true,
    });
    document.dispatchEvent(event);
  };

  return (
    <button
      type="button"
      onClick={handleSearchClick}
      className="mr-2 sm:hidden flex h-7 gap-1.5 items-center rounded-full border border-input bg-white px-2.5 text-muted-foreground shadow-xs select-none hover:bg-white dark:bg-input/30 dark:hover:bg-input/30 cursor-pointer"
      title="Search"
      aria-label="Search"
    >
      <Icons.search className="size-3.5" aria-hidden />
      <span className="font-sans text-[10px] font-medium">Search</span>
    </button>
  );
}
