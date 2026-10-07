"use client";

import { useEffect } from "react";

/**
 * Page backdrop: drifting glows, a faint dot grid and grain (all CSS, see .backdrop in globals.css),
 * plus a soft spotlight that follows the pointer. The same listener feeds --sx/--sy to any
 * [data-spotlight] element under the pointer, for card hover glows. Fine pointers only.
 */
export function Backdrop() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const root = document.documentElement;
    let frame = 0;
    let last: PointerEvent | null = null;

    const update = () => {
      frame = 0;
      if (!last) return;
      const { clientX: x, clientY: y, target } = last;
      root.style.setProperty("--mx", `${x}px`);
      root.style.setProperty("--my", `${y}px`);
      root.dataset.pointer = "on";
      const card = target instanceof Element ? target.closest<HTMLElement>("[data-spotlight]") : null;
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--sx", `${x - r.left}px`);
        card.style.setProperty("--sy", `${y - r.top}px`);
      }
    };
    const onMove = (e: PointerEvent) => {
      last = e;
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onLeave = () => delete root.dataset.pointer;

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="backdrop" aria-hidden>
      <div className="backdrop-glow backdrop-glow-a" />
      <div className="backdrop-glow backdrop-glow-b" />
      <div className="backdrop-grid" />
      <div className="backdrop-spot" />
      <div className="backdrop-grain" />
    </div>
  );
}
