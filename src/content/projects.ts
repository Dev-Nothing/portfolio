// Featured work. Keep the copy plain: what it is, who it is for, what you did. No invented numbers.
// Screenshots live in /public/projects. Set `image` (and `imageMobile` for the layered phone view);
// without an image, a coded UI mock is rendered instead.
// Don't name clients or link private repos here.

export type MockKind = "dashboard" | "workspace" | "assistant";

export type CaseStudySection = { heading: string; body: string[] };

export type Project = {
  slug: string;
  index: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  tech: string[];
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
  /** Case-study write-up. When missing, the case study page shows an outline instead. */
  caseStudy?: CaseStudySection[];
  placeholder: boolean;
};

export const projects: Project[] = [
  {
    slug: "buildovate",
    index: "01",
    title: "Buildovate",
    category: "Construction SaaS · Web & mobile",
    summary:
      "An all-in-one CRM for contractors that takes a job from lead to signed contract to paid invoice, with a mobile app for crews in the field.",
    description:
      "Contractors usually juggle separate tools for leads, estimates, contracts, invoicing and bookkeeping. Buildovate puts all of it in one multi-tenant platform: a React web app, a Node and PostgreSQL API on AWS, and an Expo mobile app, all on one backend. The hardest part was the money and automation core: Stripe subscriptions and Connect payouts, bank sync, e-signed contracts and a follow-up engine for SMS and email.",
    tech: ["React", "TypeScript", "Node.js", "PostgreSQL", "Expo", "Stripe", "AWS"],
    hue: 28,
    mock: "dashboard",
    url: "buildovate.com",
    image: {
      src: "/projects/buildovate.jpg",
      alt: "Buildovate homepage: an all-in-one CRM for remodeling contractors, shown on mobile, desktop and tablet",
      width: 2880,
      height: 1800,
    },
    imageMobile: {
      src: "/projects/buildovate-mobile.jpg",
      alt: "Buildovate homepage on a phone",
      width: 780,
      height: 1688,
    },
    links: { live: "https://buildovate.com" },
    caseStudy: [
      {
        heading: "Overview",
        body: [
          "Buildovate is a CRM for contractors and remodelers. It's free for solo contractors and has no per-seat fees. It is live in production, and I built most of it: the web app, the API, the infrastructure and the mobile app.",
          "It covers the whole job: leads come in, turn into estimates and agreements, get signed as contracts, get invoiced and paid, and the money lands in reconciled bank transactions. Crews in the field use the mobile app.",
        ],
      },
      {
        heading: "The problem",
        body: [
          "Small construction companies tend to run on a pile of separate tools: a spreadsheet for leads, a document editor for estimates, an e-sign service, an invoicing app and a bookkeeping app. None of them know about each other, so follow-ups get missed and the same information is typed in again and again.",
        ],
      },
      {
        heading: "How we worked",
        body: [
          "Buildovate is a large product that keeps growing, so the work runs in cycles. The client brings the next feature they want. I work out how it fits into the existing app, build it, ship it to staging and then production, and we move on to the next one.",
        ],
      },
      {
        heading: "What I built",
        body: [
          "Leads and agreements. A lead pipeline that turns into agreements with line items, a price book, payment stages, deposits and change orders.",
          "Contracts and e-signing. A block-based contract builder, or an uploaded PDF, rendered to a PDF on the server and signed by the customer in a client portal.",
          "Payments and banking. Stripe subscriptions for the SaaS plans, plus Stripe Connect so contractors get paid on invoices and pay their own workers. Plaid bank linking with transaction sync, where each transaction can be assigned to a project, invoice or expense category.",
          "Follow-up automation. SMS and email playbooks that enroll records automatically, for example a lead that hasn't replied in 48 hours or an invoice that's overdue. They respect quiet hours, daily caps and US carrier registration rules for business texting (10DLC).",
          "AI features. Using Claude, the app can draft an agreement from a lead's notes and match the items against the price book, summarize a job, draft follow-up emails and suggest replies.",
          "Mobile app. Crews get a dashboard, jobs, a calendar, proof photos on checklist items, messaging with the office, push notifications, and payouts through Stripe.",
        ],
      },
      {
        heading: "Architecture",
        body: [
          "The web app is a React 19 and TypeScript single-page app built with Vite, Tailwind and shadcn/ui. The API is Node and Express with Prisma on PostgreSQL, with a schema of over 100 models. Background work (webhooks, sends, syncs) runs on BullMQ and Redis job queues, with scheduled sweeps as a backup.",
          "The mobile app uses Expo and React Native with expo-router, and ships through EAS Build and over-the-air updates. It calls the same REST API as the web app, with the same response shapes and shared types.",
          "Everything runs on AWS and is defined in code with the CDK: Elastic Beanstalk for the API, Aurora Serverless PostgreSQL, Redis, S3 and Amplify, with monitoring alarms. GitHub Actions deploys to staging and production, and tests run on Vitest, Supertest and Playwright.",
        ],
      },
      {
        heading: "Result",
        body: [
          "The web app is live in production. The mobile app is in internal testing and not yet in the app stores.",
        ],
      },
    ],
    placeholder: false,
  },
  {
    slug: "mypropertyos",
    index: "02",
    title: "MyPropertyOS",
    category: "PropTech prototype",
    summary:
      "A portfolio command centre that helps Australian property investors see their equity, debt, cash flow and paperwork before they speak with their advisers.",
    description:
      "Investors keep loans, rent, expenses and documents spread across banks, agents and spreadsheets, so every adviser meeting starts with a scramble. I built a clickable Next.js prototype that pulls it into one place: a portfolio dashboard, property and loan tracking, a cash-flow ledger, readiness scores and an adviser-ready summary. It also has a what-if model that shows how rate, rent, expense and vacancy changes affect cash flow, with every assumption visible.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    hue: 215,
    mock: "dashboard",
    url: "property-os-wheat.vercel.app",
    image: {
      src: "/projects/propertyos.jpg",
      alt: "MyPropertyOS dashboard with review items, portfolio value, total debt and estimated equity",
      width: 2880,
      height: 1800,
    },
    links: { live: "https://property-os-wheat.vercel.app" },
    caseStudy: [
      {
        heading: "Overview",
        body: [
          "MyPropertyOS is a portfolio tool for Australian residential property investors and the accountants, brokers and solicitors who advise them. I built it as a clickable front-end prototype, so the product could be tested and shown before any backend work began.",
        ],
      },
      {
        heading: "The problem",
        body: [
          "An investor with several properties has their numbers everywhere: loan statements from different lenders, rent from property managers, expenses in spreadsheets, and settlement documents in email. Before each meeting with an adviser, they have to gather it all again.",
          "The product also had to stay on the right side of Australian rules. It can inform, but it can't give financial advice.",
        ],
      },
      {
        heading: "How we worked",
        body: [
          "The client came with a clear brief: what the app should do, how it should look, and the compliance rules it had to follow. Before writing any code, I went through the brief with them, suggested changes, and planned the screens and data. Then I built the complete prototype and handed over a working, deployed app, along with a database design ready for the next stage.",
        ],
      },
      {
        heading: "What I built",
        body: [
          "A dashboard with portfolio value, debt, equity, loan-to-value ratio, rent and net cash flow, plus cards that flag what needs attention, such as a missing document or a fixed rate that's about to expire.",
          "Property and loan pages, a cash-flow ledger grouped by month, and rent checks that compare recorded rent against tenancy records.",
          "A scenario model with sliders for interest rate, rent, expenses and vacancy. It recalculates net cash flow as you drag and breaks the change down by each factor, so the assumptions are always visible.",
          "Readiness scores with checklists, and a Position Pack: an adviser-ready summary that ends with questions to ask your adviser.",
          "Compliance built in: a disclaimer on every page, \"estimated\" labels on figures, and \"speak with your accountant\" or \"speak with your broker\" prompts instead of recommendations.",
        ],
      },
      {
        heading: "Architecture",
        body: [
          "Next.js 15 with the App Router, React 19, TypeScript and Tailwind, running on sample data and deployed on Vercel. I also designed the database for the next stage: PostgreSQL with Prisma, money stored as exact decimals rather than floats, every record tied to its owner with adviser permissions, and helpers for the Australian financial year. That backend is designed but not built yet.",
        ],
      },
      {
        heading: "Result",
        body: [
          "A working prototype with a public demo link. The backend, bank feeds and document extraction are the next stage.",
        ],
      },
    ],
    placeholder: false,
  },
  {
    slug: "bizscraper",
    index: "03",
    title: "BizScraper AU",
    category: "Web scraping · Data aggregation",
    summary:
      "Searches 10 Australian business-for-sale marketplaces with one filter and streams the results back live, with duplicates merged.",
    description:
      "Buyers looking for a business to acquire had to search each marketplace separately, each with its own filters and categories. I built a Next.js app with one shared filter that runs a separate scraper for each site and streams results into a single table you can save and export to CSV. The hard part was making ten very different sites behave the same, including finding one site's hidden API and merging the same listing when it appears on several sites.",
    tech: ["Next.js", "TypeScript", "Cheerio", "Zustand", "Vitest"],
    hue: 40,
    mock: "workspace",
    url: "scraper-tool-six.vercel.app",
    image: {
      src: "/projects/bizscraper.jpg",
      alt: "BizScraper AU results table with 88 cafe listings from several marketplaces, showing price and location",
      width: 2880,
      height: 2200,
    },
    links: { live: "https://scraper-tool-six.vercel.app" },
    caseStudy: [
      {
        heading: "Overview",
        body: [
          "BizScraper AU is a search tool for people looking to buy a business in Australia. You set one filter (keyword, state, category and price range), and it searches 10 business-for-sale marketplaces at once.",
        ],
      },
      {
        heading: "The problem",
        body: [
          "Each marketplace has its own search form, its own category list and its own way of writing prices and locations. Checking all of them means repeating the same search ten times and spotting the same business listed on more than one site.",
        ],
      },
      {
        heading: "How we worked",
        body: [
          "The client knew what they wanted: one search across the marketplaces they use, with results they could save and export. Before building, I tested which sites could be scraped reliably, suggested dropping the ones that block scrapers, and planned a shared filter that every site could support. Then I built the full app and delivered it deployed and ready to use, with a screen that explains which sites were left out and why.",
        ],
      },
      {
        heading: "What I built",
        body: [
          "One scraper per site behind a shared interface. Most parse the page's HTML; others post the site's search form or call the site's own API.",
          "One category list mapped onto each site's own categories, with a screen that shows how the mapping works. Each scraper sends the filters its site supports, and the app checks every result against the full filter afterwards.",
          "Live results. The server streams each listing to the browser as soon as it's found, runs sites in parallel with a polite delay between pages, and keeps going if one site fails.",
          "Duplicate merging. The same listing found on several sites becomes one row with a \"+N sources\" badge. Close matches (similar titles, prices within 15%) are shown for you to confirm.",
          "A saved list with CSV export, a health check that tests every site, and a page explaining which sites were left out and why.",
        ],
      },
      {
        heading: "Architecture",
        body: [
          "Next.js 16 with the App Router. The scrape route returns a streaming response. Pages are fetched with retries and backoff, then parsed with Cheerio. For one site, whose search results aren't in the page's HTML, I worked out the shape of its GraphQL API from its error messages. Playwright is an optional fallback when running locally. The saved list lives in the browser with Zustand. There are about 90 Vitest tests that run each scraper against saved pages, so a change to a site's layout shows up as a failing test.",
        ],
      },
      {
        heading: "Result",
        body: [
          "It is live and scrapes real listings. A cooldown between runs keeps the load on each site light.",
        ],
      },
    ],
    placeholder: false,
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
