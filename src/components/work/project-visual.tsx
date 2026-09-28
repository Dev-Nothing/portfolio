import Image from "next/image";
import type { Project } from "@/content/projects";
import { BrowserFrame, PhoneFrame } from "./frames";
import { AssistantMock, DashboardMock, DashboardPhoneMock, PlaceholderTag, WorkspaceMock } from "./mocks";

const mocks = {
  dashboard: DashboardMock,
  workspace: WorkspaceMock,
  assistant: AssistantMock,
};

/** Browser-framed screenshot, or a coded mock when no screenshot is set. */
export function ProjectScreen({
  project,
  sizes,
  priority,
  className,
}: {
  project: Project;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const Mock = mocks[project.mock];
  return (
    <BrowserFrame url={project.url} className={className}>
      {project.image ? (
        <Image
          src={project.image.src}
          alt={project.image.alt}
          width={project.image.width}
          height={project.image.height}
          sizes={sizes}
          priority={priority}
          className="h-auto w-full"
        />
      ) : (
        <>
          <Mock />
          <PlaceholderTag />
        </>
      )}
    </BrowserFrame>
  );
}

export function ProjectPhone({ project, className }: { project: Project; className?: string }) {
  return (
    <PhoneFrame className={className}>
      {project.imageMobile ? (
        <Image
          src={project.imageMobile.src}
          alt={project.imageMobile.alt}
          width={project.imageMobile.width}
          height={project.imageMobile.height}
          sizes="200px"
          className="h-auto w-full"
        />
      ) : (
        <DashboardPhoneMock />
      )}
    </PhoneFrame>
  );
}
