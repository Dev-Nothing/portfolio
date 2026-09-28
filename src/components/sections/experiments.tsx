import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { experiments } from "@/content/lab";
import { ExperimentsGrid } from "./experiments-grid";

export function Experiments() {
  return (
    <section id="experiments" aria-labelledby="experiments-title" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          id="experiments-title"
          label="Experiments"
          title="Things I build to try out ideas"
          intro="AI agents, scrapers, automations and small prototypes. Some turn into real projects, most just teach me something. The entries below are samples for now."
        />
        <Reveal className="mt-12 md:grid md:grid-cols-12 md:gap-8">
          <div className="md:col-span-9 md:col-start-4">
            <ExperimentsGrid items={experiments} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
