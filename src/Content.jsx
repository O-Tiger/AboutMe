import { useRef } from "react";
import GitHubStats from "./GitHubStats";

// ─── Status sort priority (lower = higher on page) ───────────────────────────
const STATUS_ORDER = { wip: 0, active: 1, paused: 2, discontinued: 3 };

const statusClass = {
  active: "status-active",
  wip: "status-wip",
  paused: "status-paused",
  discontinued: "status-disc",
};

const PORTFOLIO_URL = "https://o-tiger.github.io/O-Tiger/";

const i18n = {
  pt: {
    heroSub: "Dev · Gamer · Fã de anime e mangá",
    heroDesc: "O lado menos formal do meu trabalho — projetos antigos, jogos, anime e algumas surpresas escondidas.",
    portfolioLabel: "💼 Portfólio profissional",
    aboutTitle: "Sobre Mim",
    aboutItems: [
      { icon: "🇧🇷", text: "Desenvolvedor de São Paulo, Brasil" },
      { icon: "🕹️", text: "Entusiasta de jogos indie — Minecraft, Stardew Valley, Peak, Roblox e mais" },
      { icon: "🎙️", text: "Streamer na Twitch como oTigerJoga" },
      { icon: "💡", text: "Criatividade + código para experiências únicas" },
    ],
    animeLabel: "Fã de anime e mangá",
    projectsTitle: "Projetos Pessoais e Trabalhos Antigos",
    statsTitle: "GitHub Stats",
    eggTitle: "Easter Eggs",
    eggHint: "Digite palavras mágicas no teclado e veja o que acontece...",
    eggInputPlaceholder: "Digite aqui...",
    contactTitle: "Contato",
    footerText: "Feito com React + Vite · Obrigado pela visita!",
    statusLabels: {
      active: "● Ativo",
      wip: "◎ Em desenvolvimento",
      paused: "◌ Pausado",
      discontinued: "○ Descontinuado",
    },
    viewLabel: "→ Ver",
    demoLabel: "🌐 Demo",
  },
  en: {
    heroSub: "Dev · Gamer · Anime & Manga Fan",
    heroDesc: "The less formal side of my work — older projects, games, anime and a few hidden surprises.",
    portfolioLabel: "💼 Professional portfolio",
    aboutTitle: "About Me",
    aboutItems: [
      { icon: "🇧🇷", text: "Developer from São Paulo, Brazil" },
      { icon: "🕹️", text: "Indie gaming enthusiast — Minecraft, Stardew Valley, Peak, Roblox and more" },
      { icon: "🎙️", text: "Streams on Twitch as oTigerJoga" },
      { icon: "💡", text: "Creativity + code for unique experiences" },
    ],
    animeLabel: "Anime & manga fan",
    projectsTitle: "Side Projects & Older Work",
    statsTitle: "GitHub Stats",
    eggTitle: "Easter Eggs",
    eggHint: "Type magic words on your keyboard and see what happens...",
    eggInputPlaceholder: "Type here...",
    contactTitle: "Get in Touch",
    footerText: "Built with React + Vite · Thanks for stopping by!",
    statusLabels: {
      active: "● Active",
      wip: "◎ In Development",
      paused: "◌ Paused",
      discontinued: "○ Discontinued",
    },
    viewLabel: "→ View",
    demoLabel: "🌐 Live Demo",
  },
};

export default function Content({ lang = "pt", setMobileEggInput = () => { } }) {
  const t = i18n[lang];
  const inputRef = useRef(null);

  // ─── Projects ──────────────────────────────────────────────────────────────
  // `weight`: lower = appears first within the same status group.
  // Sorting rule: STATUS_ORDER first, then weight ascending.
  const projects = [
    {
      emoji: "📚",
      name: "MagnatasWiki",
      desc: {
        pt: "Wiki comunitária para documentação do servidor.",
        en: "Community wiki platform for server documentation.",
      },
      stack: "JavaScript",
      url: "https://github.com/O-Tiger/MagnatasWiki",
      demoUrl: "https://o-tiger.github.io/MagnatasWiki/",
      demo: true,
      status: "active",
      weight: 1,
    },
    {
      emoji: "💎",
      name: "CrystalDefense",
      desc: {
        pt: "Tower defense cooperativo standalone — pausado como projeto independente, integrado como módulo nexusprism-crystal dentro do NexusPrism.",
        en: "Cooperative tower defense — paused as standalone, integrated as the nexusprism-crystal module inside NexusPrism.",
      },
      stack: "Java / PaperMC",
      url: "https://github.com/O-Tiger/CrystalDefense",
      status: "paused",
      weight: 4,
    },
    {
      emoji: "🌙",
      name: "DreamingsExperience",
      desc: {
        pt: "Plugin Minecraft que simula sonhos e pesadelos — efeitos visuais e comportamentos únicos durante o sono dos jogadores.",
        en: "Minecraft plugin that simulates dreams and nightmares — unique visual effects and behaviors while players sleep.",
      },
      stack: "Java / PaperMC",
      url: "https://github.com/O-Tiger/DreamingsExperience",
      status: "paused",
      weight: 1,
    },
    {
      emoji: "⚔️",
      name: "Boss1.20.x",
      desc: {
        pt: "Plugin que centraliza mecânicas de boss customizado — comportamentos avançados, fases e habilidades especiais.",
        en: "Plugin that centralizes custom boss mechanics — advanced behaviors, phases and special abilities.",
      },
      stack: "Java / PaperMC",
      url: "https://github.com/O-Tiger/Boss1.20.x",
      status: "paused",
      weight: 2,
    },
    {
      emoji: "🔌",
      name: "AePortMultiBuy",
      desc: {
        pt: "Plugin para Applied Energistics 2 — adiciona compra em massa via interface AE.",
        en: "Plugin for Applied Energistics 2 — adds bulk purchase via AE interface.",
      },
      stack: "Java / PaperMC",
      url: "https://github.com/O-Tiger/AePortMultiBuy",
      status: "paused",
      weight: 3,
    },
  ];

  // Sort: by status priority first, then by weight
  const sortedProjects = [...projects].sort((a, b) => {
    const statusDiff = (STATUS_ORDER[a.status] ?? 99) - (STATUS_ORDER[b.status] ?? 99);
    if (statusDiff !== 0) return statusDiff;
    return (a.weight ?? 99) - (b.weight ?? 99);
  });

  const animes = [
    {
      name: "Berserk",
      pt: "Guts, mesmo diante da escuridão mais absoluta, escolhe seguir adiante — enfrentar complexidades com resiliência.",
      en: "Guts, even in absolute darkness, chooses to keep moving — face complexity with resilience."
    },
    {
      name: "Jujutsu Kaisen",
      pt: "Até as maldições podem ser dominadas com técnica. O código exige domínio real — não atalhos.",
      en: "Even curses can be mastered with technique. Code demands real mastery — no shortcuts."
    },
    {
      name: "Blue Lock",
      pt: "Para chegar ao topo, você precisa acreditar genuinamente que é o melhor — e trabalhar por isso.",
      en: "To reach the top, you must genuinely believe you're the best — and work for it."
    },
    {
      name: "JoJo's Bizarre Adventure",
      pt: "Pose, estilo e determinação são tão importantes quanto força bruta.",
      en: "Pose, style and determination are just as important as brute force."
    },
    {
      name: "Eminence in Shadow",
      pt: "Agir nas sombras e deixar os resultados falarem por si mesmos.",
      en: "Act in the shadows and let the results speak for themselves."
    },
    {
      name: "Tensura",
      pt: "Com habilidade de absorver e aprender tudo ao redor, qualquer um pode construir algo grandioso do zero.",
      en: "With the ability to absorb and learn everything around you, anyone can build something great from scratch."
    },
    {
      name: "Solo Leveling",
      pt: "Começar do zero, ser subestimado, e mesmo assim levantar nível após nível.",
      en: "Start from zero, be underestimated, and still level up again and again."
    },
  ];

  const contacts = [
    { icon: "🐙", platform: { pt: "GitHub", en: "GitHub" }, value: "@O-Tiger", url: "https://github.com/O-Tiger" },
    { icon: "🎮", platform: { pt: "Twitch", en: "Twitch" }, value: "oTigerJoga", url: "https://www.twitch.tv/oTigerJoga" },
    { icon: "🗣️", platform: { pt: "Discord", en: "Discord" }, value: { pt: "Fale comigo", en: "Message me" }, url: "https://discord.com/users/1133570571049893888" },
    { icon: "⛏️", platform: { pt: "Servidor MC", en: "MC Server" }, value: "nexusprism.blazebr.com", url: "https://discord.gg/ZTkXjtxbxe" },
  ];

  // Mobile easter egg input handler — resets after each keystroke so the
  // EasterEgg component always sees the full accumulated value via prop.
  const handleMobileEggInput = (e) => {
    const val = e.target.value;
    setMobileEggInput(val);
    // Auto-reset after a short pause so the field feels like a "magic" prompt
    if (inputRef.current) {
      clearTimeout(inputRef.current._resetTimer);
      inputRef.current._resetTimer = setTimeout(() => {
        setMobileEggInput("");
        if (inputRef.current) inputRef.current.value = "";
      }, 3000);
    }
  };

  return (
    <>
      {/* Hero */}
      <div className="hero">
        <h1 className="hero-name"><span className="tiger">🐯</span> <span className="name-text">O-Tiger</span></h1>
        <p className="hero-sub">
          {t.heroSub.split(" · ").map((s, i, arr) => (
            <span key={i}>{s}{i < arr.length - 1 ? <> · </> : ""}</span>
          ))}
        </p>
        <p style={{ color: "var(--fg-muted)", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
          {t.heroDesc}
        </p>
        <div className="hero-badges">
          <a className="badge-link" href={PORTFOLIO_URL} target="_blank" rel="noopener noreferrer">{t.portfolioLabel}</a>
          <a className="badge-link" href="https://github.com/O-Tiger" target="_blank" rel="noopener noreferrer">🐙 GitHub</a>
          <a className="badge-link" href="https://www.twitch.tv/oTigerJoga" target="_blank" rel="noopener noreferrer">🎮 Twitch</a>
          <a className="badge-link" href="https://discord.com/users/1133570571049893888" target="_blank" rel="noopener noreferrer">🗣️ Discord</a>
        </div>
      </div>

      {/* About */}
      <div className="section">
        <h2>🧑‍💻 {t.aboutTitle}</h2>
        <ul className="about-list">
          {t.aboutItems.map((item, i) => (
            <li key={i}><span className="icon">{item.icon}</span> {item.text}</li>
          ))}
          <li>
            <span className="icon">📚</span>
            <span>
              {t.animeLabel}:{" "}
              {animes.map((a, i) => (
                <span key={a.name}>
                  <span className="anime-tag" title={a[lang]}>{a.name}</span>
                  {i < animes.length - 1 ? ", " : ""}
                </span>
              ))}
            </span>
          </li>
        </ul>
      </div>

      {/* Projects */}
      <div className="section">
        <h2>📌 {t.projectsTitle}</h2>
        <div className="projects-grid">
          {sortedProjects.map((p) => (
            <div className="project-card" key={p.name}>
              <div className="project-card-header">
                <div className="project-card-title">{p.emoji} {p.name}</div>
                <span className={`project-status ${statusClass[p.status]}`}>
                  {t.statusLabels[p.status]}
                </span>
              </div>
              <div className="project-card-desc">{p.desc[lang]}</div>
              <div className="project-card-footer">
                <span className="project-stack">{p.stack}</span>
                <a className="project-link" href={p.demo ? (p.demoUrl || p.url) : p.url} target="_blank" rel="noopener noreferrer">
                  {p.demo ? t.demoLabel : t.viewLabel}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="section">
        <h2>📊 {t.statsTitle}</h2>
        <GitHubStats lang={lang} />
      </div>

      {/* Easter Eggs */}
      <div className="section">
        <h2>🥚 {t.eggTitle}</h2>
        <div className="egg-hint">
          <span>🤫</span>&nbsp;{t.eggHint}&nbsp;
          <span>guts · gojo · arise · atomic · rimuru · tiger · ego · daisan</span>
        </div>
        {/* Mobile-only input — hidden on desktop via CSS */}
        <input
          ref={inputRef}
          className="egg-input-mobile"
          type="text"
          placeholder={t.eggInputPlaceholder}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          onChange={handleMobileEggInput}
        />
      </div>

      {/* Contact */}
      <div className="section">
        <h2>📫 {t.contactTitle}</h2>
        <div className="contact-grid">
          {contacts.map((c) => (
            <a className="contact-item" href={c.url} key={c.url} target="_blank" rel="noopener noreferrer">
              <span className="contact-icon">{c.icon}</span>
              <span className="contact-label">
                <span className="contact-platform">{c.platform[lang]}</span>
                <span className="contact-value">{typeof c.value === "object" ? c.value[lang] : c.value}</span>
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>{t.footerText}</p>
      </footer>
    </>
  );
}
