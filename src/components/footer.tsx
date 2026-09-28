import { channels } from "@/components/ui/channels";
import { site } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-8 text-sm sm:px-8 md:flex-row md:items-center md:justify-between">
        <p className="text-muted">
          <span className="text-fg">{site.shortName}</span> · {site.tagline} · {year}
        </p>
        <ul className="flex items-center gap-1">
          {channels.map(({ label, href, Icon, external }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={label}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="grid size-9 place-items-center rounded-md text-muted transition-colors hover:bg-white/[0.05] hover:text-fg"
              >
                <Icon className="size-4" aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
