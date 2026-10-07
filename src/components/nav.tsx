"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navItems, site } from "@/content/site";

export function Nav({ home = true }: { home?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Underline the nav item for whichever section is crossing the middle of the viewport.
  useEffect(() => {
    if (!home) return;
    // Watch every section, so the underline clears on ones that aren't in the nav (e.g. Services).
    const inNav = new Set<string>(navItems.map((i) => i.href));
    const sections = document.querySelectorAll<HTMLElement>("main section[id]");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const id = `#${e.target.id}`;
          setActive(inNav.has(id) ? id : null);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [home]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const href = (h: string) => (home ? h : `/${h}`);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open ? "border-line bg-ink/95" : "border-transparent bg-ink/0"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link href={home ? "#top" : "/"} className="text-[15px] font-medium" onClick={() => setOpen(false)}>
          {site.name}
        </Link>

        <div className="flex items-center gap-8">
          {site.available && (
            <p className="hidden items-center gap-2 text-sm text-muted lg:flex">
              <span className="size-1.5 rounded-full bg-ok" aria-hidden />
              {site.availability}
            </p>
          )}
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-7">
              {navItems.map((item) => {
                const isActive = active === item.href;
                return (
                  <li key={item.href}>
                    <a
                      href={href(item.href)}
                      aria-current={isActive ? "true" : undefined}
                      className={`grow-line text-sm transition-colors ${
                        isActive ? "text-fg" : "text-muted hover:text-fg"
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="text-sm text-fg md:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 bottom-0 top-16 bg-ink md:hidden"
          >
            <nav aria-label="Mobile" className="flex h-full flex-col justify-between px-5 pb-10 pt-6">
              <ul>
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={href(item.href)}
                      onClick={() => setOpen(false)}
                      className="block border-b border-line py-4 text-3xl font-medium tracking-[-0.02em]"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              {site.available && (
                <p className="flex items-center gap-2 text-sm text-muted">
                  <span className="size-1.5 rounded-full bg-ok" aria-hidden />
                  {site.availability}
                </p>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
