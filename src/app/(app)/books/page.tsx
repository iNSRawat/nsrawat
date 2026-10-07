import type { Metadata } from "next";

import { ArrowIcon } from "@/features/books/components/arrow-icon";
import { BooksWall } from "@/features/books/components/books-shelf";
import { BOOKS } from "@/features/books/data/books";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Books I’ve read",
  description:
    "What I’ve read, what I’m reading and what’s next, kept with the thoughts that stayed with me.",
  openGraph: {
    title: "Books I’ve read · N S Rawat",
    description: "A shelf of finished books and the notes that stayed with me.",
  },
};

export default function BooksPage() {
  return (
    <div className="mx-auto min-h-svh border-x border-edge md:max-w-4xl">
      {/* Decorative patterned top bar */}
      <div
        className={cn(
          "h-8 px-2",
          "screen-line-after",
          "before:absolute before:-left-[100vw] before:-z-1 before:h-full before:w-[200vw]",
          "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56",
        )}
      />

      {/* Header matching whole website style (like ds-resources, notes, blog) */}
      <div className="screen-line-after px-2 sm:px-4">
        <h1 className="text-2xl font-semibold sm:text-3xl">Books I’ve read.</h1>
      </div>

      <div className="p-2 sm:p-4">
        <p className="font-mono text-sm text-balance text-muted-foreground">
          What I’ve read, what I’m reading and what’s next, kept with the
          thoughts that stayed with me.
        </p>
        <p className="mt-2 font-mono text-sm text-muted-foreground">
          Inspired by{" "}
          <a
            href="https://grokipedia.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
          >
            grokipedia.com
            <ArrowIcon size={13} strokeWidth={1.5} />
          </a>
        </p>
      </div>

      <div className="screen-line-after px-2 pt-2 sm:px-4">
        <h2 className="text-base font-semibold sm:text-lg">On my shelves</h2>
      </div>

      <div className="p-2 sm:p-4 md:p-6">
        <BooksWall books={BOOKS} />
      </div>

      <div className="h-12" />
    </div>
  );
}
