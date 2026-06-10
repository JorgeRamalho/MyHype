import { CAROUSEL_SLIDES, PORTFOLIO_GROUPS } from '@/data/content'

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

        <div className="portfolio-trios">
          {PORTFOLIO_GROUPS.map((group) => (
            <div className={`portfolio-trio portfolio-trio--${group.id}`} key={group.id}>
              <header className="portfolio-trio-header">
                <span className="portfolio-trio-icon" aria-hidden="true">
                  {group.icon}
                </span>
                <div>
                  <h3>{group.title}</h3>
                  <p>{group.description}</p>
                </div>
              </header>

              <div className="portfolio-trio-grid">
                {CAROUSEL_SLIDES.filter((work) => work.group === group.id).map((work) => (
                  <article className="portfolio-card" key={work.image}>
                    <div className="portfolio-cover">
                      <img src={work.image} alt={`Projeto ${work.title}`} loading="lazy" />
                    </div>
                    <div className="portfolio-body">
                      <h4>{work.title}</h4>
                      <p>{work.caption}</p>
                      <span className="portfolio-badge">🤝 Parceria</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
