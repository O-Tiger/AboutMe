import { useEffect, useState } from "react";

const BASE = "https://lynx.nexusheim.com/github";

// Valid period values for the ?period= query param
const PERIODS =["today","1week","30days","60days","90days","180days","1year","alltime"];

function StatCard({ label, value, loading }) {
  return (
    <div className="stat-card">
      <span className="stat-value">{loading ? "—" : value}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

function LangBar({ langs }) {
  if (!langs.length) return null;
  return (
    <div className="lang-section">
      <div className="lang-bar">
        {langs.map((l) => (
          <div
            key={l.name}
            className="lang-bar-segment"
            style={{
              width: `${l.pct.toFixed(1)}%`,
              background: l.color || "#63b3ed",
            }}
            title={`${l.name} ${l.pct.toFixed(1)}%`}
          />
        ))}
      </div>
      <div className="lang-legend">
        {langs.slice(0, 6).map((l) => (
          <span key={l.name} className="lang-legend-item">
            <span
              className="lang-dot"
              style={{ background: l.color || "#63b3ed" }}
            />
            {l.name}
            <span className="lang-pct">{l.pct.toFixed(1)}%</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function GitHubStats({ lang = "pt", period = "1year" }) {
  const [stats, setStats]   = useState(null);
  const [streak, setStreak] = useState(null);
  const [langs, setLangs]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(false);

  const safePeriod = PERIODS.includes(period) ? period : "1year";

  useEffect(() => {
    async function fetchAll() {
      try {
        const [statsRes, streakRes, langsRes] = await Promise.all([
          fetch(`${BASE}/stats.json?period=${safePeriod}`),
          fetch(`${BASE}/streak.json`),
          fetch(`${BASE}/langs.json`),
        ]);

        if (!statsRes.ok || !streakRes.ok || !langsRes.ok)
          throw new Error("API error");

        const [statsData, streakData, langsData] = await Promise.all([
          statsRes.json(),
          streakRes.json(),
          langsRes.json(),
        ]);

        if (statsData.error || streakData.error || langsData.error)
          throw new Error("Upstream error");

        setStats(statsData);
        setStreak(streakData);
        setLangs(Array.isArray(langsData) ? langsData : []);
      } catch (e) {
        console.error("[GitHubStats.fetchAll] failed to load stats:", e);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, [safePeriod]);

  const labels = {
    pt: {
      stars:     "Stars",
      commits:   "Commits (ano)",
      followers: "Seguidores",
      streak:    "Streak atual",
      topLangs:  "Linguagens mais usadas",
      error:     "Não foi possível carregar as stats. Tente recarregar a página.",
    },
    en: {
      stars:     "Stars",
      commits:   "Commits (year)",
      followers: "Followers",
      streak:    "Current Streak",
      topLangs:  "Top Languages",
      error:     "Could not load stats. Try refreshing the page.",
    },
  };

  const t = labels[lang] || labels.pt;

  if (error) {
    return <div className="stats-error">⚠️ {t.error}</div>;
  }

  return (
    <div className="github-stats">
      <div className="stat-cards">
        <StatCard label={t.stars}     value={stats?.stars?.toLocaleString()}    loading={loading} />
        <StatCard label={t.commits}   value={stats?.commits?.toLocaleString()}  loading={loading} />
        <StatCard label={t.followers} value={stats?.followers?.toLocaleString()} loading={loading} />
        <StatCard label={t.streak}    value={streak ? `${streak.current}d` : "—"} loading={loading} />
      </div>

      {!loading && langs.length > 0 && (
        <div className="lang-section-wrapper">
          <span className="lang-title">{t.topLangs}</span>
          <LangBar langs={langs} />
        </div>
      )}

      {loading && (
        <div className="stats-skeleton">
          <div className="skeleton-bar" />
          <div className="skeleton-legend">
            {[1, 2, 3, 4].map((i) => <div key={i} className="skeleton-pill" />)}
          </div>
        </div>
      )}
    </div>
  );
}
