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

export function Testimonials() {
  return (
    <Panel id="testimonials">
      <div className="overflow-hidden">
        <Marquee className="border-y border-edge [&_.rfm-initial-child-container]:items-stretch! [&_.rfm-marquee]:items-stretch!">
          <MarqueeFade side="left" />
          <MarqueeFade side="right" />

          <MarqueeContent>
            {TESTIMONIALS.map((item) => (
              <MarqueeItem
                key={item.url}
                className="mx-0 h-full w-xs border-r border-edge"
              >
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full transition-colors hover:bg-accent2"
                >
                  <Testimonial>
                    <TestimonialQuote>
                      <p className="whitespace-pre-line">{item.quote}</p>
                    </TestimonialQuote>

                    <TestimonialAuthor>
                      <TestimonialAvatar>
                        <TestimonialAvatarImg
                          src={item.authorAvatar}
                          alt={item.authorName}
                        />
                        <TestimonialAvatarRing />
                      </TestimonialAvatar>

                      <TestimonialAuthorName>
                        {item.authorName}
                      </TestimonialAuthorName>

                      <TestimonialAuthorTagline>
                        {item.authorTagline}
                      </TestimonialAuthorTagline>
                    </TestimonialAuthor>
                  </Testimonial>
                </a>
              </MarqueeItem>
            ))}
          </MarqueeContent>
        </Marquee>
      </div>

      <div className="screen-line-before flex justify-end px-4 py-2">
        <Link
          href="/testimonials"
          aria-label="View all testimonials"
          className="flex size-7 items-center justify-center rounded-full border border-edge bg-background text-muted-foreground transition-colors hover:bg-accent2 hover:text-foreground"
        >
          <ArrowUpRightIcon className="size-3.5" />
        </Link>
      </div>
    </Panel>
  );
}
