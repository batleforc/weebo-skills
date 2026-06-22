# Monofolio V2 — Design System

A design system reverse-engineered from **Monofolio V2**, the personal portfolio of
**Maxime Leriche** (aka *Batleforc*), a DevOps / platform engineer based in
Nouvelle-Aquitaine, France. The site is a single-author portfolio that mixes a
**Cyberpunk (≈70%)** and **Steampunk (≈30%)** aesthetic — "a clever blend of my
passions and my projects."

> *"Max at your service — a passionate Swiss Army knife. Between Dev, Ops,
> architecture and many other domains, IT is a vast world that fascinates me."*

This folder lets a design agent produce on-brand interfaces, mocks, and slides for
Monofolio without re-reading the source codebase.

---

## Product context

Monofolio V2 is **one product**: a server-rendered (SSR) personal portfolio +
blog + docs site, built in **Rust** with the **Leptos** framework, hydrated to
WASM on the client. Content lives in Markdown + a `home.yaml` file rather than a
CMS. It is a migration of an older Vue.js portfolio, rebuilt for performance, SEO,
and personality.

**Surfaces in the product (one UI kit covers them all — see `ui_kits/portfolio/`):**

| Page | Purpose |
|---|---|
| **Home** | Hero, about blurb, career timeline, latest projects, footer CTA |
| **About** | Detailed bio, CV, skills, full life/career timeline |
| **Projects** | Project cards → per-project detail pages |
| **Blog** | Tagged article cards with reading time |
| **Docs** | Knowledge-base / project documentation |
| **Contact** | Availability, current role, location, links, email |
| **Technologies** | "Tech map" of skills & maturity levels |
| **404 / 418** | Custom error pages (the "I'm a teapot" page is a recurring signature) |

Bilingual: every page toggles **FR ⇄ EN** (FR is default).

---

## Sources

This system was built by reading the public source. The reader is encouraged to
explore these repositories to build richer, more accurate designs:

- **Primary repo (V2, Rust/Leptos):** https://github.com/batleforc/monofolio-rs
  - Design guide: `Design.md`
  - Theme tokens: `apps/frontend/style/main.css`
  - UI primitives: `apps/frontend/src/components/ui.rs`
  - Content / copy: `contents/home.yaml`
  - Components: `hero.rs`, `navbar.rs`, `timeline.rs`, `about.rs`, pages under `src/pages/`
- **Original portfolio (V1, Vue.js):** https://github.com/batleforc/MonoFolio
- **Component library used by the site:** [Rust/UI](https://github.com/rust-ui/ui) (Shadcn-style, for Leptos)
- **Live site:** https://maxleriche.net

Nothing here assumes the reader has repo access — all needed assets and tokens are
copied locally.

---

## Index / manifest

Root files:

- **`README.md`** — this file (context, content + visual foundations, iconography)
- **`colors_and_type.css`** — all design tokens (color, type, spacing, radius) + signature effect utilities. **Import this first** in any artifact.
- **`SKILL.md`** — Agent-Skill manifest for Claude Code portability

Folders:

- **`assets/`** — `logo-mark.png` (mecha mascot, 512px), `logo-mark-96.png`, `hero-city.png` (pink cyberpunk cityscape), `icon-sprite.svg` (Icomoon sprite), `logos/` (timeline org logos)
- **`preview/`** — Design-System-tab cards (type, color, spacing, components, brand)
- **`ui_kits/portfolio/`** — high-fidelity React recreation of the portfolio: `index.html` (interactive demo) + JSX components. Start here to build product-accurate screens.

---

## Typography

> **SUBSTITUTION FLAG.** The live site uses Tailwind's *default* system font
> stacks (`font-sans`, `font-mono`) — i.e. whatever the visitor's OS provides.
> To make artifacts render identically everywhere, this system pins two named
> Google Fonts. If you have brand-mandated fonts, swap them in `colors_and_type.css`
> and let me know.

- **Monospace → `JetBrains Mono`** — the cyber workhorse. Used for the `Max.` logo,
  section headings (`SectionTitle`), buttons, nav, eyebrow/meta labels, dates, code.
- **Sans → `IBM Plex Sans`** — body copy and the extrabold hero display name.

Type roles:

| Role | Family | Size | Weight | Notes |
|---|---|---|---|---|
| Hero name | sans | 72px (48 mobile) | 800 | tracking `-0.04em`, gradient `foreground→primary`, `.glitch` |
| Section title | **mono** | 24px | 700 | short 40px primary underline + `cyber-text-glow` |
| Card title | sans | 18px | 700 | |
| Eyebrow / date | **mono** | 11px | 600 | UPPERCASE, tracking `0.15em`, **copper accent** color |
| Body | sans | 16px | 400 | color `muted-foreground`, line-height 1.7 |
| Nav / small | sans | 14px | 500 | `muted-foreground` → `foreground` on hover |
| Tag / chip | sans/mono | 11px | 400–600 | bordered pill |

---

## CONTENT FUNDAMENTALS

**Voice.** First person, personal, warm and a little playful — this is one human's
site, not a company's. The author refers to himself ("Max at your service") and
addresses the visitor directly ("welcome and enjoy!"). Self-deprecating, hobbyist
energy ("a passionate Swiss Army knife", "I don't know which bee stung me but I
want the code fully tested").

**Tone.** Technical but approachable. Confident about the craft, casual about the
person. Geek-culture references run throughout (Pac-Man, "Take over the world",
"I'm a teapot" 418 page, Gundam/mecha mascot). Coffee and ❤️ are recurring motifs:
*"Made with ❤️ and too much coffee ☕."*

**Bilingual.** Everything exists in **French (default)** and **English**. FR copy is
the source of truth; EN is a translation. Career/timeline content is often FR-only.
Keep both registers casual.

**Casing.**
- Headings & section titles: **Title Case** or sentence case, short ("My Journey",
  "Last projects", "About me").
- Eyebrow labels, dates, button text: often **UPPERCASE** with wide letter-spacing
  (mono), e.g. `2023 - NOW`.
- The logo is literally **`Max.`** (lowercase word + period).

**Emoji — YES, sparingly and with personality.** Not decorative slop; they're part
of the voice. Canonical ones: 👋 (greeting — "Bonjour 👋" / "Hello 👋"), ❤️ and ☕
(the signature sign-off), and the Pac-Man `waka waka` gag. Use them in conversational
copy, never in dense UI.

**Specific examples (verbatim from the product):**
- Greeting eyebrow: `"Bonjour 👋"` / `"Hello 👋"`
- Short description: `"Dev, Ops, Archi et Passionné"` / `"Dev, Ops, Arch & Passionate"`
- Rotating hero subtitles: `"Ops, Back, Front."` · `"GitOps, Kube & Co."` · `"Made with ❤️ and"` · `"Too much coffee ☕."` · `"And lots more."`
- Footer line: `"Let's build something useful."`
- Timeline finale (2026–???): `"Take over the world"` — *"Non-stop waka waka until total domination. Will you be part of it?"*
- CTA labels: `"More about me"`, `"Contact me"` / `"Me contacter"`, `"Open"` / `"Ouvrir"`, `"Read"` / `"Lire"`, `"Retry"` / `"Réessayer"`
- Loading: `"Loading…"` / `"Chargement…"`

**Vibe in one line:** a DevOps engineer's neon-lit terminal that happens to love
retro games and good coffee.

---

## VISUAL FOUNDATIONS

**Overall.** Dark, high-contrast, sharp-edged cyberpunk with warm steampunk brass
accents. Near-black backgrounds, translucent crimson surfaces, neon-red actions,
copper/amber metadata, faint circuit grids everywhere.

**Color.** OKLCH throughout (see `colors_and_type.css`).
- *Background* `oklch(0.07 0.018 18)` — near-black with a warm red undertone.
- *Foreground* `oklch(0.93 0.018 25)` — warm off-white.
- *Primary (crimson/neon-red)* `oklch(0.65 0.26 25)` — actions, links, highlights, glows. The defining brand color.
- *Accent (copper/amber, steampunk brass)* `oklch(0.72 0.14 52)` — dates, eyebrow labels, secondary glow. The 30% steampunk half.
- *Card* `oklch(0.10 0.018 18)`, *Secondary* `oklch(0.14 0.022 18)` — elevated dark surfaces.
- *Muted-foreground* `oklch(0.58 0.04 30)` — body & secondary text.
- *Borders* are **translucent crimson** `oklch(0.65 0.26 25 / 0.22)`, not gray.
- Imagery skews **hot pink / magenta** (see `hero-city.png`) — a complementary pop against the red/copper UI.

**Type.** See Typography above — mono for structure/labels, sans for prose, extrabold gradient for the hero.

**Backgrounds.** Two layered signatures:
1. **Circuit grid** (`.cyber-grid-bg`): 48×48px crosshatch of barely-visible crimson lines (`grid-line` at 6% alpha). Applied to heroes, headers, full-height sections.
2. **Radial primary glow** behind the hero: `radial-gradient(ellipse 70% 60% at 70% 30%, primary/0.14, transparent)`.
   Optional full-bleed `hero-city.png` for image-led sections.

**Glow / shadow system.** Glow is the brand's signature elevation, *not* soft drop
shadows.
- `--cyber-glow` (crimson): `0 0 6px primary/0.65, 0 0 22px primary/0.30` — on titles (`cyber-text-glow`), icon buttons, active borders, timeline bubbles.
- `--steam-glow` (copper): the steampunk counterpart, used on accent elements.
- Glow is **reserved for highlights and titles**, never on all text. Plain cards use only a 1px translucent border (+ optional `shadow-sm`).

**Corner radii.** Deliberately **sharp** — base `--radius: 2px`. This is core to the
cyberpunk feel. Cards/inputs are 2px; media/illustration can go to ~8px (`--radius-xl`).
Never use big friendly rounded corners.

**Cards.** `bg-card` + 1px translucent-crimson border, 2px radius. Hover: border
brightens to `primary/40` with a `transition-colors`. `PanelCard` variant adds a soft
`shadow-sm`. No heavy elevation; the border *is* the card.

**Borders.** Translucent crimson at varying alpha (`/0.22` default, `/0.30`–`/0.50`
for accents, `/0.40` on focus). Section dividers use `border-border/70`.

**Buttons (4 variants, all mono + semibold, 2px radius):**
- *Primary* — solid crimson, `primary-foreground` text, `cyber-glow`; hover lifts 1px (`-translate-y-px`) + slight opacity drop; active returns to baseline.
- *Outline* — transparent, `primary/50` border, crimson text; hover fills `primary/10` + brightens border.
- *Ghost* — transparent; hover tints `primary/10` and text → crimson.
- *Icon* — 36×36 bordered square; hover tints + adds `cyber-glow`.

**Hover states.** Color/border transitions (`transition-colors`), occasional 1px
upward translate on primary buttons. Links: `muted-foreground → foreground`, or
`primary → primary/80`, with underline-on-hover (`underline-offset-2`).

**Press states.** Subtle — primary button returns from its hover lift to baseline
(`active:translate-y-0`). No aggressive shrink.

**Animation / motion.** Subtle and characterful, never bouncy.
- `glitch` — 6s flicker on the hero name (brief opacity + clip-path glitches).
- `hero-ticker` — rotating hero subtitles fade up/out on a timed loop.
- `blob-morph` — 8s decorative border-radius morph on the hero's glowing blob.
- Pac-Man SVG with animated chomp + pellets on the timeline finale (the steampunk/retro easter egg).
- Easing: mostly `ease`/`ease-in-out` + `transition-colors duration-150`. No spring/overshoot.

**Transparency & blur.** Sticky header uses `backdrop-blur-md` over `background/90`.
Surfaces lean on alpha (`bg-card/50`, `primary/10`, `border/70`). Translucency is
everywhere; blur is reserved for overlapping chrome (header, menus).

**Layout rules.** Content constrained to `max-w-5xl` (64rem), centered, `px-5`
horizontal padding, `py-16` vertical section rhythm. Sticky 56px (`h-14`) header.
Single-column mobile → 2-col grids (`md:grid-cols-2`) for project/blog cards.

**Spacing.** Tailwind scale; common steps `gap-1.5/3/4`, card padding `p-4`–`p-6`,
section `py-16`. See `--space-*` tokens.

---

## ICONOGRAPHY

The product uses **two icon systems**, both line/stroke-based at small sizes
(`w-3.5`–`w-5`, i.e. 14–20px):

1. **Lucide-style stroke icons** via the [Rust/UI](https://github.com/rust-ui/ui)
   `icons` crate (`IconType` enum). The names map 1:1 to **Lucide**: `Github`,
   `Linkedin`, `ArrowRight`, `Clock`, `Briefcase`, `MapPin`, `Mail`, `ExternalLink`,
   `GraduationCap`, `Wrench`, `Circle`. → In artifacts, use **Lucide via CDN**
   (`https://unpkg.com/lucide@latest`) — same stroke weight and style. This is the
   primary, recommended icon source.
2. **Icomoon SVG sprite** (`assets/icon-sprite.svg`, copied from the repo) — provides
   brand/social glyphs not in Lucide: `ico-gitea`, `ico-school`, `ico-work`,
   `ico-handyman`, `ico-bluesky`, `ico-rss`, plus tech logos. Reference with
   `<svg><use href="assets/icon-sprite.svg#ico-NAME"/></svg>`.

**Mapping reference** (from `home.yaml` `icoUrl` / `imgUrl`):
`ico#github → Lucide Github`, `ico#linkedin2 → Lucide Linkedin`,
`ico#gitea → sprite ico-gitea`, `ico#school → Lucide GraduationCap`,
`ico#work → Lucide Briefcase`, `ico#handyman → Lucide Wrench`,
`ico#rss/bluesky → sprite`.

**Emoji as iconography.** Used intentionally in copy (👋 ❤️ ☕) — see Content
Fundamentals. Not used as UI control icons.

**Brand mascot / logo.** There is **no wordmark logo file** — the nav logo is the
text `Max.` set in mono crimson with `cyber-text-glow`. The favicon / PWA icon is a
**mecha (Gundam-style) robot** character → `assets/logo-mark.png` (512px) and
`logo-mark-96.png`. Use the text `Max.` as the primary lockup; use the mecha as an
avatar / app icon / decorative mascot.

> The repo's `favicon.svg` embedded a raster image that did not survive import, so
> the PNG mascot is the canonical mark here.

**RSS** has a hand-coded inline glyph in the navbar; the sprite also carries `ico-rss`.
