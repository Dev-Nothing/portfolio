// Featured work. Everything here is PLACEHOLDER content until real details are added.
// Keep the copy plain: what it is, who it is for, what you did. No invented numbers.
// To use a real screenshot, drop it in /public/projects and set `image` (and `imageMobile`
// for the layered phone view). Without an image, a coded UI mock is rendered instead.

export type ProjectLayout = "feature" | "wide" | "split";
export type MockKind = "dashboard" | "workspace" | "assistant";

export type Project = {
  slug: string;
  index: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  tech: string[];
  layout: ProjectLayout;
  /** Hue (0–360) used for the subtle backdrop tint of this project. */
  hue: number;
  mock: MockKind;
  url: string; // fake browser address bar label
  image?: { src: string; alt: string; width: number; height: number };
  imageMobile?: { src: string; alt: string; width: number; height: number };
  links: {
    live?: string;
    github?: string;
  };
  placeholder: boolean;
};

export const projects: Project[] = [
  {
    slug: "project-01",
    index: "01",
    title: "Project 01",
    category: "SaaS dashboard",
    summary: "[Placeholder] One sentence on what this product does and who it's for.",
    description:
      "[Placeholder] Two or three sentences on the problem, what you built, and the hardest technical part (auth, data model, an integration).",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind"],
    layout: "feature",
    hue: 28,
    mock: "dashboard",
    url: "project-01.app",
    links: { live: "#", github: "#" },
    placeholder: true,
  },
  {
    slug: "project-02",
    index: "02",
    title: "Project 02",
    category: "Web application",
    summary: "[Placeholder] One sentence on what this product does and who it's for.",
    description:
      "[Placeholder] Two or three sentences on the problem, what you built, and the interesting technical part.",
    tech: ["Next.js", "Supabase", "REST APIs", "Tailwind"],
    layout: "wide",
    hue: 210,
    mock: "workspace",
    url: "project-02.app",
    links: { live: "#", github: "#" },
    placeholder: true,
  },
  {
    slug: "project-03",
    index: "03",
    title: "Project 03",
    category: "AI-powered tool",
    summary: "[Placeholder] One sentence on what this product does and who it's for.",
    description:
      "[Placeholder] Two or three sentences on the problem, what you built, and the interesting technical part.",
    tech: ["Next.js", "AI APIs", "Node.js", "PostgreSQL"],
    layout: "split",
    hue: 150,
    mock: "assistant",
    url: "project-03.app",
    links: { live: "#" },
    placeholder: true,
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
