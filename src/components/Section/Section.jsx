// A shared wrapper for every page section.
// `children` is whatever goes between <Section> and </Section>,
// like the @ViewBuilder content closure of a SwiftUI container.
export default function Section({ id, title, children }) {
  return (
    <section id={id} className="section">
      {title && <h2 className="section__title">{title}</h2>}
      {children}
    </section>
  )
}
