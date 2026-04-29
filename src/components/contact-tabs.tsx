"use client";

import { Code2, Monitor } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { ContactForm } from "@/components/contact-form";
import { DeveloperContactForm } from "@/components/developer-contact-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ROTATING_WORDS = ["Collaborations", "Ideas", "Projects", "Solutions"];

function AnimatedWord() {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setShow(false);
      timeoutRef.current = setTimeout(() => {
        setIndex((i) => (i + 1) % ROTATING_WORDS.length);
        setShow(true);
      }, 350);
    }, 3000);

    return () => {
      clearInterval(interval);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <span
      className="inline-block font-bold transition-all duration-300"
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(8px)",
      }}
    >
      {ROTATING_WORDS[index]}
    </span>
  );
}

export function ContactTabs({
  showHeader = true,
  showFormDescription = false,
}: {
  showHeader?: boolean;
  showFormDescription?: boolean;
}) {
  return (
    <div>
      {showHeader && (
        <div className="mb-4 text-center">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Let&apos;s work on <AnimatedWord />
          </h2>
          <p className="mt-2 font-mono text-sm text-muted-foreground">
            Whether you have a question, a project proposal, or just want to say
            hi, I&apos;ll try my best to get back to you!
          </p>
        </div>
      )}

      <Tabs defaultValue="standard">
        <div className="flex justify-center mb-4">
          <TabsList className="h-10 rounded-full p-1">
            <TabsTrigger
              value="standard"
              className="gap-1.5 rounded-full px-4 py-1.5 text-sm"
            >
              <Monitor className="size-4" />
              Standard
            </TabsTrigger>
            <TabsTrigger
              value="developer"
              className="gap-1.5 rounded-full px-4 py-1.5 text-sm"
            >
              <Code2 className="size-4" />
              Developer
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="standard">
          {showFormDescription && (
            <p className="font-mono text-sm text-muted-foreground mb-4">
              Have a question or want to work together? Fill out the form below
              and I&apos;ll get back to you as soon as possible.
            </p>
          )}
          <ContactForm compact />
        </TabsContent>

        <TabsContent value="developer">
          <DeveloperContactForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
