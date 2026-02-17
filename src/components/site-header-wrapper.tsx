"use client";

import { useScroll } from "motion/react";
import { useEffect, useState } from "react";

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
