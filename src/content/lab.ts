// Experiments, stack, services and process content.
// Experiments below are SAMPLE entries. Replace them with your real ones.

export type ExperimentStatus = "live" | "experiment" | "building" | "archived";

export type Experiment = {
  id: string;
  name: string;
  summary: string;
  stack: string[];
  status: ExperimentStatus;
  href: string;
  sample: boolean;
};

export const experiments: Experiment[] = [
  {
    id: "01",
    name: "Agent with MCP tools",
    summary: "An AI agent that can read and change a codebase through a couple of custom MCP servers.",
    stack: ["MCP", "TypeScript", "Claude"],
    status: "building",
    href: "#",
    sample: true,
  },
  {
    id: "02",
    name: "Playwright scraper",
    summary: "Scheduled headless browser jobs that collect listings, clean them up and save them to Postgres.",
    stack: ["Playwright", "Node.js", "PostgreSQL"],
    status: "live",
    href: "#",
    sample: true,
  },
  {
    id: "03",
    name: "n8n webhook bridge",
    summary: "Sends events from a web app to a CRM and an email tool without writing a custom backend.",
    stack: ["n8n", "REST APIs", "Webhooks"],
    status: "experiment",
    href: "#",
    sample: true,
  },
  {
    id: "04",
    name: "Browser task runner",
    summary: "Runs multi-step browser tasks with retries, and saves a screenshot and log for every run.",
    stack: ["Playwright", "TypeScript"],
    status: "experiment",
    href: "#",
    sample: true,
  },
  {
    id: "05",
    name: "SaaS starter",
    summary: "Auth, teams, billing webhooks and a dashboard layout, so new projects don't start from zero.",
    stack: ["Next.js", "Supabase", "Tailwind"],
    status: "building",
    href: "#",
    sample: true,
  },
  {
    id: "06",
    name: "Legacy API adapter",
    summary: "A typed client for an old PHP REST API, so a new Next.js front end could use it safely.",
    stack: ["Laravel", "TypeScript", "REST APIs"],
    status: "archived",
    href: "#",
    sample: true,
  },
];

export const stack = [
  {
    group: "Most days",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Supabase"],
  },
  {
    group: "AI & automation",
    items: ["Claude Code", "Cursor", "AI APIs", "n8n", "Playwright", "MCP"],
  },
  {
    group: "Where I started",
    items: ["PHP", "Laravel", "MySQL", "REST APIs"],
  },
] as const;

export const services = [
  { name: "Next.js web apps", detail: "New builds or taking over an existing one." },
  { name: "SaaS MVPs", detail: "Auth, data model and a working dashboard, enough to launch and test the idea." },
  { name: "API and third-party integrations", detail: "Payments, CRMs, webhooks, older systems." },
  { name: "Automation and AI workflows", detail: "n8n flows, scheduled jobs, steps that call an LLM." },
  { name: "Bug fixes and new features", detail: "Working inside a codebase someone else started." },
  { name: "Scraping and browser automation", detail: "Collecting data or scripting repetitive tasks with Playwright." },
] as const;

export const process = [
  { step: "1", name: "Understand", detail: "Work out what the product needs to do, who uses it and what matters most." },
  { step: "2", name: "Plan", detail: "Sketch the data model, API routes and main screens before any code is written." },
  { step: "3", name: "Build", detail: "Write it in small pieces, using Claude Code or Cursor to speed up the typing." },
  { step: "4", name: "Review", detail: "Read the generated code, fix what's wrong, refactor, and add tests." },
  { step: "5", name: "Ship", detail: "Deploy, connect the integrations, and fix what comes up once real people use it." },
] as const;
