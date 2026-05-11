import { GeistMono } from "geist/font/mono";
import { Inter as FontSans } from "next/font/google";

export const fontSans = FontSans({
  weight: ["400", "500", "600"],
  display: "swap",
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = GeistMono;
