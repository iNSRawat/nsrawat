import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";

import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "DS Resources",
  description:
    "A curated collection of data science resources including books, podcasts, newsletters, and online communities for beginner ML engineers.",
};

type Resource = {
  name: string;
  url: string;
  description?: string;
};

type ResourceCategory = {
  title: string;
  emoji: string;
  items: Resource[];
};

const RESOURCES: ResourceCategory[] = [
  {
    title: "Books",
    emoji: "📚",
    items: [
      {
        name: "Fluent Python",
        url: "https://www.oreilly.com/library/view/fluent-python-2nd/9781492056348/",
        description:
          "Clear, concise, and effective programming by Luciano Ramalho.",
      },
      {
        name: "Fundamentals of Data Engineering",
        url: "https://www.oreilly.com/library/view/fundamentals-of-data/9781098108298/",
        description:
          "Plan and build robust data systems by Joe Reis & Matt Housley.",
      },
      {
        name: "Designing Machine Learning Systems",
        url: "https://www.oreilly.com/library/view/designing-machine-learning/9781098107956/",
        description:
          "An iterative process for production-ready applications by Chip Huyen.",
      },
      {
        name: "AI Engineering",
        url: "https://www.oreilly.com/library/view/ai-engineering/9781098166298/",
        description:
          "Building applications with foundation models by Chip Huyen.",
      },
    ],
  },
  {
    title: "Podcasts",
    emoji: "🎙️",
    items: [
      {
        name: "The Dwarkesh Podcast",
        url: "https://www.dwarkeshpatel.com/podcast",
        description:
          "Deep conversations with brilliant minds on technology, history, and progress.",
      },
      {
        name: "Wading Through AI",
        url: "https://www.wadingthroughai.com/",
        description:
          "Navigating the rapidly evolving world of artificial intelligence.",
      },
      {
        name: "Latent Space",
        url: "https://www.latent.space/podcast",
        description:
          "The podcast about AI engineering, infrastructure, and the people building it.",
      },
      {
        name: "Data Skeptic",
        url: "https://dataskeptic.com/",
        description:
          "Accessible explanations of data science, statistics, and machine learning topics.",
      },
      {
        name: "DataFramed",
        url: "https://www.datacamp.com/podcast",
        description:
          "DataCamp's podcast on data science careers, tools, and industry trends.",
      },
      {
        name: "SuperDataScience",
        url: "https://www.superdatascience.com/podcast",
        description:
          "Weekly interviews with data scientists, analysts, and ML engineers by Jon Krohn.",
      },
      {
        name: "Not So Standard Deviations",
        url: "https://nssdeviations.com/",
        description:
          "Roger Peng and Hilary Parker discuss the practice of data science and statistics.",
      },
      {
        name: "Lex Fridman Podcast",
        url: "https://lexfridman.com/podcast/",
        description:
          "Long-form conversations on AI, science, philosophy, and the nature of intelligence.",
      },
      {
        name: "TWIML AI Podcast",
        url: "https://twimlai.com/podcast/twimlai/",
        description:
          "Interviews with top ML and AI researchers and practitioners by Sam Charrington.",
      },
      {
        name: "Practical AI",
        url: "https://changelog.com/practicalai",
        description:
          "Making AI practical, productive, and accessible to everyone.",
      },
      {
        name: "Gradient Dissent",
        url: "https://wandb.ai/fully-connected/gradient-dissent",
        description:
          "ML practitioners share real-world lessons from building AI systems at Weights & Biases.",
      },
    ],
  },
  {
    title: "Newsletters",
    emoji: "📬",
    items: [
      {
        name: "The Batch",
        url: "https://www.deeplearning.ai/the-batch/",
        description:
          "Weekly AI news and insights from DeepLearning.AI by Andrew Ng.",
      },
      {
        name: "TLDR AI",
        url: "https://tldr.tech/ai",
        description:
          "Daily byte-sized updates on AI research, tools, and industry news.",
      },
      {
        name: "The Pragmatic Engineer",
        url: "https://newsletter.pragmaticengineer.com/",
        description:
          "Insights on engineering culture, career growth, and industry trends by Gergely Orosz.",
      },
    ],
  },
  {
    title: "Online Communities",
    emoji: "🌐",
    items: [
      {
        name: "PySlackers",
        url: "https://pyslackers.com/",
        description:
          "A Slack community for Python enthusiasts of all experience levels.",
      },
      {
        name: "fast.ai Forums",
        url: "https://forums.fast.ai/",
        description:
          "Discussion forum for practical deep learning and the fast.ai courses.",
      },
      {
        name: "AI/ML Career Launchpad",
        url: "https://discord.gg/aimlcareerlaunchpad",
        description:
          "A community for aspiring and practicing AI/ML professionals.",
      },
      {
        name: "Kaggle",
        url: "https://www.kaggle.com/",
        description:
          "The largest data science community with competitions, datasets, and notebooks.",
      },
      {
        name: "r/datascience",
        url: "https://www.reddit.com/r/datascience/",
        description:
          "Reddit community for data science discussions, career advice, and industry news.",
      },
      {
        name: "MLOps Community",
        url: "https://mlops.community/",
        description:
          "A community focused on ML in production, MLOps tools, and best practices.",
      },
      {
        name: "DataTalks.Club",
        url: "https://datatalks.club/",
        description:
          "Free courses, events, and a Slack community for data engineers and scientists.",
      },
    ],
  },
];

export default function DSResourcesPage() {
  return (
    <div className="min-h-svh">
      <div className="screen-line-after px-2 sm:px-4">
        <h1 className="text-2xl font-semibold sm:text-3xl">
          Data Science Resources
        </h1>
      </div>

      <div className="p-2 sm:p-4">
        <p className="font-mono text-sm text-balance text-muted-foreground">
          {metadata.description as string}
        </p>
      </div>

      <Separator />

      {RESOURCES.map((category) => (
        <div key={category.title}>
          <div className="screen-line-after px-2 pt-2 sm:px-4">
            <h2 className="flex items-center gap-2 text-base font-semibold sm:text-lg">
              <span>{category.emoji}</span>
              {category.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {category.items.map((resource, i) => (
              <a
                key={resource.url}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group flex flex-col gap-1 border-b border-edge p-3 sm:p-4 transition-colors hover:bg-accent/50",
                  i % 2 === 0 ? "md:border-r" : "",
                )}
              >
                <span className="flex items-center gap-1.5 font-mono text-sm font-medium text-foreground group-hover:underline">
                  {resource.name}
                  <ExternalLink className="size-3 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </span>
                {resource.description && (
                  <span className="font-mono text-xs text-muted-foreground leading-relaxed">
                    {resource.description}
                  </span>
                )}
              </a>
            ))}
            {category.items.length % 2 !== 0 && (
              <div className="hidden border-b border-edge md:block" />
            )}
          </div>

          <Separator />
        </div>
      ))}

      <div className="h-4" />
    </div>
  );
}

function Separator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-8 w-full",
        "before:absolute before:-left-[100vw] before:-z-1 before:h-8 before:w-[200vw]",
        "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56",
        className,
      )}
    />
  );
}
