export type Project = {
  /** Stable unique identifier (used as list key/anchor). */
  id: string;
  title: string;
  /**
   * Project period for display and sorting.
   * Use "MM.YYYY" format. Omit `end` for ongoing projects.
   */
  period: {
    /** Start date (e.g., "05.2025"). */
    start: string;
    /** End date; leave undefined for "Present". */
    end?: string;
  };
  /** Public URL for the code repository (e.g. GitHub). */
  repoUrl: string;
  /** Public URL for the live demo. */
  demoUrl?: string;
  /** Tags/technologies for chips or filtering. */
  skills: string[];
  /** Optional rich description; Markdown and line breaks supported. */
  description: string;
  /** Logo image URL (absolute or path under /public). */
  logo: string;
  /** Whether the project card is expanded by default in the UI. */
  isExpanded?: boolean;

  /** Detailed Case Study Fields */
  /** Project overview section (supports markdown) */
  overview?: string;
  /** Key features section (supports markdown) */
  keyFeatures?: string;
  /** Key challenges faced (supports markdown) */
  keyChallenges?: string;
  /** Key learnings from the project (supports markdown) */
  keyLearnings?: string;
  /** Duration of the project (e.g. "2 Weeks") */
  duration?: string;
  /** Role played in the project (e.g. "Full Stack Developer", "Data Scientist") */
  role?: string;
  /** Team size or type (e.g. "Solo", "Team of 4") */
  teamSize?: string;
  /** Main category (e.g. "Full Stack", "Data Science") */
  category?: string;
  /** Status of the project (e.g. "Completed", "In Progress") */
  status?: string;
  /** Motivation behind the project (supports markdown) */
  whyIBuiltThis?: string;
};
