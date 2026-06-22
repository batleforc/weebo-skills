/* @ds-bundle: {"format":3,"namespace":"MonofolioDesignSystem_53c696","components":[],"sourceHashes":{"ui_kits/portfolio/App.jsx":"971f8648631b","ui_kits/portfolio/components.jsx":"8216e032a139","ui_kits/portfolio/data.jsx":"cc1e8074ab58","ui_kits/portfolio/icons.jsx":"e2747b5ee602","ui_kits/portfolio/pages.jsx":"fc34dcbb0fcc"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.MonofolioDesignSystem_53c696 = window.MonofolioDesignSystem_53c696 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// ui_kits/portfolio/App.jsx
try { (() => {
// App.jsx — router shell for the Monofolio portfolio UI kit
const {
  useState,
  useEffect,
  createElement: el
} = React;
function App() {
  const [route, setRoute] = useState("home");
  const [lang, setLang] = useState("en");
  const onNav = id => {
    setRoute(id);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  useEffect(() => {
    document.title = "Maxime Leriche | Portfolio — " + route;
  }, [route]);
  const page = {
    home: () => el(window.HomePage, {
      onNav
    }),
    projects: () => el(window.ProjectsPage, {
      onNav
    }),
    blog: () => el(window.BlogPage, {
      onNav
    }),
    about: () => el(window.AboutPage),
    contact: () => el(window.ContactPage)
  }[route];
  return el(React.Fragment, null, el(window.NavBar, {
    active: route,
    onNav,
    lang,
    onToggleLang: () => setLang(l => l === "fr" ? "en" : "fr")
  }), el("main", {
    key: route
  }, page()));
}
ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/components.jsx
try { (() => {
// components.jsx — primitives + chrome (Navbar, Hero, Footer)
const {
  useState,
  useMemo,
  createElement: e
} = React;
const Icon = window.Icon;

// ---- Primitives ----
function Card({
  children,
  className = "",
  hoverable = false,
  panel = false,
  ...rest
}) {
  return e("div", {
    className: `card ${hoverable ? "hoverable" : ""} ${panel ? "panel-card" : ""} ${className}`,
    ...rest
  }, children);
}
function TagBadge({
  children,
  primary = false
}) {
  return e("span", {
    className: `tag ${primary ? "tag-primary" : ""}`
  }, children);
}
function SectionTitle({
  children
}) {
  return e("h2", {
    className: "section-title"
  }, children);
}
function Button({
  variant = "primary",
  children,
  href,
  onClick,
  leftIcon
}) {
  const cls = `btn btn-${variant}`;
  const inner = [leftIcon ? e(Icon, {
    name: leftIcon,
    key: "i"
  }) : null, e("span", {
    key: "t"
  }, children)];
  if (href) return e("a", {
    className: cls,
    href,
    onClick
  }, inner);
  return e("button", {
    className: cls,
    onClick
  }, inner);
}
window.Card = Card;
window.TagBadge = TagBadge;
window.SectionTitle = SectionTitle;
window.Button = Button;

// ---- Navbar ----
function NavBar({
  active,
  onNav,
  lang,
  onToggleLang
}) {
  const [q, setQ] = useState("");
  const D = window.DATA;
  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return [];
    const pages = D.navLinks.map(l => ({
      title: l.label,
      desc: l.id === "home" ? "Portfolio home page." : `Go to ${l.label}.`,
      kind: "page",
      id: l.id
    }));
    const proj = D.projects.map(p => ({
      title: p.title,
      desc: p.description,
      kind: "project",
      id: "projects"
    }));
    const blog = D.blog.map(b => ({
      title: b.title,
      desc: b.description,
      kind: "blog",
      id: "blog"
    }));
    return [...pages, ...proj, ...blog].filter(i => i.title.toLowerCase().includes(needle) || i.desc.toLowerCase().includes(needle)).slice(0, 7);
  }, [q]);
  const langLabel = lang === "fr" ? "EN" : "FR";
  return e("header", {
    className: "nav cyber-grid-bg"
  }, e("div", {
    className: "nav-inner"
  }, e("button", {
    className: "nav-logo",
    onClick: () => onNav("home"),
    "aria-label": "Home",
    style: {
      background: "none",
      border: "none"
    }
  }, "Max."), e("nav", {
    className: "nav-links"
  }, D.navLinks.map(l => e("button", {
    key: l.id,
    className: `nav-link ${active === l.id ? "active" : ""}`,
    onClick: () => onNav(l.id)
  }, l.label))), e("div", {
    className: "search-wrap nav-search-desktop",
    style: {
      width: "13rem",
      flexShrink: 0
    }
  }, e("input", {
    className: "nav-search",
    type: "search",
    placeholder: "Search a page...",
    value: q,
    onChange: ev => setQ(ev.target.value)
  }), q.trim() && e("div", {
    className: "search-results"
  }, results.length === 0 ? e("p", {
    style: {
      padding: "0.75rem 1rem",
      fontSize: "0.85rem",
      color: "var(--muted-foreground)",
      margin: 0
    }
  }, "No result.") : results.map((r, i) => e("a", {
    key: i,
    className: "search-item",
    href: "#",
    onClick: ev => {
      ev.preventDefault();
      onNav(r.id);
      setQ("");
    }
  }, e("span", {
    className: "search-item-kind"
  }, r.kind), e("p", {
    className: "search-item-title"
  }, r.title), e("p", {
    className: "search-item-desc"
  }, r.desc))))), e("button", {
    className: "lang-btn lang-desktop",
    onClick: onToggleLang,
    "aria-label": "Toggle language"
  }, langLabel)));
}
window.NavBar = NavBar;

// ---- Hero ----
function Hero({
  onNav
}) {
  const D = window.DATA;
  const n = D.coverTitle.length,
    total = n * 3;
  return e("section", {
    className: "hero cyber-grid-bg"
  }, e("div", {
    className: "hero-inner"
  }, e("p", {
    className: "hero-greeting"
  }, D.greeting), e("h1", {
    className: "hero-name glitch"
  }, D.name), e("div", {
    className: "hero-ticker"
  }, D.coverTitle.map((t, i) => e("span", {
    key: i,
    className: "hero-ticker-item",
    style: {
      animationDelay: `${i * 3}s`,
      animationDuration: `${total}s`
    }
  }, t))), e("p", {
    className: "hero-desc"
  }, D.shortDescription + " — a passionate Swiss Army knife between Dev, Ops and architecture."), e("div", {
    className: "hero-actions"
  }, e(Button, {
    variant: "primary",
    leftIcon: "arrow-right",
    onClick: () => onNav("about")
  }, "More about me"), e("div", {
    style: {
      display: "flex",
      gap: "0.75rem",
      alignItems: "center"
    }
  }, D.social.map(s => e("a", {
    key: s.name,
    className: "btn btn-icon",
    href: s.url,
    target: "_blank",
    rel: "noopener noreferrer",
    title: s.name,
    "aria-label": s.name
  }, e(Icon, {
    name: s.icon
  })))))), e("div", {
    "aria-hidden": "true"
  }, e("div", {
    className: "hero-blob"
  })));
}
window.Hero = Hero;

// ---- Footer ----
function Footer({
  onNav
}) {
  return e("footer", {
    className: "footer"
  }, e("div", {
    className: "footer-inner"
  }, e("p", {
    style: {
      fontSize: "0.875rem",
      color: "var(--muted-foreground)",
      margin: 0
    }
  }, "Let's build something useful."), e(Button, {
    variant: "outline",
    onClick: () => onNav("contact")
  }, "Contact me")));
}
window.Footer = Footer;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/components.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/data.jsx
try { (() => {
// data.jsx — content lifted from contents/home.yaml + Batleforc's public repos.
// EN strings used (the site is FR-default / EN-toggle).
window.DATA = {
  name: "Maxime Leriche",
  greeting: "Hello 👋",
  shortDescription: "Dev, Ops, Arch & Passionate",
  coverTitle: ["Ops, Back, Front.", "GitOps, Kube & Co.", "Made with ❤️ and", "Too much coffee ☕.", "And lots more."],
  presentation: ["Hello There,", "Max at your service — a passionate Swiss Army knife. Between Dev, Ops, architecture and many other domains, IT is a vast world that fascinates me.", "So welcome to my site, a clever blend of my passions and my projects.", "And surely much more to come.", "Made with ❤️ and too much coffee ☕, welcome and enjoy!"],
  contactEmail: "max@maxleriche.net",
  contactLocation: "Nouvelle-Aquitaine, France",
  currentWork: "Ingénieur Socle de fabrication / Couche d'échange — Macif",
  availability: "Open to technical discussions, collaborations and opportunities",
  social: [{
    name: "GitHub",
    url: "https://github.com/batleforc",
    icon: "github"
  }, {
    name: "Git Weebo",
    url: "https://git.weebo.fr/batleforc",
    icon: "git-branch"
  }, {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/maxime-leriche-weebo/",
    icon: "linkedin"
  }, {
    name: "RSS",
    url: "/rss.xml",
    icon: "rss"
  }],
  // Projects — real Batleforc repositories
  projects: [{
    title: "NeoNet",
    handle: "/projects/neonet",
    released: "2025-02-01",
    description: "Secure, anonymous peer-to-peer network core. Surf NeoNet web services over an encrypted overlay.",
    techno: ["Rust", "Networking", "WireGuard"],
    tags: ["network", "privacy"]
  }, {
    title: "WeeboGitOps",
    handle: "/projects/weebo-gitops",
    released: "2024-11-12",
    description: "A full Kubernetes platform driven by a GitOps architecture — the backbone of my homelab and services.",
    techno: ["Kubernetes", "ArgoCD", "Flux"],
    tags: ["gitops", "homelab"]
  }, {
    title: "ProxyAuthK8S",
    handle: "/projects/proxy-auth-k8s",
    released: "2024-08-03",
    description: "A Kubernetes API-server reverse proxy and aggregator with pluggable authentication.",
    techno: ["Rust", "Kubernetes"],
    tags: ["security", "platform"]
  }, {
    title: "rust-template",
    handle: "/projects/rust-template",
    released: "2024-05-20",
    description: "Batteries-included Rust API template — tracing, OpenAPI, tests, the works. Paired with a Vue frontend.",
    techno: ["Rust", "Actix", "OpenAPI"],
    tags: ["template", "backend"]
  }, {
    title: "devcomposefile",
    handle: "/projects/devcomposefile",
    released: "2024-02-15",
    description: "Convert Docker Compose files into Devfiles for Eclipse Che dev environments.",
    techno: ["Go", "Devfile", "Docker"],
    tags: ["devex", "tooling"]
  }, {
    title: "talos-extensions",
    handle: "/projects/talos-extensions",
    released: "2023-12-01",
    description: "System extensions for Talos Linux — immutable Kubernetes nodes, tuned my way.",
    techno: ["Talos", "Kubernetes", "Linux"],
    tags: ["infra", "talos"]
  }],
  // Blog — derived sample posts in his voice/topics
  blog: [{
    title: "GitOps without the tears: promoting across clusters",
    handle: "/blog/gitops-promotion",
    date: "2025-03-18",
    readingTime: 9,
    description: "Kargo, ArgoCD and a healthy dose of YAML. How I promote releases across a fleet without losing my mind.",
    tags: ["gitops", "argocd", "kargo"]
  }, {
    title: "Rewriting my portfolio in Rust (and why)",
    handle: "/blog/portfolio-rust",
    date: "2025-01-22",
    readingTime: 6,
    description: "Leptos, SSR, WASM hydration and a markdown build step. A migration story from Vue to Rust.",
    tags: ["rust", "leptos", "wasm"]
  }, {
    title: "Talos Linux on bare metal: a homelab diary",
    handle: "/blog/talos-homelab",
    date: "2024-10-05",
    readingTime: 12,
    description: "Immutable nodes, declarative everything. Setting up a resilient cluster the hard (fun) way.",
    tags: ["talos", "kubernetes", "homelab"]
  }, {
    title: "Too much coffee: my dev environment in 2024",
    handle: "/blog/dev-env-2024",
    date: "2024-06-30",
    readingTime: 5,
    description: "Eclipse Che, custom CLIs, dotfiles and a ZMK keyboard. The tools that keep me caffeinated.",
    tags: ["devex", "tooling"]
  }],
  // Career timeline — from home.yaml (weight desc = latest first)
  history: [{
    title: "Take over the world",
    lieux: "Planet Earth",
    date: "2026 - ???",
    ico: "pacman",
    logo: null,
    description: ["Final stage of the plan.", "Optimizing pipelines, robots and pellet reserves.", "Non-stop waka waka until total domination.", "Will you be part of it?"]
  }, {
    title: "CDI — Ingénieur Couche d'échange / Socle de fabrication",
    lieux: "Macif, Niort",
    date: "2023 - Now",
    ico: "briefcase",
    logo: "../../assets/logos/macif.png",
    description: ["After my apprenticeship, Macif — and my manager — trusted me to continue the adventure.", "Now an engineer evolving the exchange layer (mainly) and the build platform.", "Tasks are varied and meant to be cross-cutting between the two."]
  }, {
    title: "Apprentice DevOps / Exchange layer",
    lieux: "Macif, Niort",
    date: "2021 - 2023",
    ico: "briefcase",
    logo: "../../assets/logos/macif.png",
    description: ["Real-world application of concepts learned in class, plus more advanced ones.", "Async layers and data-flow management via Kafka.", "Applying DevOps & CI/CD from personal projects to real cases."]
  }, {
    title: "Master — Software Architect",
    lieux: "Université de La Rochelle, Niort",
    date: "2021 - 2023",
    ico: "graduation-cap",
    logo: "../../assets/logos/univ-la-rochelle.png",
    description: ["Software architecture and development best practices, plus academic research concepts.", "Deepened knowledge in development, research and system administration."]
  }, {
    title: "Apprentice native & PWA developer",
    lieux: "Nexi Conseils, Aigrefeuille d'Aunis",
    date: "2020 - 2021",
    ico: "briefcase",
    logo: "../../assets/logos/nexi-conseils.png",
    description: ["Native mobile (Android & iOS) and PWA development.", "Contributed to PIROUETTE, a leisure-center management app."]
  }, {
    title: "LP Cloud & Mobile Development",
    lieux: "IUT La Rochelle, Niort",
    date: "2020 - 2021",
    ico: "graduation-cap",
    logo: "../../assets/logos/iut-la-rochelle.png",
    description: ["Cloud and mobility technologies.", "Foundations of sysadmin (Docker) and programming (React, Redux, NodeJS, Ruby)."]
  }, {
    title: "Coder",
    lieux: "Museomix, Amiens",
    date: "2019",
    ico: "wrench",
    logo: "../../assets/logos/museomix.png",
    description: ["Museomix reinvents the interaction between visitors and museums.", "Worked as a coder on the Mix Ta Brique project — a rich, cross-discipline team experience."]
  }],
  navLinks: [{
    id: "home",
    label: "Home"
  }, {
    id: "projects",
    label: "Projects"
  }, {
    id: "blog",
    label: "Blog"
  }, {
    id: "about",
    label: "About"
  }, {
    id: "contact",
    label: "Contact"
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/data.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/icons.jsx
try { (() => {
// icons.jsx — Monofolio icon set
// Stroke icons mirror Lucide (the Rust/UI `icons` crate maps 1:1 to Lucide).
// Brand glyphs (github/linkedin) are inlined from the repo's Icomoon sprite.
const {
  createElement: h
} = React;

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
  rss: "M4 11a9 9 0 0 1 9 9 M4 4a16 16 0 0 1 16 16 M5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
};

// Filled brand glyphs (32x32 viewBox, from Icomoon sprite)
const FILLED = {
  github: {
    vb: "0 0 32 32",
    d: ["M16 0.396c-8.84 0-16 7.164-16 16 0 7.071 4.584 13.067 10.94 15.18 0.8 0.151 1.093-0.344 1.093-0.769 0-0.38-0.013-1.387-0.020-2.72-4.451 0.965-5.389-2.147-5.389-2.147-0.728-1.847-1.78-2.34-1.78-2.34-1.449-0.992 0.112-0.972 0.112-0.972 1.607 0.112 2.451 1.648 2.451 1.648 1.427 2.447 3.745 1.74 4.66 1.331 0.144-1.035 0.556-1.74 1.013-2.14-3.553-0.4-7.288-1.776-7.288-7.907 0-1.747 0.62-3.173 1.647-4.293-0.18-0.404-0.72-2.031 0.14-4.235 0 0 1.34-0.429 4.4 1.64 1.28-0.356 2.64-0.532 4-0.54 1.36 0.008 2.72 0.184 4 0.54 3.040-2.069 4.38-1.64 4.38-1.64 0.86 2.204 0.32 3.831 0.16 4.235 1.020 1.12 1.64 2.547 1.64 4.293 0 6.147-3.74 7.5-7.3 7.893 0.56 0.48 1.080 1.461 1.080 2.96 0 2.141-0.020 3.861-0.020 4.381 0 0.42 0.28 0.92 1.1 0.76 6.401-2.099 10.981-8.099 10.981-15.159 0-8.836-7.164-16-16-16z"]
  },
  linkedin: {
    vb: "0 0 32 32",
    d: ["M12 12h5.535v2.837h0.079c0.77-1.381 2.655-2.837 5.464-2.837 5.842 0 6.922 3.637 6.922 8.367v9.633h-5.769v-8.54c0-2.037-0.042-4.657-3.001-4.657-3.005 0-3.463 2.218-3.463 4.509v8.688h-5.767v-18z", "M2 12h6v18h-6v-18z", "M8 7c0 1.657-1.343 3-3 3s-3-1.343-3-3c0-1.657 1.343-3 3-3s3 1.343 3 3z"]
  }
};
function Icon({
  name,
  size = 16,
  className = "",
  style = {}
}) {
  if (FILLED[name]) {
    const g = FILLED[name];
    return h("svg", {
      className: "icon-svg " + className,
      width: size,
      height: size,
      viewBox: g.vb,
      fill: "currentColor",
      style
    }, g.d.map((d, i) => h("path", {
      key: i,
      d
    })));
  }
  const d = STROKE[name] || STROKE.circle;
  return h("svg", {
    className: "icon-svg " + className,
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style
  }, d.split(" M").map((seg, i) => h("path", {
    key: i,
    d: i === 0 ? seg : "M" + seg
  })));
}
window.Icon = Icon;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/icons.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/pages.jsx
try { (() => {
// pages.jsx — page bodies + Timeline / cards
const {
  createElement: c
} = React;
function fmtDate(iso) {
  const d = new Date(iso);
  if (isNaN(d)) return iso;
  return d.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric"
  });
}

// ---- Project card ----
function ProjectCard({
  p,
  onNav
}) {
  return c(window.Card, {
    hoverable: true,
    className: "pcard"
  }, c("span", {
    className: "eyebrow"
  }, "Released · " + fmtDate(p.released)), c("h3", null, c("a", {
    href: "#",
    onClick: ev => {
      ev.preventDefault();
      onNav("projects");
    }
  }, p.title)), c("p", {
    className: "line-clamp-3"
  }, p.description), c("div", {
    className: "chips"
  }, p.techno.slice(0, 3).map(t => c(window.TagBadge, {
    key: t
  }, t)), p.tags.slice(0, 2).map(t => c(window.TagBadge, {
    key: t,
    primary: true
  }, "#" + t))), c("div", {
    className: "foot"
  }, c("span", {
    className: "handle"
  }, p.handle), c("a", {
    className: "open",
    href: "#",
    onClick: ev => {
      ev.preventDefault();
      onNav("projects");
    }
  }, "Open")));
}

// ---- Blog card ----
function BlogCard({
  b,
  onNav
}) {
  return c(window.Card, {
    hoverable: true,
    className: "pcard"
  }, c("span", {
    className: "eyebrow"
  }, fmtDate(b.date)), c("h3", {
    style: {
      fontSize: "1.05rem"
    }
  }, c("a", {
    href: "#",
    onClick: ev => {
      ev.preventDefault();
      onNav("blog");
    }
  }, b.title)), c("p", {
    className: "line-clamp-3",
    style: {
      marginBottom: "0.75rem"
    }
  }, b.description), c("div", {
    className: "chips",
    style: {
      marginTop: 0,
      marginBottom: "0.75rem"
    }
  }, b.tags.slice(0, 4).map(t => c(window.TagBadge, {
    key: t,
    primary: true
  }, "#" + t))), c("div", {
    className: "foot",
    style: {
      marginTop: 0
    }
  }, c("span", {
    className: "handle"
  }, b.readingTime + " min read"), c("a", {
    className: "open",
    href: "#",
    onClick: ev => {
      ev.preventDefault();
      onNav("blog");
    }
  }, "Read")));
}

// ---- Pac-Man timeline bubble ----
function PacmanBubble() {
  return c("svg", {
    className: "pacman-icon",
    width: 16,
    height: 16,
    viewBox: "0 0 32 24",
    style: {
      overflow: "visible"
    }
  }, c("circle", {
    cx: 24,
    cy: 12,
    r: 1.5,
    fill: "var(--accent)"
  }, c("animate", {
    attributeName: "cx",
    values: "24;12.8",
    dur: "0.9s",
    repeatCount: "indefinite"
  }), c("animate", {
    attributeName: "opacity",
    values: "1;1;0",
    dur: "0.9s",
    repeatCount: "indefinite"
  })), c("circle", {
    cx: 28,
    cy: 12,
    r: 1.2,
    fill: "var(--accent)"
  }, c("animate", {
    attributeName: "cx",
    values: "28;12.8",
    dur: "0.9s",
    begin: "0.3s",
    repeatCount: "indefinite"
  }), c("animate", {
    attributeName: "opacity",
    values: "1;1;0",
    dur: "0.9s",
    begin: "0.3s",
    repeatCount: "indefinite"
  })), c("path", {
    d: "M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z",
    fill: "currentColor"
  }), c("path", {
    d: "M12 12L22 7.2L22 16.8Z",
    fill: "var(--background)"
  }, c("animate", {
    attributeName: "d",
    dur: "0.42s",
    repeatCount: "indefinite",
    values: "M12 12L22 7.2L22 16.8Z;M12 12L22 10.2L22 13.8Z;M12 12L22 7.2L22 16.8Z"
  })), c("circle", {
    cx: 13.2,
    cy: 8.4,
    r: 1.25,
    fill: "var(--background)"
  }));
}

// ---- Timeline ----
function Timeline() {
  const D = window.DATA;
  return c("ol", {
    className: "timeline"
  }, D.history.map((h, i) => c("li", {
    key: i,
    className: "tl-item"
  }, c("div", {
    className: "tl-bubble"
  }, h.ico === "pacman" ? c(PacmanBubble) : c(window.Icon, {
    name: h.ico,
    size: 14
  })), c(window.Card, {
    hoverable: true,
    className: "pcard",
    style: {
      flex: 1
    }
  }, c("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: "0.75rem"
    }
  }, h.logo ? c("img", {
    className: "tl-logo",
    src: h.logo,
    alt: ""
  }) : null, c("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, c("span", {
    className: "eyebrow"
  }, h.date), c("h3", {
    style: {
      margin: "0.25rem 0 0.125rem"
    }
  }, h.title), c("p", {
    style: {
      fontSize: "0.875rem",
      color: "var(--muted-foreground)",
      margin: 0
    }
  }, h.lieux))), c("div", {
    style: {
      marginTop: "0.5rem",
      display: "flex",
      flexDirection: "column",
      gap: "0.25rem"
    }
  }, h.description.map((line, j) => c("p", {
    key: j,
    style: {
      fontSize: "0.875rem",
      color: "var(--muted-foreground)",
      margin: 0,
      lineHeight: 1.6
    }
  }, line)))))));
}

// ---- Pages ----
function HomePage({
  onNav
}) {
  const D = window.DATA;
  return c("div", {
    className: "fade-in"
  }, c(window.Hero, {
    onNav
  }), c("section", {
    className: "about-band",
    id: "about"
  }, c("div", {
    className: "section-inner"
  }, c(window.SectionTitle, null, "About me"), c(window.Card, {
    className: "pcard",
    style: {
      maxWidth: "48rem",
      padding: "1.5rem"
    }
  }, c("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem"
    }
  }, D.presentation.map((line, i) => c("p", {
    key: i,
    style: {
      lineHeight: 1.7,
      color: "var(--muted-foreground)",
      margin: 0
    }
  }, line)))))), c("section", null, c("div", {
    className: "section-inner"
  }, c(window.SectionTitle, null, "Last projects"), c("div", {
    className: "grid-2"
  }, D.projects.slice(0, 6).map(p => c(ProjectCard, {
    key: p.handle,
    p,
    onNav
  }))))), c(window.Footer, {
    onNav
  }));
}
function ProjectsPage({
  onNav
}) {
  const D = window.DATA;
  return c("section", {
    className: "cyber-grid-bg fade-in",
    style: {
      minHeight: "calc(100vh - 3.5rem)"
    }
  }, c("div", {
    className: "section-inner"
  }, c(window.SectionTitle, null, "Projects"), c("p", {
    className: "muted",
    style: {
      marginBottom: "1.5rem",
      maxWidth: "40rem"
    }
  }, "Things I build between Dev, Ops and architecture — from network cores to GitOps platforms."), c("div", {
    className: "grid-2"
  }, D.projects.map(p => c(ProjectCard, {
    key: p.handle,
    p,
    onNav
  })))));
}
function BlogPage({
  onNav
}) {
  const D = window.DATA;
  return c("section", {
    className: "cyber-grid-bg fade-in",
    style: {
      minHeight: "calc(100vh - 3.5rem)"
    }
  }, c("div", {
    className: "section-inner"
  }, c(window.SectionTitle, null, "Blog"), c("p", {
    className: "muted",
    style: {
      marginBottom: "1.5rem"
    }
  }, "Technical articles and field notes around software, platforms and a lot of coffee."), c("div", {
    className: "grid-2"
  }, D.blog.map(b => c(BlogCard, {
    key: b.handle,
    b,
    onNav
  })))));
}
function AboutPage() {
  const D = window.DATA;
  return c("div", {
    className: "fade-in"
  }, c("section", {
    className: "about-band"
  }, c("div", {
    className: "section-inner"
  }, c(window.SectionTitle, null, "About me"), c(window.Card, {
    className: "pcard",
    style: {
      maxWidth: "48rem",
      padding: "1.5rem"
    }
  }, c("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem"
    }
  }, D.presentation.map((line, i) => c("p", {
    key: i,
    style: {
      lineHeight: 1.7,
      color: "var(--muted-foreground)",
      margin: 0
    }
  }, line)))))), c("section", {
    id: "timeline"
  }, c("div", {
    className: "section-inner"
  }, c(window.SectionTitle, null, "My Journey"), c(Timeline))));
}
function ContactPage() {
  const D = window.DATA;
  const items = [{
    icon: "clock",
    title: "Availability",
    body: D.availability
  }, {
    icon: "briefcase",
    title: "Current work",
    body: D.currentWork
  }, {
    icon: "map-pin",
    title: "Location",
    body: D.contactLocation
  }, {
    icon: "external-link",
    title: "Links",
    links: D.social
  }];
  return c("section", {
    className: "cyber-grid-bg fade-in",
    style: {
      minHeight: "calc(100vh - 3.5rem)"
    }
  }, c("div", {
    className: "section-inner"
  }, c(window.SectionTitle, null, "Contact"), c("p", {
    className: "muted",
    style: {
      marginBottom: "2rem",
      maxWidth: "36rem"
    }
  }, "Available to discuss Dev, Ops, architecture and platform topics."), c("div", {
    className: "grid-2"
  }, items.map((it, i) => c(window.Card, {
    key: i,
    className: "contact-card"
  }, c("div", {
    className: "contact-ico"
  }, c(window.Icon, {
    name: it.icon
  })), c("div", null, c("h3", null, it.title), it.links ? c("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "0.25rem"
    }
  }, it.links.map(l => c("a", {
    key: l.name,
    href: l.url,
    target: "_blank",
    rel: "noopener noreferrer"
  }, l.name))) : c("p", null, it.body)))), c(window.Card, {
    className: "contact-card",
    style: {
      gridColumn: "1 / -1"
    }
  }, c("div", {
    className: "contact-ico"
  }, c(window.Icon, {
    name: "mail"
  })), c("div", null, c("h3", null, "Email"), c("a", {
    href: "mailto:" + D.contactEmail
  }, D.contactEmail))))));
}
Object.assign(window, {
  ProjectCard,
  BlogCard,
  Timeline,
  HomePage,
  ProjectsPage,
  BlogPage,
  AboutPage,
  ContactPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/pages.jsx", error: String((e && e.message) || e) }); }

})();
