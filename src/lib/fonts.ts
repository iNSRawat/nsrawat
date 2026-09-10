import { Geist_Mono, Inter as FontSans, Sacramento } from "next/font/google";

export const fontSans = FontSans({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-sans-font",
});

export const fontMono = Geist_Mono({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const fontSignature = Sacramento({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-sacramento",
  display: "swap",
});
