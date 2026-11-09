import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { HiMail } from 'react-icons/hi'
import { contact, profiles } from '../../data/links'
import './SocialLinks.css'

// Every social link the site can show. A component picks some of them with the `only` prop.
// (Codeforces, CodeChef and LeetCode are added in Step 5 for the Contact section.)
const ALL_LINKS = {
  github: { label: 'GitHub', href: profiles.github, Icon: FaGithub },
  linkedin: { label: 'LinkedIn', href: profiles.linkedin, Icon: FaLinkedin },
  email: { label: 'Email', href: contact.email, Icon: HiMail },
}

export default function SocialLinks({ only = Object.keys(ALL_LINKS) }) {
  return (
    <ul className="social-links">
      {only.map((key) => {
        // Capitalised `Icon` so JSX treats it as a component, not an HTML tag.
        const { label, href, Icon } = ALL_LINKS[key]
        const isExternal = href.startsWith('http')
        return (
          <li key={key}>
            <a
              href={href}
              aria-label={label} // the icon has no text, so screen readers need a label
              title={label}
              {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
            >
              <Icon size={22} aria-hidden="true" />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
