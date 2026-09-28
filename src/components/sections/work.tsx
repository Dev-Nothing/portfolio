import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { projects, type Project } from "@/content/projects";
import { Parallax } from "@/components/work/motion-wrappers";
import { ProjectPhone, ProjectScreen } from "@/components/work/project-visual";

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          id="work-title"
          label="Selected work"
          title="Three recent projects"
          intro="Each one went from an empty repo to a deployed Next.js app. Screenshots and write-ups are on the way."
        />

        <div className="mt-14 space-y-20 md:mt-20 md:space-y-28">
          {projects.map((p, i) => (
            <Reveal key={p.slug}>
              <article aria-labelledby={`${p.slug}-title`} style={{ "--h": p.hue } as React.CSSProperties}>
                {p.layout === "feature" && <FeatureProject project={p} priority={i === 0} />}
                {p.layout === "wide" && <WideProject project={p} />}
                {p.layout === "split" && <SplitProject project={p} />}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ——— shared pieces ——— */

function Meta({ project }: { project: Project }) {
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
      <span className="font-mono text-xs text-faint">{project.index}</span>
      {project.category}
      {project.placeholder && <span className="text-faint">(placeholder)</span>}
    </p>
  );
}

function Title({ project, className = "" }: { project: Project; className?: string }) {
  return (
    <h3 id={`${project.slug}-title`} className={`mt-3 text-3xl font-medium tracking-[-0.03em] sm:text-4xl ${className}`}>
      {project.title}
    </h3>
  );
}

function Body({ project }: { project: Project }) {
  return (
    <>
      <p className="text-lg leading-snug text-fg-2">{project.summary}</p>
      <p className="text-pretty leading-relaxed text-muted">{project.description}</p>
      <p className="text-sm text-muted">
        <span className="text-faint">Built with </span>
        {project.tech.join(", ")}
      </p>
    </>
  );
}

const isReal = (href?: string) => Boolean(href && href !== "#");

function Links({ project }: { project: Project }) {
  const { live, github } = project.links;
  const ext = (label: string, href?: string) =>
    href === undefined ? null : isReal(href) ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1">
        {label}
        <ArrowUpRight className="size-3.5" aria-hidden />
      </a>
    ) : (
      <span className="text-faint" title="Link coming soon">
        {label} (soon)
      </span>
    );
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px]">
      <Link href={`/work/${project.slug}`} className="group inline-flex items-center gap-1.5 font-medium">
        <span className="link">Read the case study</span>
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </Link>
      {ext("Live demo", live)}
      {ext("GitHub", github)}
    </div>
  );
}

/** Neutral backdrop the screenshot sits on. */
function Stage({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`relative overflow-hidden rounded-lg bg-ink-2 ${className}`}>{children}</div>;
}

/* ——— 01: large screenshot with info beside ——— */

function FeatureProject({ project, priority }: { project: Project; priority?: boolean }) {
  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      <Stage className="group p-4 sm:p-8 lg:col-span-8">
        <div className="relative transition-transform duration-500 ease-out-expo group-hover:-translate-y-1">
          <ProjectScreen project={project} priority={priority} sizes="(min-width: 1024px) 700px, 100vw" />
          <div className="absolute -bottom-4 right-3 hidden w-[24%] max-w-[160px] sm:block">
            <ProjectPhone project={project} />
          </div>
        </div>
      </Stage>
      <div className="flex min-w-0 flex-col gap-5 lg:col-span-4 lg:pt-2">
        <div>
          <Meta project={project} />
          <Title project={project} />
        </div>
        <Body project={project} />
        <div className="pt-1">
          <Links project={project} />
        </div>
      </div>
    </div>
  );
}

/* ——— 02: full-width visual, info underneath ——— */

function WideProject({ project }: { project: Project }) {
  return (
    <div>
      {/* On small screens the wide visual is cropped rather than shrunk, so the UI stays legible. */}
      <Stage className="group px-4 pt-6 sm:px-10 sm:pt-10">
        <Parallax className="-mb-8">
          <div className="min-w-[640px] transition-transform duration-500 ease-out-expo group-hover:-translate-y-1 md:min-w-0">
            <ProjectScreen project={project} sizes="(min-width: 1152px) 1000px, 100vw" />
          </div>
        </Parallax>
      </Stage>
      <div className="mt-8 grid gap-6 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <Meta project={project} />
          <Title project={project} />
        </div>
        <div className="flex flex-col gap-5 md:col-span-8 md:pt-8">
          <Body project={project} />
          <Links project={project} />
        </div>
      </div>
    </div>
  );
}

/* ——— 03: split screen ——— */

function SplitProject({ project }: { project: Project }) {
  return (
    <div className="grid overflow-hidden rounded-lg border border-line lg:grid-cols-2">
      <div className="flex flex-col justify-between gap-10 p-6 sm:p-10">
        <div>
          <Meta project={project} />
          <Title project={project} className="sm:text-5xl" />
        </div>
        <div className="flex flex-col gap-5">
          <Body project={project} />
          <Links project={project} />
        </div>
      </div>
      <div className="group relative min-h-[18rem] overflow-hidden border-t border-line bg-ink-2 sm:min-h-[24rem] lg:border-l lg:border-t-0">
        <div className="absolute left-6 top-8 w-[135%] transition-transform duration-500 ease-out-expo group-hover:-translate-x-2 sm:left-10 sm:top-10 sm:w-[115%]">
          <ProjectScreen project={project} sizes="(min-width: 1024px) 640px, 130vw" />
        </div>
      </div>
    </div>
  );
}
