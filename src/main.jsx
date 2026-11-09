// Entry point, like `@main struct App`. It mounts the React tree into <div id="root"> in index.html.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Importing a CSS file applies it to the whole page. Vite bundles it.
import './styles/fonts.css'
import './styles/theme.css'
import './styles/global.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  // StrictMode adds extra checks during development only (like debug assertions).
  <StrictMode>
    <App />
  </StrictMode>,
)
