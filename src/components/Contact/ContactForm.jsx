import { useState } from 'react'
import { HiCheckCircle, HiExclamationCircle, HiPaperAirplane } from 'react-icons/hi'
import { contact, formspreeId } from '../../data/links'

const EMPTY_FORM = { name: '', email: '', message: '' }

/**
 * Contact form that sends to Formspree (no backend of our own).
 *
 * "Controlled inputs": React state holds each field's text, and every keystroke updates it,
 * like a TextField bound to @State with $name.
 */
export default function ContactForm() {
  const [values, setValues] = useState(EMPTY_FORM)
  // 'idle' | 'sending' | 'success' | 'error' | 'not-configured'
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')

  // One change handler for all three fields: the input's `name` says which value to update.
  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value })) // copy, then replace one field
  }

  const handleSubmit = async (event) => {
    // By default a form submit reloads the page; we send with fetch instead.
    event.preventDefault()

    if (!formspreeId) {
      setStatus('not-configured')
      return
    }

    setStatus('sending')
    try {
      // FormData collects every named field in the form, including the hidden honeypot.
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        body: new FormData(event.currentTarget),
        headers: { Accept: 'application/json' }, // ask Formspree for JSON, not a redirect page
      })

      if (response.ok) {
        setStatus('success')
        setValues(EMPTY_FORM)
      } else {
        const body = await response.json().catch(() => ({}))
        setErrorMessage(body.errors?.map((e) => e.message).join(', ') || 'Something went wrong.')
        setStatus('error')
      }
    } catch {
      setErrorMessage('Could not reach the server. Check your connection and try again.')
      setStatus('error')
    }
  }

  const isSending = status === 'sending'

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {/* htmlFor links each label to its input, so clicking the label focuses the field
          and screen readers read the label (like accessibilityLabel). */}
      <div className="contact-form__field">
        <label htmlFor="contact-name">Name</label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required // the browser blocks submit and shows a message if empty
          value={values.name}
          onChange={handleChange}
        />
      </div>

      <div className="contact-form__field">
        <label htmlFor="contact-email">Email</label>
        <input
          id="contact-email"
          name="email"
          type="email" // the browser checks the format, and phones show an email keyboard
          autoComplete="email"
          required
          value={values.email}
          onChange={handleChange}
        />
      </div>

      <div className="contact-form__field">
        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          value={values.message}
          onChange={handleChange}
        />
      </div>

      {/* Honeypot: hidden from people (off-screen, skipped by Tab and screen readers),
          but spam bots fill in every field. Formspree drops submissions where _gotcha has text. */}
      <div className="contact-form__honeypot" aria-hidden="true">
        <label htmlFor="contact-gotcha">Leave this field empty</label>
        <input id="contact-gotcha" type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" className="button button--primary contact-form__submit" disabled={isSending}>
        <HiPaperAirplane aria-hidden="true" /> {isSending ? 'Sending…' : 'Send message'}
      </button>

      {/* role="status" is read out politely; role="alert" interrupts, which suits errors. */}
      {status === 'success' && (
        <p className="contact-form__message contact-form__message--success" role="status">
          <HiCheckCircle aria-hidden="true" /> Thanks! Your message is on its way. I&apos;ll reply soon.
        </p>
      )}
      {status === 'error' && (
        <p className="contact-form__message contact-form__message--error" role="alert">
          <HiExclamationCircle aria-hidden="true" /> {errorMessage} You can also email me at{' '}
          <a href={contact.email}>{contact.emailAddress}</a>.
        </p>
      )}
      {status === 'not-configured' && (
        <p className="contact-form__message contact-form__message--error" role="alert">
          <HiExclamationCircle aria-hidden="true" /> The contact form isn&apos;t connected yet. Please email me
          directly at <a href={contact.email}>{contact.emailAddress}</a>.
        </p>
      )}
    </form>
  )
}
