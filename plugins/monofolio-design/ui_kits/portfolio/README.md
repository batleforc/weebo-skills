# Monofolio Portfolio — UI Kit

A high-fidelity, interactive React recreation of **maxleriche.net** (Monofolio V2).
It is a *cosmetic* recreation of the real Leptos/Rust app — not production code — built
to let you assemble product-accurate screens fast.

## Run it

Open `index.html`. It's a click-through prototype: navigate **Home → Projects → Blog →
About → Contact** from the nav, use the live **search** dropdown, and toggle the
**FR/EN** language button. Content is real (bio, career timeline, and Batleforc's actual
repositories).

## Files

| File | Contents |
|---|---|
| `index.html` | Entry point — pins React 18.3.1 + Babel, loads `kit.css` and the JSX modules |
| `kit.css` | All component styles; imports `../../colors_and_type.css` for tokens |
| `data.jsx` | Real content (from `contents/home.yaml` + public repos) on `window.DATA` |
| `icons.jsx` | `<Icon name=…/>` — Lucide-style strokes + inlined brand glyphs (github/linkedin) |
| `components.jsx` | Primitives (`Card`, `Button`, `TagBadge`, `SectionTitle`) + `NavBar`, `Hero`, `Footer` |
| `pages.jsx` | `Timeline`, `ProjectCard`, `BlogCard`, and the 5 page bodies |
| `App.jsx` | Tiny route shell + language toggle |

All components are exported to `window` so the Babel scripts can share scope.

## Component coverage

- **NavBar** — `Max.` glow logo, page links, live search with results dropdown, FR/EN toggle, sticky + circuit-grid + blur.
- **Hero** — glitching gradient name, rotating cover-title ticker, CTA + social icon row, morphing glow blob, radial primary glow.
- **Buttons** — Primary / Outline / Ghost / Icon (matches `ui.rs` variants).
- **Card / PanelCard** — translucent-crimson border, hover-to-primary, soft-shadow panel variant.
- **TagBadge** — neutral techno chips + crimson `#hashtag` chips.
- **ProjectCard / BlogCard** — copper date eyebrow, title link, clamped description, chips, handle + Open/Read.
- **Timeline** — vertical rail (primary→border→accent gradient), glowing icon bubbles, org logos, and the animated **Pac-Man** finale bubble.
- **Contact cards** — bordered icon tiles for availability / role / location / links / email.
- **Footer** — divider + "Let's build something useful." + Contact CTA.

## Notes & fidelity

- Fonts are **substituted** Google Fonts (JetBrains Mono + IBM Plex Sans) — the live site
  ships system stacks. See root `README.md` → Typography.
- Colors are **OKLCH** exactly as in the source `main.css`. Some screenshot tools render
  OKLCH-in-gradients poorly; real browsers (Chrome/Safari/Firefox) are fine.
- Search, language toggle, and routing are faked client-side. Projects/blog detail pages,
  the docs surface, and the real markdown pipeline are out of scope for the kit.
- Icons: brand marks (GitHub, LinkedIn) are inlined from the repo's Icomoon sprite; the rest
  are Lucide-style strokes matching the Rust/UI `icons` crate.
