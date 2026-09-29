"use client";

import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "motion/react";
import { useRef } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

const card: Variants = {
  hidden: { opacity: 0, y: 48, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.9, ease, when: "beforeChildren", staggerChildren: 0.08 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease } },
};

/** Project card: rises into view once, then staggers its <StaggerItem> children in. */
export function ProjectCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={card}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}

/**
 * Visual panel of a project card. The screenshot wipes in from the right when the card appears,
 * then drifts upward as the card scrolls past, like the page inside is scrolling. An optional
 * phone layer moves faster for depth. Scroll-linked movement is off for reduced motion.
 */
export function ScrollScreen({
  children,
  phone,
  className = "",
}: {
  children: React.ReactNode;
  phone?: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const screenY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["4%", "-14%"]);
  const phoneY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [70, -70]);

  return (
    <div ref={ref} className={className}>
      <motion.div
        className="absolute left-6 top-8 w-[135%] sm:left-10 sm:top-10 sm:w-[115%]"
        variants={{
          hidden: { opacity: 0, x: 80, clipPath: "inset(0% 0% 0% 100%)" },
          show: { opacity: 1, x: 0, clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.1, ease, delay: 0.1 } },
        }}
      >
        <motion.div style={{ y: screenY }}>
          <div className="transition-transform duration-500 ease-out-expo group-hover:-translate-x-2">{children}</div>
        </motion.div>
      </motion.div>
      {phone && (
        <motion.div
          className="absolute bottom-6 right-5 w-[30%] max-w-[170px] sm:right-8"
          variants={{
            hidden: { opacity: 0, y: 80, rotate: 6 },
            show: { opacity: 1, y: 0, rotate: 0, transition: { duration: 1, ease, delay: 0.45 } },
          }}
        >
          <motion.div style={{ y: phoneY }}>
            <div className="transition-transform duration-500 ease-out-expo group-hover:-translate-y-2">{phone}</div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
