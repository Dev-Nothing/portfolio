import { Reveal } from "@/components/reveal";

type SectionHeadingProps = {
  id: string;
  label: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
};

/** Editorial section header: small label in the left column, title and intro on the right. */
export function SectionHeading({ id, label, title, intro }: SectionHeadingProps) {
  return (
    <Reveal as="header" className="grid gap-4 border-t border-line pt-6 md:grid-cols-12 md:gap-8">
      <p className="text-sm text-muted md:col-span-3">{label}</p>
      <div className="md:col-span-9">
        <h2 id={id} className="max-w-3xl text-balance text-3xl font-medium leading-[1.1] tracking-[-0.025em] sm:text-4xl md:text-[2.75rem]">
          {title}
        </h2>
        {intro ? <div className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted">{intro}</div> : null}
      </div>
    </Reveal>
  );
}
