import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { services } from "@/content/lab";

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          id="services-title"
          label="Services"
          title="What you can hire me for"
          intro={
            <>
              Not sure your project fits?{" "}
              <a href="#contact" className="link text-fg-2">
                Ask me.
              </a>{" "}
              If I&apos;m not the right person for it, I&apos;ll say so.
            </>
          }
        />
        <Reveal className="mt-12 md:grid md:grid-cols-12 md:gap-8">
          <ul className="grid gap-x-8 sm:grid-cols-2 md:col-span-9 md:col-start-4">
            {services.map((s) => (
              <li key={s.name} className="border-b border-line py-5">
                <h3 className="font-medium">{s.name}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-muted">{s.detail}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
