"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Stage = { name: string; text: string; Example: () => React.JSX.Element };

/**
 * Walks through Idea → Architecture → Build → Test → Ship with a concrete example for each.
 * Advances slowly while visible until the visitor picks a stage. Example content is illustrative.
 */
export function HeroPipeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);

  const auto = !reduce && !touched && inView;

  useEffect(() => {
    if (!auto) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % STAGES.length), 6000);
    return () => clearTimeout(t);
  }, [auto, active]);

  const stage = STAGES[active];

  return (
    <div ref={ref} className="rounded-lg border border-line bg-ink-2">
      <div role="tablist" aria-label="How a project moves from idea to production" className="grid grid-cols-5 border-b border-line">
        {STAGES.map((s, i) => {
          const on = i === active;
          return (
            <button
              key={s.name}
              type="button"
              role="tab"
              id={`stage-tab-${i}`}
              aria-selected={on}
              aria-controls="stage-panel"
              onClick={() => {
                setActive(i);
                setTouched(true);
              }}
              className={`relative px-2 py-3.5 text-left text-[13px] transition-colors sm:px-5 sm:text-sm ${
                on ? "text-fg" : "text-faint hover:text-muted"
              } ${i > 0 ? "border-l border-line" : ""}`}
            >
              <span className="mr-2 hidden font-mono text-xs text-faint sm:inline">{i + 1}</span>
              {s.name === "Architecture" ? (
                <>
                  <span className="sm:hidden">Plan</span>
                  <span className="hidden sm:inline">Architecture</span>
                </>
              ) : (
                s.name
              )}
              {on && (
                <motion.span
                  layoutId="stage-underline"
                  className="absolute inset-x-0 -bottom-px h-0.5 bg-fg"
                  transition={{ type: "spring", stiffness: 500, damping: 40 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* fixed height so switching stages never moves the page */}
      <div id="stage-panel" role="tabpanel" aria-labelledby={`stage-tab-${active}`} className="relative h-[27rem] overflow-hidden sm:h-[17rem]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid h-full content-start gap-5 p-5 sm:grid-cols-12 sm:gap-8 sm:p-7"
          >
            <p className="text-pretty text-[15px] leading-relaxed text-fg-2 sm:col-span-4">{stage.text}</p>
            <div className="min-w-0 sm:col-span-8">
              <stage.Example />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ——— examples ——— */

function Label({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 font-mono text-xs text-faint">{children}</p>;
}

function IdeaExample() {
  const reqs = [
    ["Clients log in and see where their project is at", "must"],
    ["Upload files and approve deliverables", "must"],
    ["Invoices pulled in from the payment provider", "must"],
    ["Slack message when something is approved", "later"],
  ] as const;
  return (
    <div>
      <Label>brief.md</Label>
      <p className="mb-3 font-medium">Client portal for a small agency</p>
      <ul className="space-y-2 text-sm text-fg-2">
        {reqs.map(([r, tag]) => (
          <li key={r} className="flex items-baseline justify-between gap-4 border-b border-line pb-2">
            {r}
            <span className={`shrink-0 font-mono text-xs ${tag === "must" ? "text-muted" : "text-faint"}`}>{tag}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 hidden text-sm text-muted sm:block">Open question: does one person approve on the client side, or a team?</p>
    </div>
  );
}

function ArchitectureExample() {
  const tables = [
    ["users", "id, email, role, client_id"],
    ["projects", "id, client_id, name, status"],
    ["files", "id, project_id, url, approved_at"],
    ["invoices", "id, client_id, provider_id, paid_at"],
  ];
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <div>
        <Label>schema</Label>
        <ul className="space-y-2 font-mono text-xs">
          {tables.map(([t, cols]) => (
            <li key={t} className="border-b border-line pb-2">
              <span className="text-fg">{t}</span>
              <span className="block text-muted">{cols}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="hidden sm:block">
        <Label>routes</Label>
        <ul className="space-y-2 font-mono text-xs text-fg-2">
          {[
            ["GET", "/projects/[id]"],
            ["POST", "/api/files"],
            ["POST", "/api/files/[id]/approve"],
            ["POST", "/api/webhooks/payments"],
          ].map(([m, r]) => (
            <li key={r} className="flex gap-3 border-b border-line pb-2">
              <span className="w-9 text-muted">{m}</span>
              {r}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function BuildExample() {
  const lines = [
    "export async function approveFile(id: string) {",
    "  const user = await requireClient();",
    "  const file = await db.file.findFirst({",
    "    where: { id, project: { clientId: user.clientId } },",
    "  });",
    "  if (!file) notFound();",
    "  await db.file.update({ where: { id }, data: { approvedAt: new Date() } });",
    "}",
  ];
  return (
    <div>
      <Label>app/projects/actions.ts</Label>
      <pre className="overflow-hidden rounded border border-line bg-ink p-3 font-mono text-[11.5px] leading-[1.7] text-fg-2">
        {lines.map((l, i) => (
          <span key={i} className={`block overflow-hidden text-ellipsis ${i === 3 ? "text-fg" : ""}`}>
            {l}
            {i === 3 && <span className="ml-3 text-ember">{"// added in review"}</span>}
          </span>
        ))}
      </pre>
    </div>
  );
}

function TestExample() {
  const tests: [string, boolean][] = [
    ["redirects logged-out users to /login", false],
    ["a client only sees their own projects", true],
    ["approving twice doesn't create two records", false],
    ["payment webhook rejects a bad signature", false],
  ];
  return (
    <div>
      <Label>npm test</Label>
      <ul className="space-y-2 text-sm text-fg-2">
        {tests.map(([t, fixed]) => (
          <li key={t} className="flex items-center gap-3 border-b border-line pb-2">
            <Check className="size-3.5 shrink-0 text-ok" strokeWidth={3} aria-hidden />
            <span className="flex-1">{t}</span>
            {fixed && <span className="shrink-0 font-mono text-xs text-ember">failed first</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ShipExample() {
  const steps = [
    ["Type check and lint", "passed"],
    ["Build", "passed"],
    ["Preview deploy checked by hand", "done"],
    ["Production", "live"],
  ];
  return (
    <div>
      <Label>deploy</Label>
      <ul className="space-y-2 text-sm text-fg-2">
        {steps.map(([s, st]) => (
          <li key={s} className="flex items-center justify-between gap-4 border-b border-line pb-2">
            {s}
            <span className={`font-mono text-xs ${st === "live" ? "text-ok" : "text-muted"}`}>{st}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 hidden text-sm text-muted sm:block">After launch: watch the logs for a few days and fix what people run into.</p>
    </div>
  );
}

const STAGES: Stage[] = [
  {
    name: "Idea",
    text: "Start with the problem. What does the product need to do on day one, and what can wait?",
    Example: IdeaExample,
  },
  {
    name: "Architecture",
    text: "Decide the data model and routes before writing any code. Mistakes here are the expensive ones.",
    Example: ArchitectureExample,
  },
  {
    name: "Build",
    text: "Build it in small, working pieces, so there is something real to review at every step.",
    Example: BuildExample,
  },
  {
    name: "Test",
    text: "Tests for the parts that hurt when they break: auth, permissions, payments. This is where the real bugs show up.",
    Example: TestExample,
  },
  {
    name: "Ship",
    text: "Deploy, connect the real integrations, and stick around for the fixes that only appear in production.",
    Example: ShipExample,
  },
];
