import { Lock } from "lucide-react";

/** Minimal browser chrome around a screenshot or mock. */
export function BrowserFrame({
  url,
  children,
  className = "",
}: {
  url: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-md border border-line-2 bg-ink-2 shadow-[0_24px_60px_-24px_rgb(0_0_0/0.7)] ${className}`}
    >
      <div className="flex h-8 items-center gap-3 border-b border-line bg-surface px-3">
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-white/10" />
          <span className="size-2.5 rounded-full bg-white/10" />
          <span className="size-2.5 rounded-full bg-white/10" />
        </div>
        <div className="mx-auto flex h-5 w-full max-w-[16rem] items-center justify-center gap-1.5 rounded-md bg-white/[0.04] px-3 font-mono text-[10px] text-faint">
          <Lock className="size-2.5" aria-hidden />
          {url}
        </div>
        <div className="w-10" aria-hidden />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

/** Phone frame for a layered mobile view. */
export function PhoneFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-[1.5rem] border border-line-2 bg-ink-2 p-1.5 shadow-[0_24px_50px_-16px_rgb(0_0_0/0.8)] ${className}`}
    >
      <div className="relative overflow-hidden rounded-[1.35rem] bg-ink">
        <div className="absolute left-1/2 top-1.5 z-10 h-4 w-14 -translate-x-1/2 rounded-full bg-black" aria-hidden />
        {children}
      </div>
    </div>
  );
}
