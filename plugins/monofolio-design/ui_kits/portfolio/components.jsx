// components.jsx — primitives + chrome (Navbar, Hero, Footer)
const { useState, useMemo, createElement: e } = React;
const Icon = window.Icon;

// ---- Primitives ----
function Card({ children, className = "", hoverable = false, panel = false, ...rest }) {
  return e("div", { className: `card ${hoverable ? "hoverable" : ""} ${panel ? "panel-card" : ""} ${className}`, ...rest }, children);
}
function TagBadge({ children, primary = false }) {
  return e("span", { className: `tag ${primary ? "tag-primary" : ""}` }, children);
}
function SectionTitle({ children }) {
  return e("h2", { className: "section-title" }, children);
}
function Button({ variant = "primary", children, href, onClick, leftIcon }) {
  const cls = `btn btn-${variant}`;
  const inner = [leftIcon ? e(Icon, { name: leftIcon, key: "i" }) : null, e("span", { key: "t" }, children)];
  if (href) return e("a", { className: cls, href, onClick }, inner);
  return e("button", { className: cls, onClick }, inner);
}
window.Card = Card; window.TagBadge = TagBadge; window.SectionTitle = SectionTitle; window.Button = Button;

// ---- Navbar ----
function NavBar({ active, onNav, lang, onToggleLang }) {
  const [q, setQ] = useState("");
  const D = window.DATA;
  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return [];
    const pages = D.navLinks.map(l => ({ title: l.label, desc: l.id === "home" ? "Portfolio home page." : `Go to ${l.label}.`, kind: "page", id: l.id }));
    const proj = D.projects.map(p => ({ title: p.title, desc: p.description, kind: "project", id: "projects" }));
    const blog = D.blog.map(b => ({ title: b.title, desc: b.description, kind: "blog", id: "blog" }));
    return [...pages, ...proj, ...blog]
      .filter(i => i.title.toLowerCase().includes(needle) || i.desc.toLowerCase().includes(needle))
      .slice(0, 7);
  }, [q]);

  const langLabel = lang === "fr" ? "EN" : "FR";
  return e("header", { className: "nav cyber-grid-bg" },
    e("div", { className: "nav-inner" },
      e("button", { className: "nav-logo", onClick: () => onNav("home"), "aria-label": "Home", style: { background: "none", border: "none" } }, "Max."),
      e("nav", { className: "nav-links" },
        D.navLinks.map(l => e("button", { key: l.id, className: `nav-link ${active === l.id ? "active" : ""}`, onClick: () => onNav(l.id) }, l.label))
      ),
      e("div", { className: "search-wrap nav-search-desktop", style: { width: "13rem", flexShrink: 0 } },
        e("input", { className: "nav-search", type: "search", placeholder: "Search a page...", value: q, onChange: ev => setQ(ev.target.value) }),
        q.trim() && e("div", { className: "search-results" },
          results.length === 0
            ? e("p", { style: { padding: "0.75rem 1rem", fontSize: "0.85rem", color: "var(--muted-foreground)", margin: 0 } }, "No result.")
            : results.map((r, i) => e("a", { key: i, className: "search-item", href: "#", onClick: ev => { ev.preventDefault(); onNav(r.id); setQ(""); } },
                e("span", { className: "search-item-kind" }, r.kind),
                e("p", { className: "search-item-title" }, r.title),
                e("p", { className: "search-item-desc" }, r.desc)))
        )
      ),
      e("button", { className: "lang-btn lang-desktop", onClick: onToggleLang, "aria-label": "Toggle language" }, langLabel)
    )
  );
}
window.NavBar = NavBar;

// ---- Hero ----
function Hero({ onNav }) {
  const D = window.DATA;
  const n = D.coverTitle.length, total = n * 3;
  return e("section", { className: "hero cyber-grid-bg" },
    e("div", { className: "hero-inner" },
      e("p", { className: "hero-greeting" }, D.greeting),
      e("h1", { className: "hero-name glitch" }, D.name),
      e("div", { className: "hero-ticker" },
        D.coverTitle.map((t, i) => e("span", { key: i, className: "hero-ticker-item", style: { animationDelay: `${i * 3}s`, animationDuration: `${total}s` } }, t))
      ),
      e("p", { className: "hero-desc" }, D.shortDescription + " — a passionate Swiss Army knife between Dev, Ops and architecture."),
      e("div", { className: "hero-actions" },
        e(Button, { variant: "primary", leftIcon: "arrow-right", onClick: () => onNav("about") }, "More about me"),
        e("div", { style: { display: "flex", gap: "0.75rem", alignItems: "center" } },
          D.social.map(s => e("a", { key: s.name, className: "btn btn-icon", href: s.url, target: "_blank", rel: "noopener noreferrer", title: s.name, "aria-label": s.name }, e(Icon, { name: s.icon }))))
      )
    ),
    e("div", { "aria-hidden": "true" }, e("div", { className: "hero-blob" }))
  );
}
window.Hero = Hero;

// ---- Footer ----
function Footer({ onNav }) {
  return e("footer", { className: "footer" },
    e("div", { className: "footer-inner" },
      e("p", { style: { fontSize: "0.875rem", color: "var(--muted-foreground)", margin: 0 } }, "Let's build something useful."),
      e(Button, { variant: "outline", onClick: () => onNav("contact") }, "Contact me")
    )
  );
}
window.Footer = Footer;
