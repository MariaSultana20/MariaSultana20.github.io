import { motion } from 'framer-motion'
import { HiMail } from 'react-icons/hi'
import Section from '../Section/Section'
import SocialLinks from '../SocialLinks/SocialLinks'
import ContactForm from './ContactForm'
import { contact } from '../../data/links'
import { reveal, revealWithDelay } from '../../lib/motion'
import './Contact.css'

export default function Contact() {
  return (
    <Section id="contact" title="Let's build something together.">
      <div className="contact">
        <motion.div className="contact__intro" {...reveal}>
          <p className="contact__text">
            Have a role, a project or a question? Send me a message, or email me directly.
          </p>
          <a className="contact__email" href={contact.email}>
            <HiMail aria-hidden="true" /> {contact.emailAddress}
          </a>
          <SocialLinks only={['github', 'linkedin', 'codeforces', 'codechef', 'leetcode']} />
        </motion.div>

        <motion.div {...revealWithDelay(0.15)}>
          <ContactForm />
        </motion.div>
      </div>
    </Section>
  )
}
