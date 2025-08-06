import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import Content from "./Content";
import EasterEgg from "./EasterEgg";
import './App.css';

function App() {
  return <>
    <ThemeToggle />
    <Content />
    <EasterEgg />
  </>;
}

export default App;
