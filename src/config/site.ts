import { USER } from "@/features/portfolio/data/user";
import type { NavItem } from "@/types/nav";

export const SITE_INFO = {
  name: USER.displayName,
  url: process.env.APP_URL || "https://www.nsrawat.in",
  ogImage: USER.ogImage,
  description: USER.bio,
  keywords: USER.keywords,
};

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};

export const MAIN_NAV: NavItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Projects",
    href: "/projects",
  },
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Components",
    href: "/components",
  },
];

export const GITHUB_USERNAME = "iNSRawat";
export const SOURCE_CODE_GITHUB_REPO = "iNSRawat/nsrawat";
export const SOURCE_CODE_GITHUB_URL =
  "https://github.com/iNSRawat/nsrawat?utm_source=nsrawat.in";

export const SPONSORSHIP_URL = "https://github.com/sponsors/iNSRawat";

export const UTM_PARAMS = {
  utm_source: "nsrawat.in",
  utm_medium: "referral",
  utm_campaign: "portfolio",
};
