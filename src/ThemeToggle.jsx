import { useState, useEffect } from "react";

export default function ThemeToggle({ lang, setLang }) {
  const [theme, setTheme] = useState(() => {
    return (
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    );
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const isDark = theme === "dark";

  return (
    <div className="topbar">
      {/* Language selector */}
      <div className="lang-selector">
        {["pt", "en"].map((l) => (
          <button
            key={l}
            className={`lang-btn${lang === l ? " active" : ""}`}
            onClick={() => setLang(l)}
          >
            {l === "pt" ? "🇧🇷 PT" : "🇺🇸 EN"}
          </button>
        ))}
      </div>

      {/* Theme toggle */}
      <button
        className="toggle"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        aria-label="Toggle theme"
      >
        {isDark ? "☀️ Light" : "🌙 Dark"}
      </button>
    </div>
  );
}
