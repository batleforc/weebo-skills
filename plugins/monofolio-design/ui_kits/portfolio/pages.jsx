// pages.jsx — page bodies + Timeline / cards
const { createElement: c } = React;

function fmtDate(iso) {
  const d = new Date(iso);
  if (isNaN(d)) return iso;
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

// ---- Project card ----
function ProjectCard({ p, onNav }) {
  return c(window.Card, { hoverable: true, className: "pcard" },
    c("span", { className: "eyebrow" }, "Released · " + fmtDate(p.released)),
    c("h3", null, c("a", { href: "#", onClick: ev => { ev.preventDefault(); onNav("projects"); } }, p.title)),
    c("p", { className: "line-clamp-3" }, p.description),
    c("div", { className: "chips" },
      p.techno.slice(0, 3).map(t => c(window.TagBadge, { key: t }, t)),
      p.tags.slice(0, 2).map(t => c(window.TagBadge, { key: t, primary: true }, "#" + t))
    ),
    c("div", { className: "foot" },
      c("span", { className: "handle" }, p.handle),
      c("a", { className: "open", href: "#", onClick: ev => { ev.preventDefault(); onNav("projects"); } }, "Open")
    )
  );
}

// ---- Blog card ----
function BlogCard({ b, onNav }) {
  return c(window.Card, { hoverable: true, className: "pcard" },
    c("span", { className: "eyebrow" }, fmtDate(b.date)),
    c("h3", { style: { fontSize: "1.05rem" } }, c("a", { href: "#", onClick: ev => { ev.preventDefault(); onNav("blog"); } }, b.title)),
    c("p", { className: "line-clamp-3", style: { marginBottom: "0.75rem" } }, b.description),
    c("div", { className: "chips", style: { marginTop: 0, marginBottom: "0.75rem" } },
      b.tags.slice(0, 4).map(t => c(window.TagBadge, { key: t, primary: true }, "#" + t))
    ),
    c("div", { className: "foot", style: { marginTop: 0 } },
      c("span", { className: "handle" }, b.readingTime + " min read"),
      c("a", { className: "open", href: "#", onClick: ev => { ev.preventDefault(); onNav("blog"); } }, "Read")
    )
  );
}

// ---- Pac-Man timeline bubble ----
function PacmanBubble() {
  return c("svg", { className: "pacman-icon", width: 16, height: 16, viewBox: "0 0 32 24", style: { overflow: "visible" } },
    c("circle", { cx: 24, cy: 12, r: 1.5, fill: "var(--accent)" },
      c("animate", { attributeName: "cx", values: "24;12.8", dur: "0.9s", repeatCount: "indefinite" }),
      c("animate", { attributeName: "opacity", values: "1;1;0", dur: "0.9s", repeatCount: "indefinite" })),
    c("circle", { cx: 28, cy: 12, r: 1.2, fill: "var(--accent)" },
      c("animate", { attributeName: "cx", values: "28;12.8", dur: "0.9s", begin: "0.3s", repeatCount: "indefinite" }),
      c("animate", { attributeName: "opacity", values: "1;1;0", dur: "0.9s", begin: "0.3s", repeatCount: "indefinite" })),
    c("path", { d: "M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z", fill: "currentColor" }),
    c("path", { d: "M12 12L22 7.2L22 16.8Z", fill: "var(--background)" },
      c("animate", { attributeName: "d", dur: "0.42s", repeatCount: "indefinite", values: "M12 12L22 7.2L22 16.8Z;M12 12L22 10.2L22 13.8Z;M12 12L22 7.2L22 16.8Z" })),
    c("circle", { cx: 13.2, cy: 8.4, r: 1.25, fill: "var(--background)" })
  );
}

// ---- Timeline ----
function Timeline() {
  const D = window.DATA;
  return c("ol", { className: "timeline" },
    D.history.map((h, i) => c("li", { key: i, className: "tl-item" },
      c("div", { className: "tl-bubble" }, h.ico === "pacman" ? c(PacmanBubble) : c(window.Icon, { name: h.ico, size: 14 })),
      c(window.Card, { hoverable: true, className: "pcard", style: { flex: 1 } },
        c("div", { style: { display: "flex", alignItems: "flex-start", gap: "0.75rem" } },
          h.logo ? c("img", { className: "tl-logo", src: h.logo, alt: "" }) : null,
          c("div", { style: { flex: 1, minWidth: 0 } },
            c("span", { className: "eyebrow" }, h.date),
            c("h3", { style: { margin: "0.25rem 0 0.125rem" } }, h.title),
            c("p", { style: { fontSize: "0.875rem", color: "var(--muted-foreground)", margin: 0 } }, h.lieux)
          )
        ),
        c("div", { style: { marginTop: "0.5rem", display: "flex", flexDirection: "column", gap: "0.25rem" } },
          h.description.map((line, j) => c("p", { key: j, style: { fontSize: "0.875rem", color: "var(--muted-foreground)", margin: 0, lineHeight: 1.6 } }, line)))
      )
    ))
  );
}

// ---- Pages ----
function HomePage({ onNav }) {
  const D = window.DATA;
  return c("div", { className: "fade-in" },
    c(window.Hero, { onNav }),
    c("section", { className: "about-band", id: "about" },
      c("div", { className: "section-inner" },
        c(window.SectionTitle, null, "About me"),
        c(window.Card, { className: "pcard", style: { maxWidth: "48rem", padding: "1.5rem" } },
          c("div", { style: { display: "flex", flexDirection: "column", gap: "0.75rem" } },
            D.presentation.map((line, i) => c("p", { key: i, style: { lineHeight: 1.7, color: "var(--muted-foreground)", margin: 0 } }, line))))
      )
    ),
    c("section", null, c("div", { className: "section-inner" },
      c(window.SectionTitle, null, "Last projects"),
      c("div", { className: "grid-2" }, D.projects.slice(0, 6).map(p => c(ProjectCard, { key: p.handle, p, onNav })))
    )),
    c(window.Footer, { onNav })
  );
}

function ProjectsPage({ onNav }) {
  const D = window.DATA;
  return c("section", { className: "cyber-grid-bg fade-in", style: { minHeight: "calc(100vh - 3.5rem)" } },
    c("div", { className: "section-inner" },
      c(window.SectionTitle, null, "Projects"),
      c("p", { className: "muted", style: { marginBottom: "1.5rem", maxWidth: "40rem" } }, "Things I build between Dev, Ops and architecture — from network cores to GitOps platforms."),
      c("div", { className: "grid-2" }, D.projects.map(p => c(ProjectCard, { key: p.handle, p, onNav })))
    )
  );
}

function BlogPage({ onNav }) {
  const D = window.DATA;
  return c("section", { className: "cyber-grid-bg fade-in", style: { minHeight: "calc(100vh - 3.5rem)" } },
    c("div", { className: "section-inner" },
      c(window.SectionTitle, null, "Blog"),
      c("p", { className: "muted", style: { marginBottom: "1.5rem" } }, "Technical articles and field notes around software, platforms and a lot of coffee."),
      c("div", { className: "grid-2" }, D.blog.map(b => c(BlogCard, { key: b.handle, b, onNav })))
    )
  );
}

function AboutPage() {
  const D = window.DATA;
  return c("div", { className: "fade-in" },
    c("section", { className: "about-band" },
      c("div", { className: "section-inner" },
        c(window.SectionTitle, null, "About me"),
        c(window.Card, { className: "pcard", style: { maxWidth: "48rem", padding: "1.5rem" } },
          c("div", { style: { display: "flex", flexDirection: "column", gap: "0.75rem" } },
            D.presentation.map((line, i) => c("p", { key: i, style: { lineHeight: 1.7, color: "var(--muted-foreground)", margin: 0 } }, line))))
      )
    ),
    c("section", { id: "timeline" }, c("div", { className: "section-inner" },
      c(window.SectionTitle, null, "My Journey"),
      c(Timeline)
    ))
  );
}

function ContactPage() {
  const D = window.DATA;
  const items = [
    { icon: "clock", title: "Availability", body: D.availability },
    { icon: "briefcase", title: "Current work", body: D.currentWork },
    { icon: "map-pin", title: "Location", body: D.contactLocation },
    { icon: "external-link", title: "Links", links: D.social },
  ];
  return c("section", { className: "cyber-grid-bg fade-in", style: { minHeight: "calc(100vh - 3.5rem)" } },
    c("div", { className: "section-inner" },
      c(window.SectionTitle, null, "Contact"),
      c("p", { className: "muted", style: { marginBottom: "2rem", maxWidth: "36rem" } }, "Available to discuss Dev, Ops, architecture and platform topics."),
      c("div", { className: "grid-2" },
        items.map((it, i) => c(window.Card, { key: i, className: "contact-card" },
          c("div", { className: "contact-ico" }, c(window.Icon, { name: it.icon })),
          c("div", null,
            c("h3", null, it.title),
            it.links
              ? c("div", { style: { display: "flex", flexDirection: "column", gap: "0.25rem" } }, it.links.map(l => c("a", { key: l.name, href: l.url, target: "_blank", rel: "noopener noreferrer" }, l.name)))
              : c("p", null, it.body)))),
        c(window.Card, { className: "contact-card", style: { gridColumn: "1 / -1" } },
          c("div", { className: "contact-ico" }, c(window.Icon, { name: "mail" })),
          c("div", null, c("h3", null, "Email"), c("a", { href: "mailto:" + D.contactEmail }, D.contactEmail)))
      )
    )
  );
}

Object.assign(window, { ProjectCard, BlogCard, Timeline, HomePage, ProjectsPage, BlogPage, AboutPage, ContactPage });
