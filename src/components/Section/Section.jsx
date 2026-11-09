// A shared wrapper for every page section.
// `children` is whatever goes between <Section> and </Section>,
// like the @ViewBuilder content closure of a SwiftUI container.
//
// The <section> spans the full window width (so backgrounds can go edge to edge),
// and the inner div keeps the content centred at a readable max width.
// `background` is optional content drawn behind everything, like a ZStack's bottom layer.
export default function Section({ id, title, className = '', background, children }) {
  return (
    <section id={id} className={`section ${className}`}>
      {background}
      <div className="section__inner">
        {title && <h2 className="section__title">{title}</h2>}
        {children}
      </div>
    </section>
  )
}
