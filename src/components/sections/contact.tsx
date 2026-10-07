import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { channels } from "@/components/ui/channels";
import { site } from "@/content/site";
import { CopyEmail } from "./copy-email";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="pb-20 pt-20 md:pb-28 md:pt-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="border-t border-line pt-6 md:grid md:grid-cols-12 md:gap-8">
          <p className="text-sm text-muted md:col-span-3">Contact</p>
          <div className="mt-6 md:col-span-9 md:mt-0">
            <h2 id="contact-title" className="max-w-[14ch] text-balance text-[clamp(2.75rem,7.5vw,6rem)] font-medium leading-[0.98] tracking-[-0.04em]">
              Have an idea worth building?
            </h2>
            <p className="mt-8 max-w-xl text-pretty text-xl leading-relaxed text-fg-2">
              Tell me what you&apos;re working on. A few sentences is enough. I&apos;ll reply with some questions, a
              rough plan, and an honest answer on whether I&apos;m a good fit.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent("Project inquiry")}`}
                className="group inline-flex items-center gap-2 text-2xl font-medium tracking-[-0.02em] sm:text-3xl"
              >
                <span className="link">{site.email}</span>
                <ArrowUpRight className="hidden size-6 shrink-0 text-muted transition-transform sm:block group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </a>
              <CopyEmail email={site.email} />
            </div>

            <ul className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-6 text-[15px]">
              {channels
                .filter((c) => c.label !== "Email")
                .map(({ label, href, Icon, external }) => (
                  <li key={label}>
                    <a
                      href={href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group inline-flex items-center gap-2 text-fg-2 transition-colors hover:text-fg"
                    >
                      <Icon className="size-4 text-muted transition-[color,rotate,scale] duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:text-ember" aria-hidden />
                      <span className="link">{label}</span>
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
