import { CERTIFICATIONS } from "./certifications";
import { EXPERIENCES } from "./experiences";
import { PROJECTS } from "./projects";
import { SOCIAL_LINKS } from "./social-links";
import { TECH_STACK } from "./tech-stack";
import { USER } from "./user";

export const ASCII_ART = `
███╗   ██╗███████╗██████╗  █████╗ ██╗    ██╗ █████╗ ████████╗     ██████╗██╗     ██╗
████╗  ██║██╔════╝██╔══██╗██╔══██╗██║    ██║██╔══██╗╚══██╔══╝    ██╔════╝██║     ██║
██╔██╗ ██║███████╗██████╔╝███████║██║ █╗ ██║███████║   ██║       ██║     ██║     ██║
██║╚██╗██║╚════██║██╔══██╗██╔══██║██║███╗██║██╔══██║   ██║       ██║     ██║     ██║
██║ ╚████║███████║██║  ██║██║  ██║╚███╔███╔╝██║  ██║   ██║       ╚██████╗███████╗██║
╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚══╝╚══╝ ╚═╝  ╚═╝   ╚═╝        ╚═════╝╚══════╝╚═╝
`;

export const MOBILE_ASCII_ART = `
 _  _ ___ ___    ___ _    ___
| \\| / __| _ \\  / __| |  |_ _|
| .\` \\__ \\   / | (__| |__ | |
|_|\\_|___/_|_\\  \\___|____|___|
`;

export const ALIASES: Record<string, string> = {
  ls: "projects",
  h: "help",
  "?": "help",
  v: "version",
  g: "gui",
  a: "about",
  s: "skills",
  e: "exp",
  p: "projects",
  c: "contact",
};

export const COMMANDS: Record<string, string | (() => string)> = {
  help:
    "Available commands:\n\n" +
    "help       (h, ?)   - Show this help message\n" +
    "about      (a)      - Display information about me\n" +
    "skills     (s)      - List my technical skills\n" +
    "projects   (p, ls)  - List my projects\n" +
    "exp        (e)      - Show my experience\n" +
    "certs               - Show my certifications\n" +
    "contact    (c)      - Display contact information\n" +
    "social              - Show social media links\n" +
    "version    (v)      - Show CLI version\n" +
    "clear               - Clear the terminal\n" +
    "gui        (g)      - Switch to GUI mode\n\n" +
    "Tip: Use Tab for command completion and ↑↓ for command history",

  about: () =>
    `\n${USER.displayName}\n${USER.jobTitle}\n\n` +
    `${USER.about.trim()}\n\n` +
    `📍 ${USER.address}\n` +
    `🌐 ${USER.website}`,

  skills: () => {
    const categories = [
      "Language",
      "Framework",
      "Library",
      "Tools",
      "Database",
      "AI",
    ];
    let output = "Tech Stack:\n";

    categories.forEach((cat) => {
      const skills = TECH_STACK.filter(
        (t) =>
          t.categories.includes(cat) ||
          (cat === "Tools" && t.categories.includes("Platform")),
      );
      if (skills.length > 0) {
        output += `\n[${cat}s]\n`;
        output += skills.map((t) => `  • ${t.title}`).join("\n") + "\n";
      }
    });
    return output;
  },

  projects: () =>
    PROJECTS.map(
      (p) =>
        `\n▸ ${p.title}\n  ${p.description.replace(/\n/g, "\n  ")}\n\n  Tech: ${p.skills.join(", ")}` +
        (p.repoUrl ? `\n  Repo: ${p.repoUrl}` : "") +
        (p.demoUrl ? `\n  Demo: ${p.demoUrl}` : ""),
    ).join("\n"),

  exp: () =>
    EXPERIENCES.filter((e) => e.id !== "education")
      .map((e) =>
        e.positions
          .map(
            (pos) =>
              `\n▸ ${pos.title}\n  ${e.companyName} · ${pos.employmentType || ""}\n  ${pos.employmentPeriod.start} – ${pos.employmentPeriod.end || "Present"}\n\n  ${pos.description ? pos.description.replace(/\n/g, "\n  ") : ""}`,
          )
          .join("\n"),
      )
      .join("\n"),

  certs: () =>
    "Certifications:\n" +
    CERTIFICATIONS.map(
      (c) => `\n▸ ${c.title}\n  Issuer: ${c.issuer}\n  URL: ${c.credentialURL}`,
    ).join("\n"),

  contact: () => `Email: ${atob(USER.email)}\n` + `Website: ${USER.website}`,

  social: () =>
    "Social Links:\n\n" +
    SOCIAL_LINKS.map((s) => `  ${s.title}: ${s.href}`).join("\n"),

  version: () => "nsrawat.in CLI v1.0.0",

  clear: "CLEAR",
  gui: "GUI",
};
