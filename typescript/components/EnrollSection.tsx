import type { RegisteredUser } from '@/types'
import { EnrollmentForm } from './EnrollmentForm'

interface EnrollSectionProps {
  onRegister: (user: RegisteredUser) => void
}

export function EnrollSection({ onRegister }: EnrollSectionProps) {
  return (
    <section className="enroll" id="matricula">
      <div className="container enroll-grid">
        <div className="enroll-info">
          <span className="section-tag">Matrícula</span>
          <h2 className="section-title">
            Entre para a <span className="text-gradient">comunidade</span>
          </h2>
          <p className="section-subtitle">
            A matrícula é gratuita e leva menos de 2 minutos. Com ela, você
            desbloqueia tudo que o portal oferece.
          </p>
          <ul>
            <li>
              <span aria-hidden="true">🎯</span>
              <span><strong>Feed personalizado</strong> — conteúdo com base nos seus interesses.</span>
            </li>
            <li>
              <span aria-hidden="true">🔔</span>
              <span><strong>Alertas de hype</strong> — avisos de drops, estreias e lançamentos.</span>
            </li>
            <li>
              <span aria-hidden="true">💬</span>
              <span><strong>Comunidade</strong> — comente, vote e converse com outros membros.</span>
            </li>
            <li>
              <span aria-hidden="true">🎟️</span>
              <span><strong>Número de matrícula</strong> — sua identidade única no portal, gerada na hora.</span>
            </li>
          </ul>
        </div>

        <EnrollmentForm onRegister={onRegister} />
      </div>
    </section>
  )
}
