// Central place for personal details and links.
// Contact details and profile links.

export const site = {
  name: "Louis Jay Fuentes",
  shortName: "Louie",
  role: "AI-Assisted Full-Stack Developer",
  title: "Louis Jay Fuentes — AI-Assisted Full-Stack Developer",
  description:
    "I build full-stack web apps with Next.js and TypeScript: databases, APIs, integrations and automation. I use AI coding tools to work faster and review everything before it ships.",
  tagline: "Building useful things with modern technology.",
  // Used for canonical URLs and Open Graph. Set NEXT_PUBLIC_SITE_URL in production.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  available: true,
  availability: "Available for freelance work",
  email: "louiefuentes.dev@gmail.com",
  links: {
    upwork: "https://www.upwork.com/freelancers/~014ef81c362fe982fb",
    github: "https://github.com/Dev-Nothing",
    linkedin: "https://www.linkedin.com/in/louie-jay-fuentes-586534112/",
  },
} as const;

export const navItems = [
  { label: "Work", href: "#work" },
  { label: "Experiments", href: "#experiments" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;
