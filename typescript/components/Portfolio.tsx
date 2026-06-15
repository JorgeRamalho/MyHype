import { useMemo } from 'react'
import { CAROUSEL_ONLY_SLIDES, PORTFOLIO_SLIDES } from '@/data/content'
import type { CarouselSlide } from '@/data/content'
import { publicAsset } from '@/utils/publicAsset'

const PORTFOLIO_GROUPS = [
  'Design Inovador',
  'Case de Sucesso',
  'Office Business',
  'Hi-Tech',
  'Mobilidade & Lifestyle',
] as const

const GROUP_SIZE = 3

type PortfolioWork = CarouselSlide & { badge: 'parceria' | 'destaque' }

function PortfolioCard({ work }: { work: PortfolioWork }) {
  return (
    <article className="portfolio-card">
      <div className="portfolio-cover">
        <img src={publicAsset(work.image)} alt={`Projeto ${work.title}`} loading="lazy" />
      </div>
      <div className="portfolio-body">
        <h3>{work.title}</h3>
        <p>{work.caption}</p>
        <span className="portfolio-badge">
          {work.badge === 'parceria' ? '🤝 Parceria' : '✨ Destaque'}
        </span>
      </div>
    </article>
  )
}

/** Monta os cards do portfólio em ordem fixa. */
function buildPortfolioWorks(): PortfolioWork[] {
  return [
    ...PORTFOLIO_SLIDES.map((s) => ({ ...s, badge: 'parceria' as const })),
    ...CAROUSEL_ONLY_SLIDES.map((s) => ({ ...s, badge: 'destaque' as const })),
  ]
}

function chunkPortfolioGroups(works: PortfolioWork[]) {
  return PORTFOLIO_GROUPS.map((label, index) => ({
    label,
    works: works.slice(index * GROUP_SIZE, index * GROUP_SIZE + GROUP_SIZE),
  })).filter((group) => group.works.length > 0)
}

export function Portfolio() {
  const groups = useMemo(() => chunkPortfolioGroups(buildPortfolioWorks()), [])

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

        <div className="portfolio-groups">
          {groups.map((group) => (
            <fieldset className="portfolio-fieldset portfolio-fieldset--group" key={group.label}>
              <legend className="portfolio-legend">{group.label}</legend>
              <div
                className="portfolio-grid portfolio-grid--group"
                aria-label={`Projetos: ${group.label}`}
              >
                {group.works.map((work) => (
                  <PortfolioCard work={work} key={work.image} />
                ))}
              </div>
            </fieldset>
          ))}
        </div>
      </div>
    </section>
  )
}
