import { useState } from 'react'
import { HiMenu, HiX } from 'react-icons/hi'
import { resume } from '../../data/links'
import { useActiveSection } from '../../hooks/useActiveSection'
import './Navbar.css'

// Defined outside the component so it's the same array on every render.
// (useActiveSection's useEffect re-runs if this reference changes.)
const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
]
const SECTION_IDS = NAV_ITEMS.map((item) => item.id)

export default function Navbar() {
  // Like @State var isMenuOpen = false
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const activeId = useActiveSection(SECTION_IDS)

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="navbar">
      <nav className="navbar__inner" aria-label="Main">
        {/* href="#hero" is an anchor link: it scrolls to the element with id="hero". */}
        <a href="#hero" className="navbar__logo" onClick={closeMenu} aria-label="Maria Sultana, back to top">
          MS
        </a>

        {/* Only visible below 768px (see the media query in Navbar.css). */}
        <button
          type="button"
          className="navbar__toggle"
          aria-expanded={isMenuOpen}
          aria-controls="navbar-menu"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>

        {/* In JSX, `class` is written `className`. The extra class opens the mobile menu. */}
        <ul id="navbar-menu" className={`navbar__menu ${isMenuOpen ? 'navbar__menu--open' : ''}`}>
          {/* .map() turns data into elements, like ForEach. `key` works like Identifiable.id. */}
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`navbar__link ${activeId === item.id ? 'navbar__link--active' : ''}`}
                aria-current={activeId === item.id ? 'true' : undefined}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            {/* rel="noopener noreferrer" is a safety habit for links that open a new tab. */}
            <a href={resume} className="navbar__resume" target="_blank" rel="noopener noreferrer">
              Resume
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
