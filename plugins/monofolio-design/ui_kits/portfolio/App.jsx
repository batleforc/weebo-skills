// App.jsx — router shell for the Monofolio portfolio UI kit
const { useState, useEffect, createElement: el } = React;

function App() {
  const [route, setRoute] = useState("home");
  const [lang, setLang] = useState("en");

  const onNav = (id) => { setRoute(id); window.scrollTo({ top: 0, behavior: "smooth" }); };

  useEffect(() => { document.title = "Maxime Leriche | Portfolio — " + route; }, [route]);

  const page = {
    home: () => el(window.HomePage, { onNav }),
    projects: () => el(window.ProjectsPage, { onNav }),
    blog: () => el(window.BlogPage, { onNav }),
    about: () => el(window.AboutPage),
    contact: () => el(window.ContactPage),
  }[route];

  return el(React.Fragment, null,
    el(window.NavBar, { active: route, onNav, lang, onToggleLang: () => setLang(l => l === "fr" ? "en" : "fr") }),
    el("main", { key: route }, page())
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));
