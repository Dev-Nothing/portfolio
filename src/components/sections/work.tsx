import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { projects, type Project } from "@/content/projects";
import { ProjectCard, ScrollScreen, StaggerItem } from "@/components/work/motion-wrappers";
import { ProjectPhone, ProjectScreen } from "@/components/work/project-visual";

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          id="work-title"
          label="Selected work"
          title="Projects I've built"
          intro="Real products I've taken from first commit to launch."
        />

        <div className="mt-14 space-y-10 md:mt-20 md:space-y-14">
          {projects.map((p, i) => (
            <article key={p.slug} data-snap aria-labelledby={`${p.slug}-title`} style={{ "--h": p.hue } as React.CSSProperties}>
              <ProjectItem project={p} priority={i === 0} />
            </article>
          ))}
        </div>
      </div>
    </section>
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
      <Link href={`/work/${project.slug}`} className="group/cs inline-flex items-center gap-1.5 font-medium">
        <span className="link">Read the case study</span>
        <ArrowRight className="size-4 transition-transform group-hover/cs:translate-x-0.5" aria-hidden />
      </Link>
      {ext("Live demo", live)}
      {ext("GitHub", github)}
    </div>
  );
}

/** Split card: copy on the left, a scrolling screenshot on the right. */
function ProjectItem({ project, priority }: { project: Project; priority?: boolean }) {
  return (
    <ProjectCard className="group grid overflow-hidden rounded-lg border border-line transition-colors duration-500 hover:border-line-2 lg:grid-cols-2">
      <div className="flex flex-col justify-between gap-10 p-6 sm:p-10">
        <div>
          <StaggerItem>
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
              <span className="font-mono text-xs text-faint">{project.index}</span>
              {project.category}
              {project.placeholder && <span className="text-faint">(placeholder)</span>}
            </p>
          </StaggerItem>
          <StaggerItem>
            <h3 id={`${project.slug}-title`} className="mt-3 text-3xl font-medium tracking-[-0.03em] sm:text-5xl">
              {project.title}
            </h3>
          </StaggerItem>
        </div>
        <div className="flex flex-col gap-5">
          <StaggerItem>
            <p className="text-lg leading-snug text-fg-2">{project.summary}</p>
          </StaggerItem>
          <StaggerItem>
            <p className="text-pretty leading-relaxed text-muted">{project.description}</p>
          </StaggerItem>
          <StaggerItem>
            <p className="text-sm text-muted">
              <span className="text-faint">Built with </span>
              {project.tech.join(", ")}
            </p>
          </StaggerItem>
          <StaggerItem>
            <Links project={project} />
          </StaggerItem>
        </div>
      </div>
      <ScrollScreen
        className="relative min-h-[20rem] overflow-hidden border-t border-line bg-ink-2 bg-[radial-gradient(120%_80%_at_100%_0%,oklch(0.55_0.08_var(--h)/0.16),transparent_60%)] sm:min-h-[28rem] lg:border-l lg:border-t-0"
        phone={project.imageMobile && <ProjectPhone project={project} />}
      >
        <ProjectScreen project={project} priority={priority} sizes="(min-width: 1024px) 640px, 130vw" />
      </ScrollScreen>
    </ProjectCard>
  );
}
