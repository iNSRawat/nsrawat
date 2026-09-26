"use client";

import { useScroll } from "motion/react";
import { useEffect, useState } from "react";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";

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
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={handleSearchClick}
      className="sm:hidden size-8 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground shrink-0 cursor-pointer select-none"
      title="Search"
      aria-label="Search"
    >
      <Icons.search className="size-4 shrink-0" aria-hidden />
    </Button>
  );
}
