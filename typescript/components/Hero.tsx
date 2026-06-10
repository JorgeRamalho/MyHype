import { SLOGAN, GLOBE_LINK } from '@/data/content'

export function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="container hero-grid">
        <div>
          <p className="hero-slogan">⚡ {SLOGAN}</p>
          <h1 className="hero-title">
            Tudo que está <span className="text-gradient">bombando</span>, em um só portal.
          </h1>
          <p className="hero-text">
            Música, games, cinema, moda, tecnologia e creators. O My Hype reúne as
            tendências mais quentes da internet com curadoria da comunidade — feito
            para quem vive o agora.
          </p>
          <div className="hero-actions">
            <a href="#matricula" className="btn btn-primary">
              Fazer minha matrícula
            </a>
            <a href="#destaques" className="btn btn-ghost">
              Explorar destaques
            </a>
          </div>

          <div className="hero-stats" aria-label="Estatísticas do portal">
            <div className="hero-stat">
              <strong>120k+</strong>
              <span>Membros</span>
            </div>
            <div className="hero-stat">
              <strong>6</strong>
              <span>Categorias</span>
            </div>
            <div className="hero-stat">
              <strong>24/7</strong>
              <span>Conteúdo novo</span>
            </div>
          </div>
        </div>

        <div className="hero-art">
          <a
            href={GLOBE_LINK}
            className="hero-globe-link"
            title="Ver portfólio e parcerias"
            aria-label="Ir para o portfólio do My Hype"
          >
            <img
              src="/logo-globe.png"
              alt="Logomarca My Hype: globo terrestre"
              className="hero-globe"
              loading="eager"
            />
          </a>
        </div>
      </div>
    </section>
  )
}
