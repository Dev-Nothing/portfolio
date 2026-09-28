// Coded UI mocks used until real screenshots exist. Pure markup — no JS, no images to break.
// Each reads its tint from the --h (hue) CSS variable set by the parent.

// Chroma is scaled down so the mocks stay muted next to the rest of the page.
const tint = (l: number, c: number, a = 1) => `oklch(${l} ${(c * 0.6).toFixed(3)} var(--h) / ${a})`;

function Bar({ w, className = "" }: { w: string; className?: string }) {
  return <span className={`block h-1.5 rounded-full bg-white/10 ${className}`} style={{ width: w }} />;
}

export function PlaceholderTag() {
  return (
    <span className="absolute bottom-3 right-3 z-10 rounded border border-line-2 bg-ink px-2 py-1 font-mono text-[10px] text-muted">
      placeholder, screenshot coming
    </span>
  );
}

export function DashboardMock() {
  return (
    <div className="grid aspect-[16/10] grid-cols-[18%_1fr] text-[10px]">
      <aside className="flex flex-col gap-3 border-r border-line bg-white/[0.015] p-3">
        <div className="mb-2 flex items-center gap-2">
          <span className="size-4 rounded" style={{ background: tint(0.75, 0.13) }} />
          <Bar w="55%" />
        </div>
        {["70%", "55%", "80%", "60%", "45%"].map((w, i) => (
          <div
            key={i}
            className={`flex items-center gap-2 rounded-md px-2 py-1.5 ${i === 0 ? "bg-white/[0.06]" : ""}`}
          >
            <span className="size-2 rounded-sm bg-white/15" />
            <Bar w={w} className={i === 0 ? "bg-white/25" : ""} />
          </div>
        ))}
        <div className="mt-auto rounded-md border border-line p-2">
          <Bar w="80%" />
          <Bar w="50%" className="mt-1.5" />
        </div>
      </aside>
      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="block text-[13px] font-medium text-fg-2">Overview</span>
            <Bar w="7rem" className="mt-1.5" />
          </div>
          <div className="flex gap-2">
            <span className="h-6 w-24 rounded-md border border-line bg-white/[0.02]" />
            <span className="h-6 w-16 rounded-md" style={{ background: tint(0.78, 0.13, 0.9) }} />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-lg border border-line bg-white/[0.02] p-3">
              <Bar w="45%" />
              <span className="mt-3 block h-3 w-3/5 rounded bg-white/20" />
              <span className="mt-2 block h-1 w-full rounded-full bg-white/5">
                <span
                  className="block h-1 rounded-full"
                  style={{ width: `${40 + i * 18}%`, background: tint(0.78, 0.13, 0.8) }}
                />
              </span>
            </div>
          ))}
        </div>
        <div className="grid flex-1 grid-cols-[1.6fr_1fr] gap-3">
          <div className="relative overflow-hidden rounded-lg border border-line bg-white/[0.02] p-3">
            <Bar w="30%" />
            <svg viewBox="0 0 200 70" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-3/4 w-full" aria-hidden>
              <defs>
                <linearGradient id="dash-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="currentColor" stopOpacity="0.35" />
                  <stop offset="1" stopColor="currentColor" stopOpacity="0" />
                </linearGradient>
              </defs>
              <g style={{ color: tint(0.78, 0.13) }}>
                <path d="M0 55 C20 50 30 38 50 40 S80 22 100 28 S140 12 160 18 S190 6 200 8 V70 H0Z" fill="url(#dash-area)" />
                <path d="M0 55 C20 50 30 38 50 40 S80 22 100 28 S140 12 160 18 S190 6 200 8" fill="none" stroke="currentColor" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
              </g>
            </svg>
          </div>
          <div className="space-y-2 rounded-lg border border-line bg-white/[0.02] p-3">
            <Bar w="40%" />
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-2 pt-1">
                <span className="size-4 rounded-full bg-white/10" />
                <Bar w={`${70 - i * 10}%`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function DashboardPhoneMock() {
  return (
    <div className="flex aspect-[9/19] flex-col gap-2.5 p-3 pt-8 text-[9px]">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium text-fg-2">Overview</span>
        <span className="size-5 rounded-full bg-white/10" />
      </div>
      {[0, 1].map((i) => (
        <div key={i} className="rounded-lg border border-line bg-white/[0.03] p-2.5">
          <Bar w="40%" />
          <span className="mt-2 block h-2.5 w-1/2 rounded bg-white/20" />
        </div>
      ))}
      <div className="relative h-20 overflow-hidden rounded-lg border border-line bg-white/[0.02]">
        <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute inset-0 size-full" aria-hidden>
          <path
            d="M0 32 C15 28 25 20 40 22 S65 10 80 13 S95 5 100 6"
            fill="none"
            style={{ stroke: tint(0.78, 0.13) }}
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex items-center gap-2 rounded-md bg-white/[0.02] p-2">
          <span className="size-4 rounded-full bg-white/10" />
          <Bar w={`${60 - i * 8}%`} />
        </div>
      ))}
      <span className="mt-auto h-7 rounded-full" style={{ background: tint(0.78, 0.13, 0.9) }} />
    </div>
  );
}

export function WorkspaceMock() {
  const cols = [
    { name: "Backlog", cards: 3 },
    { name: "In progress", cards: 2 },
    { name: "Review", cards: 2 },
    { name: "Done", cards: 3 },
  ];
  return (
    <div className="flex aspect-[21/9] flex-col text-[10px]">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <div className="flex items-center gap-3">
          <span className="size-4 rounded" style={{ background: tint(0.72, 0.1) }} />
          <span className="text-[12px] font-medium text-fg-2">Workspace</span>
          <span className="hidden gap-1 sm:flex">
            {["Board", "List", "Timeline"].map((t, i) => (
              <span key={t} className={`rounded-md px-2 py-0.5 ${i === 0 ? "bg-white/[0.07] text-fg-2" : "text-faint"}`}>
                {t}
              </span>
            ))}
          </span>
        </div>
        <div className="flex -space-x-1.5">
          {[0.7, 0.6, 0.5].map((l, i) => (
            <span key={i} className="size-5 rounded-full border-2 border-ink-2" style={{ background: tint(l, 0.06) }} />
          ))}
        </div>
      </div>
      <div className="grid flex-1 grid-cols-4 gap-3 p-4">
        {cols.map((c, ci) => (
          <div key={c.name} className="flex flex-col gap-2 rounded-lg bg-white/[0.015] p-2">
            <div className="flex items-center justify-between px-1 text-faint">
              <span>{c.name}</span>
              <span>{c.cards}</span>
            </div>
            {Array.from({ length: c.cards }).map((_, i) => (
              <div
                key={i}
                className="rounded-md border border-line bg-surface p-2.5"
                style={ci === 1 && i === 0 ? { borderColor: tint(0.72, 0.1, 0.5) } : undefined}
              >
                <Bar w={`${85 - i * 15}%`} className="bg-white/15" />
                <Bar w="50%" className="mt-1.5" />
                <div className="mt-2.5 flex items-center justify-between">
                  <span className="rounded px-1.5 py-0.5 text-[8px]" style={{ background: tint(0.72, 0.1, 0.15), color: tint(0.8, 0.1) }}>
                    tag
                  </span>
                  <span className="size-3.5 rounded-full bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function AssistantMock() {
  return (
    <div className="grid aspect-[4/3] grid-cols-[1fr_0.8fr] text-[10px]">
      <div className="flex flex-col gap-3 border-r border-line p-4">
        <div className="flex items-center gap-2">
          <span className="size-4 rounded-full" style={{ background: tint(0.75, 0.12) }} />
          <span className="text-[12px] font-medium text-fg-2">Assistant</span>
        </div>
        <div className="ml-auto max-w-[80%] rounded-xl rounded-br-sm bg-white/[0.07] p-2.5">
          <Bar w="10rem" className="bg-white/20" />
          <Bar w="6rem" className="mt-1.5 bg-white/20" />
        </div>
        <div className="max-w-[85%] rounded-xl rounded-bl-sm border border-line bg-white/[0.02] p-2.5">
          {["95%", "88%", "70%"].map((w, i) => (
            <Bar key={i} w={w} className={i ? "mt-1.5" : ""} />
          ))}
          <div className="mt-2.5 flex gap-1.5">
            {[0, 1].map((i) => (
              <span key={i} className="rounded-md border px-1.5 py-0.5 text-[8px]" style={{ borderColor: tint(0.75, 0.12, 0.35), color: tint(0.82, 0.1) }}>
                source {i + 1}
              </span>
            ))}
          </div>
        </div>
        <div className="ml-auto max-w-[70%] rounded-xl rounded-br-sm bg-white/[0.07] p-2.5">
          <Bar w="7rem" className="bg-white/20" />
        </div>
        <div className="flex items-center gap-1.5 px-1" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-1.5 rounded-full" style={{ background: tint(0.75, 0.12, 0.8 - i * 0.2) }} />
          ))}
        </div>
        <div className="mt-auto flex items-center gap-2 rounded-lg border border-line-2 bg-white/[0.02] p-2">
          <Bar w="50%" />
          <span className="ml-auto size-5 rounded-md" style={{ background: tint(0.75, 0.12) }} />
        </div>
      </div>
      <div className="flex flex-col gap-2.5 bg-white/[0.012] p-4">
        <span className="text-faint">Document</span>
        <span className="block h-2.5 w-3/4 rounded bg-white/15" />
        {["100%", "92%", "96%", "60%"].map((w, i) => (
          <Bar key={i} w={w} />
        ))}
        <div className="my-1 rounded-md p-2" style={{ background: tint(0.75, 0.12, 0.1) }}>
          <Bar w="90%" className="bg-white/20" />
          <Bar w="70%" className="mt-1.5 bg-white/20" />
        </div>
        {["94%", "85%", "40%"].map((w, i) => (
          <Bar key={i} w={w} />
        ))}
      </div>
    </div>
  );
}
