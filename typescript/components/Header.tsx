import { publicAsset } from '@/utils/publicAsset'

interface HeaderProps {
  onLoginClick: () => void
  loggedUser: string | null
  onLogout: () => void
}

export function Header({ onLoginClick, loggedUser, onLogout }: HeaderProps) {
  return (
    <header className="header">
      <div className="container header-inner">
        <a href="#inicio" className="brand">
          <span className="brand-badge">
            <img
              src={publicAsset('/logo-globe.png')}
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

        <div className="header-actions">
          {loggedUser ? (
            <>
              <span className="caption">Olá, {loggedUser.split(' ')[0]} 👋</span>
              <button className="btn btn-ghost btn-sm" onClick={onLogout}>
                Sair
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-ghost btn-sm" onClick={onLoginClick}>
                Entrar
              </button>
              <a href="#matricula" className="btn btn-primary btn-sm">
                Matricule-se
              </a>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
