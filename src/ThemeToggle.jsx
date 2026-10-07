import { useState, useEffect } from "react";
import { applyTheme, getInitialTheme } from "./theme.js";

export default function ThemeToggle({ lang, setLang }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);
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
