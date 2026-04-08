"use client";

import { createClient } from "@supabase/supabase-js";
import { SendIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

interface ContactFormProps {
  compact?: boolean;
  className?: string;
}

export function ContactForm({ compact = false, className }: ContactFormProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!supabaseUrl || !supabaseKey) {
      toast.error("Supabase environment variables are missing.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("contacts").insert([form]);

    setLoading(false);

    if (error) {
      toast.error("Error submitting form. Please try again.");
      console.error(error);
    } else {
      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        compact ? "space-y-3" : "space-y-4 sm:space-y-6",
        className,
      )}
    >
      <div
        className={cn(
          "grid",
          compact
            ? "grid-cols-1 sm:grid-cols-2 gap-3"
            : "grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6",
        )}
      >
        <div className={cn(compact ? "space-y-1" : "space-y-1.5 sm:space-y-2")}>
          <Label
            htmlFor="name"
            className={compact ? "text-xs text-muted-foreground" : ""}
          >
            Name
          </Label>
          <Input
            id="name"
            placeholder="John Doe"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            disabled={loading}
            className={cn("bg-accent/50", compact ? "h-8 text-xs px-2.5" : "")}
          />
        </div>

        <div className={cn(compact ? "space-y-1" : "space-y-1.5 sm:space-y-2")}>
          <Label
            htmlFor="email"
            className={compact ? "text-xs text-muted-foreground" : ""}
          >
            Email
          </Label>
          <Input
            id="email"
            placeholder="john@example.com"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            disabled={loading}
            className={cn("bg-accent/50", compact ? "h-8 text-xs px-2.5" : "")}
          />
        </div>
      </div>

      <div className={cn(compact ? "space-y-1" : "space-y-1.5 sm:space-y-2")}>
        <Label
          htmlFor="message"
          className={compact ? "text-xs text-muted-foreground" : ""}
        >
          Message
        </Label>
        <Textarea
          id="message"
          placeholder="What's on your mind?"
          className={cn(
            "resize-y bg-accent/50",
            compact ? "min-h-[60px] text-xs px-2.5 py-2" : "min-h-[160px]",
          )}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
          disabled={loading}
        />
      </div>

      <div className={cn("flex", compact ? "justify-end pt-1" : "pt-2")}>
        <Button
          type="submit"
          disabled={loading}
          className={cn(
            compact
              ? "h-8 px-4 text-xs w-full sm:w-auto"
              : "h-10 px-8 w-full sm:w-auto",
          )}
          size={compact ? "sm" : "default"}
        >
          {loading ? (
            "Sending..."
          ) : (
            <>
              Send Message
              <SendIcon className={cn("ml-2", compact ? "size-3" : "size-4")} />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
