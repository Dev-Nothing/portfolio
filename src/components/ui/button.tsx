import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  icon?: React.ReactNode;
  className?: string;
};

const base =
  "group inline-flex h-11 items-center justify-center gap-2 rounded-md px-5 text-[15px] font-medium transition-colors duration-200";

const variants = {
  primary: "bg-fg text-ink hover:bg-white",
  secondary: "border border-line-2 text-fg hover:border-fg-2",
};

export function Button({ href, children, variant = "primary", icon, className = "" }: ButtonProps) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
      <span className="transition-transform duration-200 group-hover:translate-x-0.5">
        {icon ?? <ArrowRight className="size-4" aria-hidden />}
      </span>
    </Link>
  );
}
