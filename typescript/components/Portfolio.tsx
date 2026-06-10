import { CAROUSEL_SLIDES } from '@/data/content'

export function Portfolio() {
  return (
    <section id="portfolio">
      <div className="container">
        <span className="section-tag">Portfólio &amp; Parcerias</span>
        <h2 className="section-title">
          Trabalhos que fizeram o <span className="text-gradient">hype crescer</span>
        </h2>
        <p className="section-subtitle">
          Cada projeto é uma parceria que colaborou para o nosso crescimento.
          Conheça os trabalhos criados e os parceiros que constroem essa história
          com a gente.
        </p>

        <div className="portfolio-grid">
          {CAROUSEL_SLIDES.map((work) => (
            <article className="portfolio-card" key={work.image}>
              <div className="portfolio-cover">
                <img src={work.image} alt={`Projeto ${work.title}`} loading="lazy" />
              </div>
              <div className="portfolio-body">
                <h3>{work.title}</h3>
                <p>{work.caption}</p>
                <span className="portfolio-badge">🤝 Parceria</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
