import type { Metadata } from "next";

import { TESTIMONIALS } from "@/features/portfolio/data/testimonials";
import { cn } from "@/lib/utils";
import {
  Testimonial,
  TestimonialAuthor,
  TestimonialAuthorName,
  TestimonialAuthorTagline,
  TestimonialAvatar,
  TestimonialAvatarImg,
  TestimonialAvatarRing,
  TestimonialQuote,
} from "@/registry/testimonials-marquee";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Kind words from people who have seen my work and portfolio.",
};

export default function TestimonialsPage() {
  return (
    <div className="min-h-svh">
      <div className="screen-line-after px-2 sm:px-4">
        <h1 className="text-2xl font-semibold sm:text-3xl">Loved by People</h1>
      </div>

      <div className="p-2 sm:p-4">
        <p className="font-mono text-sm text-balance text-muted-foreground">
          {metadata.description as string}
        </p>
      </div>

      <Separator />

      <div className="grid grid-cols-1 sm:grid-cols-2">
        {TESTIMONIALS.map((item, index) => (
          <a
            key={item.url}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex flex-col gap-4 p-4 transition-colors hover:bg-accent2",
              "border-b border-edge",
              index % 2 === 0 && "sm:border-r sm:border-edge",
            )}
          >
            <Testimonial>
              <TestimonialQuote className="px-0 pt-0">
                <p className="whitespace-pre-line">{item.quote}</p>
              </TestimonialQuote>

              <TestimonialAuthor className="px-0 pb-0">
                <TestimonialAvatar>
                  <TestimonialAvatarImg
                    src={item.authorAvatar}
                    alt={item.authorName}
                  />
                  <TestimonialAvatarRing />
                </TestimonialAvatar>

                <TestimonialAuthorName>{item.authorName}</TestimonialAuthorName>

                <TestimonialAuthorTagline>
                  {item.authorTagline}
                </TestimonialAuthorTagline>
              </TestimonialAuthor>
            </Testimonial>
          </a>
        ))}
      </div>

      <Separator />

      <div className="h-4" />
    </div>
  );
}

function Separator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-8 w-full",
        "before:absolute before:-left-[100vw] before:-z-1 before:h-8 before:w-[200vw]",
        "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56",
        className,
      )}
    />
  );
}
