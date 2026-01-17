import type { SocialLink } from "../types/social-links";

export const SOCIAL_LINKS: SocialLink[] = [
  {
    icon: "github",
    title: "GitHub",
    description: "iNSRawat",
    href: "https://github.com/iNSRawat",
  },
  {
    icon: "linkedin",
    title: "LinkedIn",
    description: "insrawat",
    href: "https://www.linkedin.com/in/insrawat",
  },
  {
    icon: "kaggle", // Need to ensure knaggle is supported or fallback
    title: "Kaggle",
    description: "nsrawat",
    href: "https://www.kaggle.com/nsrawat",
  },
  {
    icon: "x",
    title: "X (formerly Twitter)",
    description: "@NSRawattt",
    href: "https://twitter.com/NSRawattt",
  },
  {
    icon: "peerlist", // Need ensure supported
    title: "Peerlist",
    description: "nsrawat",
    href: "https://peerlist.io/nsrawat",
  },
  {
    icon: "datacamp", // Need ensure supported
    title: "DataCamp",
    description: "ns-rawat",
    href: "https://www.datacamp.com/portfolio/ns-rawat",
  },
];
