import { CERTIFICATIONS } from "./certifications";
import { EXPERIENCES } from "./experiences";
import { PROJECTS } from "./projects";
import { SOCIAL_LINKS } from "./social-links";
import { TECH_STACK } from "./tech-stack";
import { USER } from "./user";

export const ASCII_ART = `

███░   ██░███████░██████░  █████░ ██░    ██░ █████░ ████████░     ██████░██░     ██░
████░  ██░██░░░░░░██░░░██░██░░░██░██░    ██░██░░░██░░░░██░░░░    ██░░░░░░██░     ██░
██░██░ ██░███████░██████░░███████░██░ █░ ██░███████░   ██░       ██░     ██░     ██░
██░░██░██░░░░░░██░██░░░██░██░░░██░██░███░██░██░░░██░   ██░       ██░     ██░     ██░
██░ ░████░███████░██░  ██░██░  ██░░███░███░░██░  ██░   ██░       ░██████░███████░██░
░░░  ░░░░░░░░░░░░░░░░  ░░░░░░  ░░░ ░░░░░░░░ ░░░  ░░░   ░░░        ░░░░░░░░░░░░░░░░░░
`;

export const MOBILE_ASCII_ART = `
███░   ██░███████░██████░  █████░ ██░    ██░ █████░ ████████░     ██████░██░     ██░
████░  ██░██░░░░░░██░░░██░██░░░██░██░    ██░██░░░██░░░░██░░░░    ██░░░░░░██░     ██░
██░██░ ██░███████░██████░░███████░██░ █░ ██░███████░   ██░       ██░     ██░     ██░
██░░██░██░░░░░░██░██░░░██░██░░░██░██░███░██░██░░░██░   ██░       ██░     ██░     ██░
██░ ░████░███████░██░  ██░██░  ██░░███░███░░██░  ██░   ██░       ░██████░███████░██░
░░░  ░░░░░░░░░░░░░░░░  ░░░░░░  ░░░ ░░░░░░░░ ░░░  ░░░   ░░░        ░░░░░░░░░░░░░░░░░░
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
  b: "blog",
};

export const COMMANDS: Record<string, string | (() => string)> = {
  help:
    "Available commands:\n\n" +
    "help       (h, ?)   - Show this help message\n" +
    "about      (a)      - Display information about me\n" +
    "skills     (s)      - List my technical skills\n" +
    "projects   (p, ls)  - List my projects\n" +
    "exp        (e)      - Show my experience\n" +
    "blog       (b)      - List recent blog posts\n" +
    "certs               - Show my certifications\n" +
    "contact    (c)      - Display contact information\n" +
    "social              - Show social media links\n" +
    "version    (v)      - Show CLI version\n" +
    "clear               - Clear the terminal\n" +
    "gui        (g)      - Switch to GUI mode\n\n" +
    "Tip: Use Tab for command completion and ↑↓ for command history",

  about: () =>
    `Nagendra Singh Rawat | Data Scientist specializing in Marketing Analytics.\n` +
    `Pivoted from 5 years in Digital Marketing to Data Science in Sep 2025.\n` +
    `Expertise: Python, SQL, and ML frameworks (TensorFlow, PyTorch, Scikit-learn).\n` +
    `Building: Models (Recipe Predictor), Pipelines (Customer Analytics, ETL), and Dashboards (Marketing KPI) with Tableau & Power BI.\n` +
    `Learning: Currently earning 8+ certifications (DataCamp, Google, IBM) while mastering ML/EDA for actionable insights.\n\n` +
    `For more details, visit:\n` +
    `  ${USER.website}/about`,

  skills: () => {
    const skillsList = TECH_STACK.map((t) => t.title).join(", ");
    return `\nTechnical Skills:\n${skillsList}\n\nView details: ${USER.website}/about`;
  },

  projects: () =>
    "My Projects:\n" +
    PROJECTS.map(
      (p) => `\n▸ ${p.title} - ${p.description.split(".")[0]}.`,
    ).join("") +
    `\n\nView all projects: ${USER.website}/projects`,

  exp: () =>
    "Experience:\n" +
    EXPERIENCES.filter((e) => e.id !== "education")
      .map(
        (e) =>
          `\n▸ ${e.companyName} - ${e.positions[0].title} (${e.positions[0].employmentPeriod.start} - ${e.positions[0].employmentPeriod.end || "Present"})`,
      )
      .join("") +
    `\n\nFull history: ${USER.website}/about`,

  certs: () =>
    "Certifications:\n" +
    CERTIFICATIONS.map((c) => `\n▸ ${c.title} (${c.issuer})`).join("") +
    `\n\nView credentials: ${USER.website}/certifications`,

  contact: () =>
    `Email: ${atob(USER.email)}\n` +
    `       nsrawatdigital@gmail.com\n` +
    `Website: ${USER.website}\n` +
    `Location: ${USER.address}\n\n` +
    `Send a direct message: ${USER.website}/contact`,

  blog: () =>
    "Blog Posts:\n\n" +
    "\u25b8 Best Tools for Data Science Web Apps\n" +
    "\u25b8 How to Prevent Overbooking in SQL\n" +
    "\u25b8 Introduction to Machine Learning Algorithms\n" +
    "\u25b8 Machine Learning Workflow\n" +
    "\u25b8 Mathematics for Data Science\n" +
    "\u25b8 NSRawat Brand\n" +
    "\u25b8 Python Data Analysis Essentials\n" +
    "\u25b8 Top Data Scientist Skills\n\n" +
    `Read more: ${USER.website}/blog`,

  social: () =>
    "Social Links:\n\n" +
    SOCIAL_LINKS.map((s) => `  ${s.title}: ${s.href}`).join("\n"),

  version: () => "nsrawat.in CLI v1.0.0",

  clear: "CLEAR",
  gui: "GUI",
};
