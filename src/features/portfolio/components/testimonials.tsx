"use client";

import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/kibo-ui/marquee";
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

import { TESTIMONIALS } from "../data/testimonials";
import { Panel } from "./panel";

function TestimonialCard({ item }: { item: (typeof TESTIMONIALS)[number] }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full transition-colors hover:bg-accent2"
    >
      <Testimonial>
        <TestimonialQuote>
          <p className="line-clamp-3 whitespace-pre-line">{item.quote}</p>
        </TestimonialQuote>

        <TestimonialAuthor>
          <TestimonialAvatar className="overflow-hidden rounded-full">
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
  );
}

export function Testimonials() {
  const midpoint = Math.ceil(TESTIMONIALS.length / 2);
  const topRow = TESTIMONIALS.slice(0, midpoint);
  const bottomRow = TESTIMONIALS.slice(midpoint);

  return (
    <Panel id="testimonials" className="relative">
      <div className="overflow-hidden [&_.rfm-initial-child-container]:items-stretch! [&_.rfm-marquee]:items-stretch!">
        <Marquee className="border-y border-edge">
          <MarqueeFade side="left" />
          <MarqueeFade side="right" />

          <MarqueeContent direction="left">
            {topRow.map((item, index) => (
              <MarqueeItem
                key={`top-${item.authorName}-${index}`}
                className="mx-0 h-full w-xs border-r border-edge"
              >
                <TestimonialCard item={item} />
              </MarqueeItem>
            ))}
          </MarqueeContent>
        </Marquee>

        <Marquee className="border-b border-edge">
          <MarqueeFade side="left" />
          <MarqueeFade side="right" />

          <MarqueeContent direction="right">
            {bottomRow.map((item, index) => (
              <MarqueeItem
                key={`bottom-${item.authorName}-${index}`}
                className="mx-0 h-full w-xs border-r border-edge"
              >
                <TestimonialCard item={item} />
              </MarqueeItem>
            ))}
          </MarqueeContent>
        </Marquee>
      </div>

      <div className="absolute bottom-3 right-3 z-10">
        <Link
          href="/testimonials"
          aria-label="View all testimonials"
          className="flex size-8 items-center justify-center rounded-full border border-edge bg-background text-muted-foreground transition-colors hover:bg-accent2 hover:text-foreground"
        >
          <ArrowUpRightIcon className="size-3.5" />
        </Link>
      </div>
    </Panel>
  );
}
