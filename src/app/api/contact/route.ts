import { NextResponse } from "next/server";
import { z } from "zod";

import { supabase } from "@/lib/supabase";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name is too long"),
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email is too long"),
  message: z
    .string()
    .trim()
    .min(1, "Message is required")
    .max(5000, "Message is too long"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      const errorMsg = result.error.issues[0]?.message || "Invalid input";
      return NextResponse.json(
        { success: false, error: errorMsg },
        { status: 400 },
      );
    }

    const { name, email, message } = result.data;

    if (!supabase) {
      console.warn("Contact API: Supabase is not configured.");
      return NextResponse.json(
        {
          success: false,
          error: "Database is currently offline. Please email directly.",
          fallbackEmail: true,
        },
        { status: 503 },
      );
    }

    const { error } = await supabase.from("contacts").insert([
      {
        name,
        email,
        message,
      },
    ]);

    if (error) {
      console.error("Contact API Supabase error:", error);
      return NextResponse.json(
        {
          success: false,
          error: error.message || "Failed to submit message to database.",
          code: error.code,
          hint:
            error.hint ||
            (error.message?.includes("violates row-level security")
              ? "Supabase RLS policy is blocking inserts. Add an INSERT policy for public/anon."
              : undefined),
          fallbackEmail: true,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (err) {
    console.error("Contact API internal error:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error. Please try again or email directly.",
        fallbackEmail: true,
      },
      { status: 500 },
    );
  }
}
