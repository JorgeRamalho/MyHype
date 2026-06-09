import { SLOGAN } from '@/data/content'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#inicio" className="brand">
              <span className="brand-badge brand-badge-sm">
                <img
                  src="/logo-globe.png"
                  alt="Logomarca My Hype: globo terrestre"
                  className="brand-logo"
                  width={36}
                  height={36}
                />
              </span>
              <span className="brand-name">
                My <span>Hype</span>
              </span>
            </a>
            <p>
              {SLOGAN} O portal que conecta você às tendências de música, games,
              cinema, moda, tecnologia e creators.
            </p>
          </div>

          <div>
            <h4>Portal</h4>
            <ul>
              <li><a href="#inicio">Início</a></li>
              <li><a href="#categorias">Categorias</a></li>
              <li><a href="#destaques">Destaques</a></li>
              <li><a href="#matricula">Matrícula</a></li>
            </ul>
          </div>

          <div>
            <h4>Comunidade</h4>
            <ul>
              <li><a href="#matricula">Seja membro</a></li>
              <li><a href="#destaques">Creators</a></li>
              <li><a href="#destaques">Eventos</a></li>
              <li><a href="#destaques">Newsletter</a></li>
            </ul>
          </div>

          <div>
            <h4>Institucional</h4>
            <ul>
              <li><a href="#inicio">Sobre o My Hype</a></li>
              <li><a href="#inicio">Termos de uso</a></li>
              <li><a href="#inicio">Privacidade</a></li>
              <li><a href="#inicio">Contato</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} My Hype. Todos os direitos reservados.</span>
          <span>Feito com React + TypeScript ⚡</span>
        </div>
      </div>
    </footer>
  )
}
