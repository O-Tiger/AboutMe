import { useEffect, useState, useRef } from "react";

export default function EasterEgg({ externalInput = "" }) {
  const [activeEgg, setActiveEgg] = useState(null);
  const [buffer, setBuffer] = useState("");
  const audioRef = useRef(null);

  const eggs = {
    // ─── JoJo's Bizarre Adventure ───────────────────────────────────────────
    daisan: {
      gif: "https://media.tenor.com/EyOa8z5cyI4AAAAM/killer-queen.gif",
      text: "バイツァ・ダスト！！",
      audio: "s_killaqueencatchphrase.mp3",
      duration: 4000,
    },
    jojopose: {
      gif: "https://c.tenor.com/nh-cFsAv5awAAAAC/tenor.gif",
      text: "ゴゴゴゴゴゴ…",
      audio: "ora-ora-ora-ora-ora-ora-ora-mp3cut.mp3",
      duration: 12000,
    },
    yoshikage: {
      gif: "https://media.tenor.com/r3EmTWSFJhMAAAAM/killer-queen-kira.gif",
      text: "私の名前はキラ・ヨシカゲ… 私はただ、穏やかに暮らしたい。",
      audio: "videoplayback.m4a",
      duration: 5000,
    },
    // MARK: TODO
    giorno: {
      gif: "https://i.imgur.com/QWWcL35.mp4",
      text: "I, Giorno Giovanna, have a dream.",
      audio: "Giorno-Giovanna.mp3",
      duration: 3200,
    },

    // ─── Blue Lock ──────────────────────────────────────────────────────────
    ego: {
      gif: "https://c.tenor.com/yIZbhasDNm0AAAAd/tenor.gif",
      text: "Egoist, Yoichi Isagi",
      audio: "egoista-isagi-yoichi.mp3",
      duration: 4000,
    },
    brurulock: {
      gif: "https://c.tenor.com/Yq4oyH9W6YQAAAAd/tenor.gif",
      text: "Auf die Knie, blue lock.",
      audio: "kaiser-get-on-your-knees-blue-lock.mp3",
      duration: 9000,
    },
    // MARK: TODO
    bluelock: {
      gif: "https://media.tenor.com/3C6LHYF2u_wAAAAM/blue-lock-isagi.gif",
      text: "⚽ Devo me tornar o melhor atacante do mundo.",
      audio: null,
      duration: 4000,
    },
    // MARK: TODO
    bachira: {
      gif: "https://media.tenor.com/e1cw55y4fGwAAAAM/blue-lock-bachira.gif",
      text: "O monstro dentro de mim está faminto!",
      audio: null,
      duration: 4000,
    },

    // ─── Jujutsu Kaisen ─────────────────────────────────────────────────────
    tanjiro: {
      gif: "https://c.tenor.com/LmakYdm5RAoAAAAd/tenor.gif",
      text: "",
      audio: "tanjiro-boom-boom_TP4f3vB.mp3",
      duration: 3000,
    },
    gomen: {
      gif: "https://c.tenor.com/eyLzzpMtZi8AAAAd/tenor.gif",
      text: "Gomen, Amanai. Hontōni gomen. Ima wa kimi ni hara o tatete iru wake de mo nai. Dareka o nikunde iru wake de mo nai. Tadaima, sekai wa kanpeki ni omoeru.",
      audio: "desculpa-amanai.mp3",
      duration: 38000,
    },
    // MARK: TODO
    gojo: {
      gif: "https://media.tenor.com/V2lWVTmQREYAAAAM/gojo-satoru.gif",
      text: "Fui abençoado com os olhos mais fortes.",
      audio: null,
      duration: 4000,
    },
    // MARK: TODO
    sukuna: {
      gif: "https://media.tenor.com/zzxr8SAQHYEAAAAM/sukuna-ryomen-sukuna.gif",
      text: "Abra, abra. — Sukuna",
      audio: null,
      duration: 4000,
    },
    // MARK: TODO
    domain: {
      gif: "https://media.tenor.com/ZHRy-pHXfMEAAAAM/gojo-satoru-jjk.gif",
      text: "Expansão do Território: Vazio Infinito.",
      audio: null,
      duration: 5000,
    },

    // ─── Eminence in Shadow ─────────────────────────────────────────────────
    shadow: {
      gif: "https://media.tenor.com/rZGFguPbNkIAAAAM/cid.gif",
      text: "I...... am....... Atomic......!",
      audio: "i-am-atomic.mp3",
      duration: 4700,
    },
    atomic: {
      gif: "https://media.tenor.com/YmcBY9nlAwsAAAAM/cid-kagenou-eminence-in-shadow.gif",
      text: "I am... the eminence in shadow.",
      audio: "the-eminence-in-shadow.mp3",
      duration: 15500,
    },
    // MARK: TODO
    diablos: {
      gif: "https://media.tenor.com/Q88y5TSwFRsAAAAM/shadow-garden-eminence-in-shadow.gif",
      text: "Nós somos Shadow Garden. Nós destruiremos o Culto da Diablos das trevas!",
      audio: null,
      duration: 5000,
    },

    // ─── Tensura / That Time I Got Reincarnated as a Slime ──────────────────
    rimuru: {
      gif: "predador.gif",
      text: "Habilidade única: Predador. Analisando.... registrado.",
      audio: "predador.mp3",
      duration: 5890,
    },
    // MARK: TODO
    tensura: {
      gif: "https://media.tenor.com/gPHHbBDY3GQAAAAM/rimuru-rimuru-tempest.gif",
      text: "Meu nome é Rimuru Tempest. Líder da Grande Federação Jura.",
      audio: null,
      duration: 5000,
    },
    slime: {
      gif: "https://media.tenor.com/Y1X1sdx9x4IAAAAM/tensura-slime.gif",
      text: "Eu fui reencarnado como um slime… mas estou bem com isso.",
      audio: null,
      duration: 4000,
    },

    // ─── Solo Leveling ───────────────────────────────────────────────────────
    arise: {
      gif: "https://c.tenor.com/5X8vb3RRkkoAAAAd/tenor.gif",
      text: "Arise.",
      audio: "arise-solo-leveling.mp3",
      duration: 7900,
    },
    jinwoo: {
      gif: "https://c.tenor.com/MtIgSWgMfjEAAAAC/tenor.gif",
      text: "Sung Jin-Woo — O mais fraco caçador do mundo… por enquanto.",
      audio: null,
      duration: 5000,
    },
    monarch: {
      gif: "https://media.tenor.com/YFdzRtx2e6sAAAAM/sung-jin-woo-new-episode.gif",
      text: "Eu sou o Monarca das Sombras.",
      audio: "the-shadow-monarch.mp3",
      duration: 2000,
    },

    // ─── Berserk ─────────────────────────────────────────────────────────────
    guts: {
      gif: "https://c.tenor.com/RHgUyUYav98AAAAC/tenor.gif",
      text: "Mesmo nos momentos mais sombrios, eu continuo avançando. — Guts",
      audio: null,
      duration: 5000,
    },
    berserk: {
      gif: "https://c.tenor.com/Mab6dEbD1iMAAAAd/tenor.gif",
      text: "I'm not going to die here.",
      audio: null,
      duration: 5000,
    },
    griffith: {
      gif: "https://c.tenor.com/_YsTB7bPTs8AAAAC/tenor.gif",
      text: "Um homem que não sacrificaria nada nunca conseguirá nada.",
      audio: null,
      duration: 5000,
    },

    // ─── Tiger / próprio ─────────────────────────────────────────────────────
    tiger: {
      gif: "https://media.tenor.com/pM2gfUz2xmgAAAAM/lions-win.gif",
      text: "🐯 ROAR!",
      audio: "roar-tiger.mp3",
      duration: 1000,
    },
  };

  // Check buffer against egg codes and trigger if matched
  const checkBuffer = (buf) => {
    Object.keys(eggs).forEach((code) => {
      if (buf.endsWith(code)) {
        setActiveEgg(code);
        if (eggs[code].audio && audioRef.current) {
          audioRef.current.src = eggs[code].audio;
          audioRef.current.play().catch(() => {});
        }
        setTimeout(() => setActiveEgg(null), eggs[code].duration);
      }
    });
  };

  // Desktop: keyboard listener
  useEffect(() => {
    const handleKey = (e) => {
      const key = e.key.toLowerCase();
      const next = (buffer + key).slice(-15);
      setBuffer(next);
      checkBuffer(next);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [buffer]);

  // Mobile: react to externalInput changes
  useEffect(() => {
    if (!externalInput) return;
    const val = externalInput.toLowerCase().slice(-15);
    checkBuffer(val);
  }, [externalInput]);

  return (
    <>
      <audio ref={audioRef} preload="auto" />
      {activeEgg && (
        <div className="easter-egg">
          <img src={eggs[activeEgg].gif} alt="Easter Egg" />
          {eggs[activeEgg].text && (
            <p className="caption">{eggs[activeEgg].text}</p>
          )}
        </div>
      )}
    </>
  );
}