# Louis Jay Fuentes — Portfolio

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Motion · Lucide.

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Replacing placeholder content

Everything editable lives in `src/content/`:

| File | What it holds |
| --- | --- |
| `site.ts` | Name, email, Upwork / GitHub / LinkedIn URLs, availability flag. **All links are placeholders.** |
| `projects.ts` | The three featured projects (title, copy, stack, links, layout, tint hue). |
| `lab.ts` | Experiments, stack groups, services, process steps. |

Set `NEXT_PUBLIC_SITE_URL` in production so canonical and Open Graph URLs are correct.

### Adding real screenshots

1. Put images in `public/projects/` (e.g. `project-01.png`, ideally 2x resolution).
2. In `projects.ts`, set `image: { src: "/projects/project-01.png", alt: "…", width, height }`.
   For Project 01 you can also set `imageMobile` for the layered phone view.
3. Set `placeholder: false` once the copy is real.

Without `image`, a coded UI mock is rendered instead, so nothing ever shows a broken image.

Links set to `"#"` render as "soon" states rather than dead links. Replace them with real URLs.

To show a photo in the About section, add `public/portrait.jpg` (4:5, at least 800px wide). It appears automatically.

Writing style used on the site: plain first person, no slogans, no invented numbers. Keep new copy the same way.

Case studies live at `/work/[slug]` (`src/app/work/[slug]/page.tsx`) and are placeholder templates for now.

## Structure

```
src/app/                 layout (metadata, fonts), page, case studies, OG image, icon, robots, sitemap
src/components/sections  one file per homepage section (server components by default)
src/components/work      browser/phone frames, UI mocks, parallax wrapper
src/components/ui        button, section heading, brand icons, contact channels
```

Client components are limited to interactive pieces: nav, hero process panel, experiment filter,
parallax, reveal-on-scroll, copy-email. All motion respects `prefers-reduced-motion`.
