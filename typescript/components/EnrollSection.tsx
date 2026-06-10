import type { RegisteredUser } from '@/types'
import { SLOGAN } from '@/data/content'
import { EnrollmentForm } from './EnrollmentForm'

interface EnrollSectionProps {
  onRegister: (user: RegisteredUser) => void
}

export function EnrollSection({ onRegister }: EnrollSectionProps) {
  return (
    <section className="enroll" id="matricula">
      <div className="container enroll-grid">
        <div className="enroll-info">
          <span className="section-tag">Matrícula gratuita</span>
          <h2 className="section-title">
            Entre para a <span className="text-gradient">comunidade</span> que
            vive o hype primeiro
          </h2>
          <p className="section-subtitle">
            A matrícula é 100% gratuita e leva menos de 2 minutos. Com ela, você
            desbloqueia todo o conteúdo do portal e ganha sua identidade oficial
            na comunidade My Hype.
          </p>
          <ul>
            <li>
              <span aria-hidden="true">🎯</span>
              <span><strong>Feed personalizado</strong> — música, games, cinema, moda, tech: você escolhe o que vem primeiro.</span>
            </li>
            <li>
              <span aria-hidden="true">🔔</span>
              <span><strong>Alertas de hype</strong> — drops, estreias e lançamentos avisados antes de bombar.</span>
            </li>
            <li>
              <span aria-hidden="true">💬</span>
              <span><strong>Comunidade ativa</strong> — comente, vote nas tendências e converse com quem vive a mesma vibe.</span>
            </li>
            <li>
              <span aria-hidden="true">🎟️</span>
              <span><strong>Número de matrícula exclusivo</strong> — sua identidade única no portal, gerada na hora da confirmação.</span>
            </li>
          </ul>

          {/* Hero integrado à coluna esquerda: o formulário ocupa toda a altura ao lado. */}
          <div className="enroll-hero" id="inicio">
            <p className="hero-slogan">⚡ {SLOGAN}</p>
            <h1 className="hero-title">
              Tudo que está <span className="text-gradient">bombando</span>, em
              um só portal.
            </h1>
            <p className="hero-text">
              Música, games, cinema, moda, tecnologia e creators. O My Hype
              reúne as tendências mais quentes da internet com curadoria da
              comunidade — feito para quem vive o agora.
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
        </div>

        <EnrollmentForm onRegister={onRegister} />
      </div>
    </section>
  )
}
