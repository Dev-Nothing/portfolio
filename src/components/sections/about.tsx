import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import { Reveal } from "@/components/reveal";

const facts = [
  ["Now", "Next.js and TypeScript, with AI coding tools"],
  ["Before", "PHP, Laravel and MySQL: APIs, dashboards, integrations"],
  ["Good at", "Taking a product from idea to production and keeping it running"],
  ["Works", "Remote, happy with async, writes clear updates"],
] as const;

// Drop a photo at public/portrait.jpg (ideally 4:5, at least 800px wide) and it shows up here.
const hasPortrait = existsSync(join(process.cwd(), "public", "portrait.jpg"));

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="grid gap-10 border-t border-line pt-6 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-3">
            <p className="text-sm text-muted">About</p>
            {hasPortrait && (
              <Image
                src="/portrait.jpg"
                alt="Louis Jay Fuentes"
                width={800}
                height={1000}
                sizes="(min-width: 768px) 240px, 60vw"
                className="mt-6 aspect-[4/5] w-3/5 rounded-md object-cover grayscale-[20%] md:w-full"
              />
            )}
          </div>
          <div className="md:col-span-6">
            <h2 id="about-title" className="text-3xl font-medium leading-[1.1] tracking-[-0.025em] sm:text-4xl md:text-[2.75rem]">
              Some background
            </h2>
            <div className="mt-6 space-y-5 text-pretty text-lg leading-relaxed text-fg-2">
              <p>
                I&apos;m a full-stack web developer. I learned the job building PHP and Laravel apps: REST APIs, admin
                dashboards, and integrations with whatever third-party service a project needed that week.
              </p>
              <p>
                Now I mostly work in Next.js and TypeScript, and AI coding tools are part of how I build every day. They
                make me a lot faster. The experience is what tells me when the code they write is wrong.
              </p>
              <p className="text-muted">
                I like owning a product from start to finish, from the first rough idea to the version real people use.
              </p>
            </div>
          </div>
          <dl className="space-y-5 md:col-span-3 md:pt-2">
            {facts.map(([k, v]) => (
              <div key={k}>
                <dt className="text-sm text-faint">{k}</dt>
                <dd className="mt-1 text-[15px] leading-snug text-fg-2">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
