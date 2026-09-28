import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, UpworkIcon } from "@/components/ui/brand-icons";
import { site } from "@/content/site";

export const channels = [
  { label: "Upwork", href: site.links.upwork, Icon: UpworkIcon, external: true },
  { label: "Email", href: `mailto:${site.email}`, Icon: Mail, external: false },
  { label: "GitHub", href: site.links.github, Icon: GithubIcon, external: true },
  { label: "LinkedIn", href: site.links.linkedin, Icon: LinkedinIcon, external: true },
] as const;
