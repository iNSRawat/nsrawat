import { Geist, Geist_Mono, Pixelify_Sans, Sacramento } from "next/font/google";

export const fontSans = Geist({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-sans-font",
});

export const fontMono = Geist_Mono({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const fontPixel = Pixelify_Sans({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-pixel",
});

export const fontSignature = Sacramento({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-sacramento",
  display: "swap",
});
