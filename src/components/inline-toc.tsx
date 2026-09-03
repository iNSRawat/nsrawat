import type { TOCItemType } from "fumadocs-core/toc";
import { TextIcon } from "lucide-react";

import type { Collapsible } from "@/components/ui/collapsible";
import {
  CollapsibleChevronsIcon,
  CollapsibleContent,
  CollapsibleTrigger,
  CollapsibleWithContext,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

export function SidebarTOC({ items }: { items: TOCItemType[] }) {
  if (!items.length) {
    return null;
  }

  return (
    <nav
      aria-label="Table of contents"
      className="max-h-[calc(100vh-7rem)] overflow-y-auto border border-edge bg-background/80 font-mono shadow-sm backdrop-blur-sm"
    >
      <div className="flex items-center gap-2 border-b border-edge px-3 py-2 text-[11px] font-medium tracking-widest text-muted-foreground uppercase">
        <TextIcon className="size-3.5" />
        On this page
      </div>
      <ul className="space-y-0.5 p-1.5 text-xs text-muted-foreground">
        {items.map((item) => (
          <li
            key={item.url}
            style={{ paddingInlineStart: 12 * Math.max(item.depth - 2, 0) }}
          >
            <a
              className="group flex items-center gap-1.5 rounded-sm px-2 py-1.5 transition-colors hover:bg-muted/60 hover:text-foreground"
              href={item.url}
            >
              <span className="text-muted-foreground/50 transition-colors group-hover:text-foreground">
                #
              </span>
              <span className="truncate">{item.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function InlineTOC({
  items,
  className,
  children,
  ...props
}: React.ComponentProps<typeof Collapsible> & {
  items: TOCItemType[];
}) {
  if (!items.length) {
    return null;
  }

  return (
    <CollapsibleWithContext
      className={cn("not-prose rounded-xl bg-code font-sans", className)}
      {...props}
    >
      <CollapsibleTrigger className="group/toc inline-flex w-full items-center gap-2 py-2.5 pr-2 pl-4 text-sm font-medium [&_svg]:size-4">
        <TextIcon className="-translate-x-0.5" />
        {children ?? "On this page"}
        <div className="ml-auto shrink-0 text-muted-foreground" aria-hidden>
          <CollapsibleChevronsIcon />
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent className="overflow-hidden duration-300 data-[state=closed]:animate-collapsible-fade-up data-[state=open]:animate-collapsible-fade-down">
        <ul className="flex flex-col px-4 pb-2 text-sm text-muted-foreground">
          {items.map((item) => (
            <li
              key={item.url}
              className="flex py-1"
              style={{
                paddingInlineStart: 16 * Math.max(item.depth - 2, 0),
              }}
            >
              <a
                className="underline-offset-4 transition-colors hover:text-accent-foreground hover:underline"
                href={item.url}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </CollapsibleWithContext>
  );
}
