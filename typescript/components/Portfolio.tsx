import { useMemo } from 'react'
import { CAROUSEL_ONLY_SLIDES, PORTFOLIO_SLIDES } from '@/data/content'
import type { CarouselSlide } from '@/data/content'

const DISTRIBAR_IMAGE = '/carousel-15.png'

type PortfolioWork = CarouselSlide & { badge: 'parceria' | 'destaque' }

/** Insere a Distribar em uma posição aleatória entre todos os cards do portfólio. */
function buildPortfolioWorks(): PortfolioWork[] {
  const distribar = CAROUSEL_ONLY_SLIDES.find((s) => s.image === DISTRIBAR_IMAGE)
  const others: PortfolioWork[] = [
    ...PORTFOLIO_SLIDES.map((s) => ({ ...s, badge: 'parceria' as const })),
    ...CAROUSEL_ONLY_SLIDES.filter((s) => s.image !== DISTRIBAR_IMAGE).map((s) => ({
      ...s,
      badge: 'destaque' as const,
    })),
  ]

  if (!distribar) return others

  const randomIndex = Math.floor(Math.random() * (others.length + 1))
  const withDistribar: PortfolioWork[] = [...others]
  withDistribar.splice(randomIndex, 0, { ...distribar, badge: 'destaque' })
  return withDistribar
}

export function Portfolio() {
  const works = useMemo(() => buildPortfolioWorks(), [])

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

        <fieldset className="portfolio-fieldset">
          <div className="portfolio-grid" aria-label="Trabalhos e parcerias">
            {works.map((work) => (
              <article className="portfolio-card" key={work.image}>
                <div className="portfolio-cover">
                  <img src={work.image} alt={`Projeto ${work.title}`} loading="lazy" />
                </div>
                <div className="portfolio-body">
                  <h3>{work.title}</h3>
                  <p>{work.caption}</p>
                  <span className="portfolio-badge">
                    {work.badge === 'parceria' ? '🤝 Parceria' : '✨ Destaque'}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </fieldset>
      </div>
    </section>
  )
}
