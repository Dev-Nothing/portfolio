import { ArrowDown } from "lucide-react";
import { HeroPipeline } from "@/components/hero-pipeline";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section id="top" className="pb-24 pt-32 sm:pt-40 md:pb-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="rise text-sm text-muted [--d:0ms]">Louis Jay Fuentes, full-stack developer</p>

        <h1 className="rise mt-6 max-w-[19ch] text-balance text-[clamp(2.5rem,6.6vw,5.5rem)] font-medium leading-[1.02] tracking-[-0.035em] [--d:60ms]">
          I build web apps, from the first idea to production.
        </h1>

        <div className="mt-10 grid gap-10 md:grid-cols-12 md:gap-8">
          <p className="rise max-w-lg text-pretty text-xl leading-relaxed text-fg-2 [--d:140ms] md:col-span-7">
            You bring the idea. I plan it, build it and get it live, and I test everything before it ships.
          </p>
          <div className="rise flex flex-col gap-3 [--d:220ms] sm:flex-row md:col-span-5 md:items-end md:justify-end">
            <Button href="#work" icon={<ArrowDown className="size-4" aria-hidden />}>
              View my work
            </Button>
            <Button href="#contact" variant="secondary">
              Let&apos;s work together
            </Button>
          </div>
        </div>

        <div className="rise mt-16 [--d:300ms] md:mt-20">
          <HeroPipeline />
        </div>
      </div>
    </section>
  );
}
