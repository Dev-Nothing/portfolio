import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { process } from "@/content/lab";

type Line = { n?: number; kind: "ctx" | "del" | "add"; code: string; note?: string };

// An illustrative AI-generated draft and the review comments it got.
const review: Line[] = [
  { n: 1, kind: "ctx", code: "export async function POST(req: Request) {" },
  { n: 2, kind: "del", code: "  const event = await req.json();", note: "Verify the signature before using this." },
  { n: 2, kind: "add", code: "  const event = await verifyWebhook(req);" },
  { n: 3, kind: "add", code: "  if (await alreadyHandled(event.id)) return ok();", note: "The provider retries. Skip duplicates." },
  { n: 4, kind: "ctx", code: "  const ids = event.data.items.map((i) => i.orderId);" },
  { n: 5, kind: "del", code: "  for (const id of ids) await markPaid(id);", note: "One query per order. Do it in one." },
  { n: 5, kind: "add", code: "  await db.order.updateMany({ where: { id: { in: ids } }, … });" },
  { n: 6, kind: "ctx", code: "  return Response.json({ received: true });" },
  { n: 7, kind: "ctx", code: "}" },
];

export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          id="process-title"
          label="How I work"
          title="AI writes a lot of my first drafts. Deciding what's right is still my job."
          intro="Using AI well mostly means knowing what to ask for and noticing when the answer is wrong. This is roughly how every project goes."
        />

        <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-12 md:gap-8">
          <ol className="border-t border-line md:col-span-9 md:col-start-4">
            {process.map((s, i) => (
              <Reveal as="li" key={s.step} delay={i * 0.04} className="grid grid-cols-[1.75rem_1fr] gap-x-4 gap-y-1 border-b border-line py-5 sm:grid-cols-[1.75rem_9rem_1fr]">
                <span className="pt-0.5 font-mono text-sm text-faint">{s.step}</span>
                <h3 className="font-medium">{s.name}</h3>
                <p className="col-start-2 text-pretty text-[15px] leading-relaxed text-muted sm:col-start-3">{s.detail}</p>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal className="mt-16 grid gap-6 md:mt-20 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-3">
            <p className="text-sm text-muted">An example review</p>
            <p className="mt-2 max-w-xs text-pretty text-sm leading-relaxed text-faint">
              The AI&apos;s version of this webhook handler worked when I tried it once. It also trusted unverified
              input, ran a query per order, and would process retried events twice.
            </p>
          </div>
          <div className="min-w-0 md:col-span-9">
            <ReviewCard />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ReviewCard() {
  return (
    <figure className="overflow-hidden rounded-lg border border-line bg-ink-2">
      <figcaption className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
        <span className="font-mono text-xs text-fg-2">app/api/webhooks/payments/route.ts</span>
        <span className="text-xs text-muted">3 comments, changes applied</span>
      </figcaption>

      <div className="py-2 font-mono text-[12px] leading-[1.9]">
        {review.map((l, i) => (
          <div key={i} className="grid grid-cols-[2.25rem_1fr] lg:grid-cols-[2.5rem_1fr_19rem]">
            <span
              className={`select-none pr-3 text-right ${
                l.kind === "ctx" ? "text-faint" : l.kind === "del" ? "text-bad/70" : "text-ok/70"
              }`}
            >
              {l.kind === "del" ? "-" : l.kind === "add" ? "+" : l.n}
            </span>
            <code
              className={`overflow-hidden text-ellipsis whitespace-pre pr-4 ${
                l.kind === "del" ? "bg-bad/[0.08] text-fg-2/60" : l.kind === "add" ? "bg-ok/[0.07] text-fg" : "text-fg-2"
              }`}
            >
              {l.code}
            </code>
            {l.note ? (
              <p className="col-start-2 my-1.5 mr-4 flex items-start gap-2 rounded border border-line bg-ink p-2 font-sans text-[13px] leading-snug text-fg-2 lg:col-start-3 lg:my-0 lg:ml-3 lg:mr-3 lg:self-start lg:border-0 lg:bg-transparent lg:p-0 lg:pt-[3px]">
                <span
                  aria-label="Louie"
                  className="grid size-5 shrink-0 place-items-center rounded-full bg-surface font-mono text-[9px] text-muted"
                >
                  LF
                </span>
                {l.note}
              </p>
            ) : (
              <span aria-hidden className="hidden lg:block" />
            )}
          </div>
        ))}
      </div>
    </figure>
  );
}
