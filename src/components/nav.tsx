import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types/nav";

export function Nav({
  items,
  activeId,
  className,
}: {
  items: NavItem[];
  activeId?: string;
  className?: string;
}) {
  return (
    <nav
      data-active-id={activeId}
      className={cn("flex items-center gap-4", className)}
    >
      {items.map((item) => {
        if (item.items) {
          const active = item.items.some(
            (subItem) =>
              activeId === subItem.href || activeId?.startsWith(subItem.href),
          );

          return (
            <DropdownMenu key={item.href}>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "group flex items-center gap-1 font-mono text-sm font-medium text-muted-foreground outline-hidden transition-[color] duration-300 hover:text-foreground cursor-pointer select-none",
                    active && "text-foreground",
                  )}
                >
                  {item.title}
                  <ChevronDownIcon className="size-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-36 font-mono p-1">
                {item.items.map((subItem) => (
                  <DropdownMenuItem key={subItem.href} asChild>
                    <Link
                      href={subItem.href}
                      className="flex items-center gap-2 w-full font-mono text-sm"
                    >
                      <span>{subItem.title}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        }

        const active =
          activeId === item.href ||
          (item.href === "/" // Home page
            ? ["/", "/index"].includes(activeId || "")
            : activeId?.startsWith(item.href));

        return (
          <NavItem key={item.href} href={item.href} active={active}>
            {item.title}
          </NavItem>
        );
      })}
    </nav>
  );
}

export function NavItem({
  active,
  ...props
}: React.ComponentProps<typeof Link> & {
  active?: boolean;
}) {
  return (
    <Link
      className={cn(
        "font-mono text-sm font-medium text-muted-foreground transition-[color] duration-300",
        active && "text-foreground",
      )}
      {...props}
    />
  );
}
