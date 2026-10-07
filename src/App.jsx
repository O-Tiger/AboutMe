import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import Content from "./Content";
import EasterEgg from "./EasterEgg";
import './App.css';

function App() {
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "pt");

  // Text typed in the mobile-only input; EasterEgg matches egg codes against it
  const [eggInput, setEggInput] = useState("");

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  return (
    <>
      <ThemeToggle lang={lang} setLang={setLang} />
      <div className="wrapper">
        <Content lang={lang} setMobileEggInput={setEggInput} />
      </div>
      <EasterEgg externalInput={eggInput} />
    </>
  );
}

export default App;
