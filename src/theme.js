// Per-site key: both portfolio sites live on o-tiger.github.io and would
// otherwise share one localStorage entry and follow each other's theme.
export const THEME_KEY = "personal-theme";
const DEFAULT_THEME = "dark";

export function getInitialTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch (e) {
    console.error("[theme.getInitialTheme] could not read saved theme:", e);
  }
  return DEFAULT_THEME;
}

export function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  document.body.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (e) {
    console.error("[theme.applyTheme] could not save theme:", e);
  }
}
