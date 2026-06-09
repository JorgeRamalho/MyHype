import { TRENDS } from '@/data/content'

export function Trending() {
  return (
    <section id="destaques">
      <div className="container">
        <span className="section-tag">Destaques</span>
        <h2 className="section-title">
          O que está em <span className="text-gradient">alta agora</span>
        </h2>
        <p className="section-subtitle">
          Conteúdo selecionado pela comunidade e pela redação. Títulos, textos e
          legendas pensados para você ir direto ao que importa.
        </p>

        <div className="trending-grid">
          {TRENDS.map((trend) => (
            <article className="trend-card" key={trend.id}>
              <div className="trend-cover" aria-hidden="true">
                {trend.emoji}
              </div>
              <div className="trend-body">
                <span className="trend-tag">{trend.tag}</span>
                <h3>{trend.title}</h3>
                <p>{trend.text}</p>
                <div className="trend-meta">
                  <span>{trend.author}</span>
                  <span>{trend.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
