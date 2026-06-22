// icons.jsx — Monofolio icon set
// Stroke icons mirror Lucide (the Rust/UI `icons` crate maps 1:1 to Lucide).
// Brand glyphs (github/linkedin) are inlined from the repo's Icomoon sprite.
const { createElement: h } = React;

// Lucide-style stroke icons (24x24, stroke 2, round)
const STROKE = {
  "arrow-right": "M5 12h14M12 5l7 7-7 7",
  "external-link": "M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
  clock: "M12 6v6l4 2 M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z",
  briefcase: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16 M4 7h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z",
  "map-pin": "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  mail: "M22 7 13.03 12.7a2 2 0 0 1-2.06 0L2 7 M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z",
  "graduation-cap": "M22 10v6 M2 10l10-5 10 5-10 5z M6 12v5c0 1 2 2 6 2s6-1 6-2v-5",
  wrench: "M14.7 6.3a4 4 0 0 0 5 5l-1.9 7.3a2 2 0 0 1-3.4 1L9 14a2 2 0 0 1 1-3.4z",
  search: "M21 21l-4.3-4.3 M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z",
  menu: "M4 6h16M4 12h16M4 18h16",
  x: "M18 6 6 18M6 6l12 12",
  circle: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z",
  "git-branch": "M6 3v12 M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M15 6a9 9 0 0 1-9 9",
  "chevron-right": "M9 18l6-6-6-6",
  rss: "M4 11a9 9 0 0 1 9 9 M4 4a16 16 0 0 1 16 16 M5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z",
};

// Filled brand glyphs (32x32 viewBox, from Icomoon sprite)
const FILLED = {
  github: { vb: "0 0 32 32", d: ["M16 0.396c-8.84 0-16 7.164-16 16 0 7.071 4.584 13.067 10.94 15.18 0.8 0.151 1.093-0.344 1.093-0.769 0-0.38-0.013-1.387-0.020-2.72-4.451 0.965-5.389-2.147-5.389-2.147-0.728-1.847-1.78-2.34-1.78-2.34-1.449-0.992 0.112-0.972 0.112-0.972 1.607 0.112 2.451 1.648 2.451 1.648 1.427 2.447 3.745 1.74 4.66 1.331 0.144-1.035 0.556-1.74 1.013-2.14-3.553-0.4-7.288-1.776-7.288-7.907 0-1.747 0.62-3.173 1.647-4.293-0.18-0.404-0.72-2.031 0.14-4.235 0 0 1.34-0.429 4.4 1.64 1.28-0.356 2.64-0.532 4-0.54 1.36 0.008 2.72 0.184 4 0.54 3.040-2.069 4.38-1.64 4.38-1.64 0.86 2.204 0.32 3.831 0.16 4.235 1.020 1.12 1.64 2.547 1.64 4.293 0 6.147-3.74 7.5-7.3 7.893 0.56 0.48 1.080 1.461 1.080 2.96 0 2.141-0.020 3.861-0.020 4.381 0 0.42 0.28 0.92 1.1 0.76 6.401-2.099 10.981-8.099 10.981-15.159 0-8.836-7.164-16-16-16z"] },
  linkedin: { vb: "0 0 32 32", d: ["M12 12h5.535v2.837h0.079c0.77-1.381 2.655-2.837 5.464-2.837 5.842 0 6.922 3.637 6.922 8.367v9.633h-5.769v-8.54c0-2.037-0.042-4.657-3.001-4.657-3.005 0-3.463 2.218-3.463 4.509v8.688h-5.767v-18z", "M2 12h6v18h-6v-18z", "M8 7c0 1.657-1.343 3-3 3s-3-1.343-3-3c0-1.657 1.343-3 3-3s3 1.343 3 3z"] },
};

function Icon({ name, size = 16, className = "", style = {} }) {
  if (FILLED[name]) {
    const g = FILLED[name];
    return h("svg", { className: "icon-svg " + className, width: size, height: size, viewBox: g.vb, fill: "currentColor", style },
      g.d.map((d, i) => h("path", { key: i, d })));
  }
  const d = STROKE[name] || STROKE.circle;
  return h("svg", { className: "icon-svg " + className, width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", style },
    d.split(" M").map((seg, i) => h("path", { key: i, d: (i === 0 ? seg : "M" + seg) })));
}

window.Icon = Icon;
