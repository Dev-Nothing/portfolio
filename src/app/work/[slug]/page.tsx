import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { Reveal } from "@/components/reveal";
import { ProjectScreen } from "@/components/work/project-visual";
import { getProject, projects } from "@/content/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} case study`,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
  };
}

// Case-study outline, shown for projects that don't have a write-up yet.
const outline = [
  ["Overview", "What the product is, who it's for, and what your role was."],
  ["The problem", "What was broken, slow or missing before this existed."],
  ["Architecture", "Data model, key routes and APIs, integrations, and why you chose them."],
  ["How we worked", "How the work was scoped, planned and delivered."],
  ["Result", "What shipped and what's next. Only include outcomes you can actually back up."],
] as const;

export default async function CaseStudy({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const i = projects.indexOf(project);
  const next = projects[(i + 1) % projects.length];

  return (
    <>
      <Nav home={false} />
      <main id="main" style={{ "--h": project.hue } as React.CSSProperties} className="pt-28 sm:pt-36">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Link href="/#work" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
            <ArrowLeft className="size-4" aria-hidden /> All work
          </Link>

          <header className="mt-10 grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <p className="flex items-center gap-3 text-sm text-muted">
                <span className="font-mono text-xs text-faint">{project.index}</span>
                {project.category}
                {project.placeholder && <span className="text-faint">(placeholder)</span>}
              </p>
              <h1 className="mt-6 text-5xl font-medium leading-none tracking-[-0.045em] sm:text-7xl">{project.title}</h1>
              <p className="mt-6 max-w-2xl text-xl leading-snug text-fg-2">{project.summary}</p>
            </div>
            <dl className="grid grid-cols-2 gap-6 border-t border-line pt-6 md:col-span-4 md:grid-cols-1 md:border-l md:border-t-0 md:pl-8 md:pt-0">
              <div>
                <dt className="text-sm text-faint">Stack</dt>
                <dd className="mt-1.5 text-sm text-fg-2">{project.tech.join(", ")}</dd>
              </div>
              <div>
                <dt className="text-sm text-faint">Links</dt>
                <dd className="mt-1.5 flex flex-wrap gap-x-4 text-sm">
                  {project.links.live && project.links.live !== "#" ? (
                    <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-fg-2 hover:text-fg">
                      Live <ArrowUpRight className="size-3" aria-hidden />
                    </a>
                  ) : (
                    <span className="text-faint">Live demo (soon)</span>
                  )}
                  {project.links.github && project.links.github !== "#" && (
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-fg-2 hover:text-fg">
                      Code <ArrowUpRight className="size-3" aria-hidden />
                    </a>
                  )}
                </dd>
              </div>
            </dl>
          </header>

          <div className="mt-14 rounded-lg bg-ink-2 p-4 sm:p-10 md:mt-16">
            <ProjectScreen project={project} priority sizes="(min-width: 1152px) 1000px, 100vw" />
          </div>

          <div className="mx-auto mt-20 max-w-3xl space-y-14 md:mt-28">
            {project.caseStudy ? (
              project.caseStudy.map((s) => (
                <Reveal key={s.heading} as="section">
                  <h2 className="text-2xl font-medium tracking-[-0.025em] sm:text-3xl">{s.heading}</h2>
                  <div className="mt-4 space-y-4 text-lg leading-relaxed text-fg-2">
                    {s.body.map((para) => (
                      <p key={para}>{para}</p>
                    ))}
                  </div>
                </Reveal>
              ))
            ) : (
              <>
                <p className="rounded-md border border-line p-4 text-sm leading-relaxed text-muted">
                  This case study is a placeholder. Each section below says what should go there.
                </p>
                {outline.map(([h, hint]) => (
                  <Reveal key={h} as="section">
                    <h2 className="text-2xl font-medium tracking-[-0.025em] sm:text-3xl">{h}</h2>
                    <p className="mt-4 text-lg leading-relaxed text-muted">[Placeholder] {hint}</p>
                  </Reveal>
                ))}
              </>
            )}
          </div>

          <Link
            href={`/work/${next.slug}`}
            className="group mt-24 flex items-center justify-between gap-6 border-t border-line py-10 md:mt-32"
          >
            <span>
              <span className="text-sm text-muted">Next project</span>
              <span className="mt-2 block text-3xl font-medium tracking-[-0.03em] transition-colors sm:text-5xl">
                {next.title}
              </span>
            </span>
            <ArrowRight className="size-6 shrink-0 text-muted transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
