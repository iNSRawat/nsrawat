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

      <div className="p-4 sm:p-8 md:p-10">
        <article className="article-content books-read-article">
          <header className="mb-6">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Books I’ve read.
            </h1>
          </header>

          <section className="entry-section">
            <div className="books-prose space-y-3">
              <p className="reader-lede">
                What I’ve read, what I’m reading and what’s next, kept with the
                thoughts that stayed with me.
              </p>
              <p>
                Inspired by{" "}
                <a
                  href="https://grokipedia.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium inline-flex items-center gap-1"
                >
                  grokipedia.com
                  <ArrowIcon size={14} strokeWidth={1.5} />
                </a>
              </p>
            </div>
          </section>

          <section
            className="entry-section mt-10"
            aria-labelledby="finished-books-heading"
          >
            <h2 className="section-title" id="finished-books-heading">
              On my shelves
            </h2>
            <BooksWall books={BOOKS} />
          </section>
        </article>
      </div>

      <div className="h-12" />
    </div>
  );
}
