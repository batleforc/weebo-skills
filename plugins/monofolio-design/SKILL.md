---
name: monofolio-design
description: Use this skill to generate well-branded interfaces and assets for Monofolio (the Cyberpunk × Steampunk portfolio of Maxime Leriche / Batleforc), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out
and create static HTML files for the user to view. If working on production code, you can
copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build
or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_
production code, depending on the need.

## What's here

- `README.md` — full context: product, content voice, visual foundations, iconography, manifest.
- `colors_and_type.css` — **import this first.** OKLCH color tokens, type system, spacing/radius, and signature effect utilities (`.cyber-grid-bg`, `.cyber-glow`, `.glitch`, `.hero-blob`).
- `assets/` — `logo-mark.png` (mecha mascot), `hero-city.png` (magenta cityscape), `icon-sprite.svg` (Icomoon glyphs), `logos/` (timeline orgs).
- `preview/` — small reference cards for every token group.
- `ui_kits/portfolio/` — interactive React recreation; copy components from here.

## Quick brand rules

- **Dark, sharp, neon.** Near-black background, crimson primary `oklch(0.65 0.26 25)`, copper accent `oklch(0.72 0.14 52)`. Borders are translucent crimson, never grey. Radius is **2px** — keep corners sharp.
- **Glow is the elevation system** (`--cyber-glow` / `--steam-glow`), reserved for titles, icon buttons and active borders — not soft drop shadows.
- **Type:** JetBrains Mono for logo/headings/labels/buttons, IBM Plex Sans for body and the extrabold gradient hero name. *(Substituted Google Fonts — the live site uses system stacks.)*
- **Backgrounds:** 48px circuit grid + a radial primary glow on heroes.
- **Voice:** first-person, warm, playful, bilingual (FR default / EN). Geek-culture references (Pac-Man, "I'm a teapot", mecha mascot). Signature sign-off: *"Made with ❤️ and too much coffee ☕."* Emoji used sparingly in copy (👋 ❤️ ☕), never as UI icons.
- **Icons:** Lucide stroke icons (via CDN) for generic; inline the brand glyphs from `assets/icon-sprite.svg` for GitHub/LinkedIn/Gitea.

Avoid: bluish-purple gradients, big rounded corners, emoji-as-UI-icon, soft pastel shadows. None of those belong to this brand.
