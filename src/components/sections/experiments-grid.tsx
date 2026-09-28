"use client";

import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import type { Experiment, ExperimentStatus } from "@/content/lab";

const STATUS: Record<ExperimentStatus, { label: string; dot: string }> = {
  live: { label: "Live", dot: "bg-ok" },
  building: { label: "Building", dot: "bg-warn" },
  experiment: { label: "Experiment", dot: "bg-[#7fa7e0]" },
  archived: { label: "Archived", dot: "bg-faint" },
};

const FILTERS: ("all" | ExperimentStatus)[] = ["all", "live", "building", "experiment", "archived"];

export function ExperimentsGrid({ items }: { items: Experiment[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("all");
  const shown = filter === "all" ? items : items.filter((e) => e.status === filter);

  return (
    <div>
      <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm" role="group" aria-label="Filter by status">
        {FILTERS.map((f) => {
          const count = f === "all" ? items.length : items.filter((e) => e.status === f).length;
          const on = filter === f;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={on}
              disabled={count === 0}
              className={`underline-offset-[6px] transition-colors disabled:opacity-40 ${
                on ? "text-fg underline decoration-fg/40" : "text-muted hover:text-fg"
              }`}
            >
              {f === "all" ? "All" : STATUS[f].label} <span className="text-faint">{count}</span>
            </button>
          );
        })}
      </div>

      <ul className="mt-6 border-t border-line">
        {shown.map((e) => (
          <li key={e.id}>
            <Row e={e} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Row({ e }: { e: Experiment }) {
  const s = STATUS[e.status];
  const real = e.href !== "#";
  const inner = (
    <>
      <span className="hidden font-mono text-xs text-faint sm:block sm:pt-1">{e.id}</span>
      <span className="min-w-0">
        <span className="flex items-center gap-2 font-medium">
          {e.name}
          {real && (
            <ArrowUpRight className="size-3.5 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          )}
        </span>
        <span className="mt-1 block text-pretty text-[15px] leading-relaxed text-muted">{e.summary}</span>
        <span className="mt-2 block font-mono text-xs text-faint md:hidden">{e.stack.join(" · ")}</span>
      </span>
      <span className="hidden pt-1 font-mono text-xs text-muted md:block">{e.stack.join(" · ")}</span>
      <span className="flex items-center gap-2 pt-0.5 text-sm text-fg-2 sm:justify-end">
        <span className={`size-1.5 rounded-full ${s.dot}`} aria-hidden />
        {s.label}
      </span>
    </>
  );
  const cls =
    "group grid grid-cols-[1fr_auto] items-start gap-x-6 gap-y-2 border-b border-line py-5 sm:grid-cols-[2.5rem_1fr_7rem] md:grid-cols-[2.5rem_1fr_14rem_7rem]";
  return real ? (
    <a href={e.href} target="_blank" rel="noopener noreferrer" className={`${cls} transition-colors hover:bg-white/[0.02]`}>
      {inner}
    </a>
  ) : (
    <div className={cls}>{inner}</div>
  );
}
