import { useState } from 'react'
import type { FormEvent } from 'react'
import type { RegisteredUser } from '@/types'
import { isValidEmail } from '@js/masks.js'

interface LoginModalProps {
  users: RegisteredUser[]
  onClose: () => void
  onLogin: (user: RegisteredUser) => void
}

export function LoginModal({ users, onClose, onLogin }: LoginModalProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [feedback, setFeedback] = useState<{ type: 'error' | 'success'; text: string } | null>(null)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (!isValidEmail(email)) {
      setFeedback({ type: 'error', text: 'Informe um e-mail válido.' })
      return
    }
    if (!password) {
      setFeedback({ type: 'error', text: 'Informe sua senha.' })
      return
    }

    const user = users.find(
      (u) => u.email === email.trim().toLowerCase() && u.password === password,
    )

    if (!user) {
      setFeedback({
        type: 'error',
        text: 'E-mail ou senha incorretos. Ainda não é membro? Faça sua matrícula.',
      })
      return
    }

    setFeedback({ type: 'success', text: `Bem-vindo(a) de volta, ${user.fullName.split(' ')[0]}!` })
    setTimeout(() => onLogin(user), 700)
  }

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal">
        <div className="modal-head">
          <h3 id="login-title">Entrar no My Hype</h3>
          <button className="modal-close" onClick={onClose} aria-label="Fechar">
            ×
          </button>
        </div>
        <p className="caption">Use o e-mail e a senha cadastrados na sua matrícula.</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="login-email">E-mail</label>
            <input
              id="login-email"
              type="email"
              placeholder="voce@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              autoFocus
            />
          </div>

          <div className="field">
            <label htmlFor="login-password">Senha</label>
            <input
              id="login-password"
              type="password"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          {feedback && (
            <div className={`login-feedback ${feedback.type}`} role="alert">
              {feedback.text}
            </div>
          )}

          <button type="submit" className="btn btn-primary">
            Entrar ⚡
          </button>

          <p className="caption">
            Ainda não tem conta?{' '}
            <a href="#matricula" onClick={onClose}>
              Faça sua matrícula gratuita
            </a>
            .
          </p>
        </form>
      </div>
    </div>
  )
}
