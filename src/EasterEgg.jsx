import { useEffect, useState, useRef } from "react";

export default function EasterEgg() {
  const [showGif, setShowGif] = useState(false);
  const [buffer, setBuffer] = useState("");
  const audioRef = useRef(null);

  useEffect(() => {
    const handleKey = (e) => {
      const key = e.key.toLowerCase();
      const next = (buffer + key).slice(-6);
      setBuffer(next);

      if (next === "daisan") {
        audioRef.current?.play(); // toca o áudio
        setShowGif(true);

        setTimeout(() => setShowGif(false), 4000);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [buffer]);

  return (
    <>
      <audio
        ref={audioRef}
        src="./public/s_killaqueencatchphrase.mp3"
        preload="auto"
      />
      {showGif && (
        <div className="easter-egg">
          <img
            src="https://media.tenor.com/EyOa8z5cyI4AAAAM/killer-queen.gif"
            alt="Daisan no bakudan!"
          />
          <p className="caption">バイツァ・ダスト！！</p>
        </div>
      )}
    </>
  );
}
