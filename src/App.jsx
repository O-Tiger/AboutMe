import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import Content from "./Content";
import EasterEgg from "./EasterEgg";
import './App.css';

function App() {
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "pt");

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  return (
    <>
      <ThemeToggle lang={lang} setLang={setLang} />
      <div className="wrapper">
        <Content lang={lang} />
      </div>
      <EasterEgg />
    </>
  );
}

export default App;
