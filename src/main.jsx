import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { applyTheme, getInitialTheme } from './theme.js'

// Apply theme before render to avoid a flash of the wrong theme
applyTheme(getInitialTheme());

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
