// data.jsx — content lifted from contents/home.yaml + Batleforc's public repos.
// EN strings used (the site is FR-default / EN-toggle).
window.DATA = {
  name: "Maxime Leriche",
  greeting: "Hello 👋",
  shortDescription: "Dev, Ops, Arch & Passionate",
  coverTitle: ["Ops, Back, Front.", "GitOps, Kube & Co.", "Made with ❤️ and", "Too much coffee ☕.", "And lots more."],
  presentation: [
    "Hello There,",
    "Max at your service — a passionate Swiss Army knife. Between Dev, Ops, architecture and many other domains, IT is a vast world that fascinates me.",
    "So welcome to my site, a clever blend of my passions and my projects.",
    "And surely much more to come.",
    "Made with ❤️ and too much coffee ☕, welcome and enjoy!",
  ],
  contactEmail: "max@maxleriche.net",
  contactLocation: "Nouvelle-Aquitaine, France",
  currentWork: "Ingénieur Socle de fabrication / Couche d'échange — Macif",
  availability: "Open to technical discussions, collaborations and opportunities",
  social: [
    { name: "GitHub", url: "https://github.com/batleforc", icon: "github" },
    { name: "Git Weebo", url: "https://git.weebo.fr/batleforc", icon: "git-branch" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/maxime-leriche-weebo/", icon: "linkedin" },
    { name: "RSS", url: "/rss.xml", icon: "rss" },
  ],
  // Projects — real Batleforc repositories
  projects: [
    { title: "NeoNet", handle: "/projects/neonet", released: "2025-02-01", description: "Secure, anonymous peer-to-peer network core. Surf NeoNet web services over an encrypted overlay.", techno: ["Rust", "Networking", "WireGuard"], tags: ["network", "privacy"] },
    { title: "WeeboGitOps", handle: "/projects/weebo-gitops", released: "2024-11-12", description: "A full Kubernetes platform driven by a GitOps architecture — the backbone of my homelab and services.", techno: ["Kubernetes", "ArgoCD", "Flux"], tags: ["gitops", "homelab"] },
    { title: "ProxyAuthK8S", handle: "/projects/proxy-auth-k8s", released: "2024-08-03", description: "A Kubernetes API-server reverse proxy and aggregator with pluggable authentication.", techno: ["Rust", "Kubernetes"], tags: ["security", "platform"] },
    { title: "rust-template", handle: "/projects/rust-template", released: "2024-05-20", description: "Batteries-included Rust API template — tracing, OpenAPI, tests, the works. Paired with a Vue frontend.", techno: ["Rust", "Actix", "OpenAPI"], tags: ["template", "backend"] },
    { title: "devcomposefile", handle: "/projects/devcomposefile", released: "2024-02-15", description: "Convert Docker Compose files into Devfiles for Eclipse Che dev environments.", techno: ["Go", "Devfile", "Docker"], tags: ["devex", "tooling"] },
    { title: "talos-extensions", handle: "/projects/talos-extensions", released: "2023-12-01", description: "System extensions for Talos Linux — immutable Kubernetes nodes, tuned my way.", techno: ["Talos", "Kubernetes", "Linux"], tags: ["infra", "talos"] },
  ],
  // Blog — derived sample posts in his voice/topics
  blog: [
    { title: "GitOps without the tears: promoting across clusters", handle: "/blog/gitops-promotion", date: "2025-03-18", readingTime: 9, description: "Kargo, ArgoCD and a healthy dose of YAML. How I promote releases across a fleet without losing my mind.", tags: ["gitops", "argocd", "kargo"] },
    { title: "Rewriting my portfolio in Rust (and why)", handle: "/blog/portfolio-rust", date: "2025-01-22", readingTime: 6, description: "Leptos, SSR, WASM hydration and a markdown build step. A migration story from Vue to Rust.", tags: ["rust", "leptos", "wasm"] },
    { title: "Talos Linux on bare metal: a homelab diary", handle: "/blog/talos-homelab", date: "2024-10-05", readingTime: 12, description: "Immutable nodes, declarative everything. Setting up a resilient cluster the hard (fun) way.", tags: ["talos", "kubernetes", "homelab"] },
    { title: "Too much coffee: my dev environment in 2024", handle: "/blog/dev-env-2024", date: "2024-06-30", readingTime: 5, description: "Eclipse Che, custom CLIs, dotfiles and a ZMK keyboard. The tools that keep me caffeinated.", tags: ["devex", "tooling"] },
  ],
  // Career timeline — from home.yaml (weight desc = latest first)
  history: [
    { title: "Take over the world", lieux: "Planet Earth", date: "2026 - ???", ico: "pacman", logo: null, description: ["Final stage of the plan.", "Optimizing pipelines, robots and pellet reserves.", "Non-stop waka waka until total domination.", "Will you be part of it?"] },
    { title: "CDI — Ingénieur Couche d'échange / Socle de fabrication", lieux: "Macif, Niort", date: "2023 - Now", ico: "briefcase", logo: "../../assets/logos/macif.png", description: ["After my apprenticeship, Macif — and my manager — trusted me to continue the adventure.", "Now an engineer evolving the exchange layer (mainly) and the build platform.", "Tasks are varied and meant to be cross-cutting between the two."] },
    { title: "Apprentice DevOps / Exchange layer", lieux: "Macif, Niort", date: "2021 - 2023", ico: "briefcase", logo: "../../assets/logos/macif.png", description: ["Real-world application of concepts learned in class, plus more advanced ones.", "Async layers and data-flow management via Kafka.", "Applying DevOps & CI/CD from personal projects to real cases."] },
    { title: "Master — Software Architect", lieux: "Université de La Rochelle, Niort", date: "2021 - 2023", ico: "graduation-cap", logo: "../../assets/logos/univ-la-rochelle.png", description: ["Software architecture and development best practices, plus academic research concepts.", "Deepened knowledge in development, research and system administration."] },
    { title: "Apprentice native & PWA developer", lieux: "Nexi Conseils, Aigrefeuille d'Aunis", date: "2020 - 2021", ico: "briefcase", logo: "../../assets/logos/nexi-conseils.png", description: ["Native mobile (Android & iOS) and PWA development.", "Contributed to PIROUETTE, a leisure-center management app."] },
    { title: "LP Cloud & Mobile Development", lieux: "IUT La Rochelle, Niort", date: "2020 - 2021", ico: "graduation-cap", logo: "../../assets/logos/iut-la-rochelle.png", description: ["Cloud and mobility technologies.", "Foundations of sysadmin (Docker) and programming (React, Redux, NodeJS, Ruby)."] },
    { title: "Coder", lieux: "Museomix, Amiens", date: "2019", ico: "wrench", logo: "../../assets/logos/museomix.png", description: ["Museomix reinvents the interaction between visitors and museums.", "Worked as a coder on the Mix Ta Brique project — a rich, cross-discipline team experience."] },
  ],
  navLinks: [
    { id: "home", label: "Home" },
    { id: "projects", label: "Projects" },
    { id: "blog", label: "Blog" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ],
};
