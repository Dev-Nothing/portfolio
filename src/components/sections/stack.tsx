import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { stack } from "@/content/lab";

export function Stack() {
  return (
    <section id="stack" aria-labelledby="stack-title" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading id="stack-title" label="Tools" title="What I work with" />
        <Reveal className="mt-12 grid gap-10 sm:grid-cols-3 md:grid-cols-12 md:gap-8">
          {stack.map((g, i) => (
            <div key={g.group} className={i === 0 ? "md:col-span-3 md:col-start-4" : "md:col-span-3"}>
              <h3 className="border-b border-line pb-3 text-sm text-muted">{g.group}</h3>
              <ul className="mt-3 space-y-1.5 text-lg">
                {g.items.map((t) => (
                  <li key={t} className={i === 2 ? "text-fg-2" : ""}>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
