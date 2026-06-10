import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import type { EnrollmentData, RegisteredUser } from '@/types'
import { INTEREST_OPTIONS, BRAZILIAN_STATES } from '@/data/content'
import {
  maskPhone,
  maskCpf,
  maskCep,
  isValidEmail,
  isValidCpf,
  isValidPhone,
  passwordStrength,
  generateMatricula,
} from '@js/masks.js'

const INITIAL_DATA: EnrollmentData = {
  fullName: '',
  birthDate: '',
  cpf: '',
  email: '',
  phone: '',
  cep: '',
  city: '',
  state: '',
  interest: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
}

type Errors = Partial<Record<keyof EnrollmentData, string>>

interface EnrollmentFormProps {
  onRegister: (user: RegisteredUser) => void
}

export function EnrollmentForm({ onRegister }: EnrollmentFormProps) {
  const [data, setData] = useState<EnrollmentData>(INITIAL_DATA)
  const [errors, setErrors] = useState<Errors>({})
  const [registered, setRegistered] = useState<RegisteredUser | null>(null)

  const strength = passwordStrength(data.password)

  function setField<K extends keyof EnrollmentData>(key: K, value: EnrollmentData[K]) {
    setData((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target
    const key = name as keyof EnrollmentData

    if (key === 'phone') return setField('phone', maskPhone(value))
    if (key === 'cpf') return setField('cpf', maskCpf(value))
    if (key === 'cep') return setField('cep', maskCep(value))
    if (key === 'acceptTerms') {
      return setField('acceptTerms', (e.target as HTMLInputElement).checked)
    }
    setField(key, value as never)
  }

  function validate(): Errors {
    const next: Errors = {}

    if (data.fullName.trim().split(/\s+/).length < 2) {
      next.fullName = 'Informe nome e sobrenome.'
    }
    if (!data.birthDate) {
      next.birthDate = 'Informe sua data de nascimento.'
    } else {
      const age = (Date.now() - new Date(data.birthDate).getTime()) / (365.25 * 24 * 3600 * 1000)
      if (age < 13) next.birthDate = 'É preciso ter 13 anos ou mais.'
      if (age > 120) next.birthDate = 'Data de nascimento inválida.'
    }
    if (!isValidCpf(data.cpf)) next.cpf = 'CPF inválido.'
    if (!isValidEmail(data.email)) next.email = 'E-mail inválido.'
    if (!isValidPhone(data.phone)) next.phone = 'Telefone inválido. Use DDD + número.'
    if (data.cep.replace(/\D/g, '').length !== 8) next.cep = 'CEP inválido.'
    if (!data.city.trim()) next.city = 'Informe sua cidade.'
    if (!data.state) next.state = 'Selecione o estado.'
    if (!data.interest) next.interest = 'Escolha um interesse principal.'
    if (passwordStrength(data.password) < 3) {
      next.password = 'Senha fraca: use 8+ caracteres, maiúscula, número e símbolo.'
    }
    if (data.confirmPassword !== data.password) {
      next.confirmPassword = 'As senhas não coincidem.'
    }
    if (!data.acceptTerms) next.acceptTerms = 'É preciso aceitar os termos.'

    return next
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) return

    const user: RegisteredUser = {
      matricula: generateMatricula(),
      fullName: data.fullName.trim(),
      email: data.email.trim().toLowerCase(),
      phone: data.phone,
      password: data.password,
      interest: data.interest,
      createdAt: new Date().toISOString(),
    }

    onRegister(user)
    setRegistered(user)
  }

  function resetForm() {
    setData(INITIAL_DATA)
    setErrors({})
    setRegistered(null)
  }

  if (registered) {
    return (
      <div className="form-card success-card" role="status">
        <div className="avatar" aria-hidden="true">⚡</div>
        <h3>Matrícula confirmada, {registered.fullName.split(' ')[0]}!</h3>
        <p className="caption">
          Bem-vindo(a) à comunidade My Hype. Guarde o seu número de matrícula:
        </p>
        <div className="matricula-badge">{registered.matricula}</div>
        <p className="caption">
          Enviamos os detalhes para <strong>{registered.email}</strong>. Agora é só
          fazer login e curtir o conteúdo de <strong>{registered.interest}</strong>.
        </p>
        <br />
        <button className="btn btn-ghost btn-sm" onClick={resetForm}>
          Cadastrar outra pessoa
        </button>
      </div>
    )
  }

  return (
    <form className="form-card" onSubmit={handleSubmit} noValidate>
      <h3>Formulário de matrícula</h3>
      <p>
        Preencha as quatro etapas abaixo para criar sua conta. Ao confirmar, seu
        número de matrícula é gerado na hora — sem fila, sem espera.
      </p>

      <div className="form-grid">
        <span className="form-legend">1 · Dados pessoais</span>

        <div className="field full">
          <label htmlFor="fullName">Nome completo *</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Ex.: Maria Oliveira da Silva"
            value={data.fullName}
            onChange={handleChange}
            className={errors.fullName ? 'invalid' : ''}
            autoComplete="name"
          />
          <span className="field-error">{errors.fullName}</span>
        </div>

        <div className="field">
          <label htmlFor="birthDate">Data de nascimento *</label>
          <input
            id="birthDate"
            name="birthDate"
            type="date"
            value={data.birthDate}
            onChange={handleChange}
            className={errors.birthDate ? 'invalid' : ''}
            autoComplete="bday"
          />
          <span className="field-hint">É preciso ter 13 anos ou mais.</span>
          <span className="field-error">{errors.birthDate}</span>
        </div>

        <div className="field">
          <label htmlFor="cpf">CPF *</label>
          <input
            id="cpf"
            name="cpf"
            type="text"
            inputMode="numeric"
            placeholder="000.000.000-00"
            value={data.cpf}
            onChange={handleChange}
            className={errors.cpf ? 'invalid' : ''}
          />
          <span className="field-hint">Digite só os números — os pontos entram sozinhos.</span>
          <span className="field-error">{errors.cpf}</span>
        </div>

        <span className="form-legend">2 · Contato</span>

        <div className="field">
          <label htmlFor="email">E-mail *</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="voce@email.com"
            value={data.email}
            onChange={handleChange}
            className={errors.email ? 'invalid' : ''}
            autoComplete="email"
          />
          <span className="field-hint">É para onde enviamos sua confirmação de matrícula.</span>
          <span className="field-error">{errors.email}</span>
        </div>

        <div className="field">
          <label htmlFor="phone">Telefone / WhatsApp *</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            placeholder="(11) 98765-4321"
            value={data.phone}
            onChange={handleChange}
            className={errors.phone ? 'invalid' : ''}
            autoComplete="tel"
          />
          <span className="field-hint">DDD + número. Avisos de hype direto no seu WhatsApp.</span>
          <span className="field-error">{errors.phone}</span>
        </div>

        <span className="form-legend">3 · Onde você está</span>

        <div className="field">
          <label htmlFor="cep">CEP *</label>
          <input
            id="cep"
            name="cep"
            type="text"
            inputMode="numeric"
            placeholder="01310-100"
            value={data.cep}
            onChange={handleChange}
            className={errors.cep ? 'invalid' : ''}
            autoComplete="postal-code"
          />
          <span className="field-hint">Usado para destacar eventos e drops da sua região.</span>
          <span className="field-error">{errors.cep}</span>
        </div>

        <div className="field">
          <label htmlFor="city">Cidade *</label>
          <input
            id="city"
            name="city"
            type="text"
            placeholder="Ex.: São Paulo"
            value={data.city}
            onChange={handleChange}
            className={errors.city ? 'invalid' : ''}
            autoComplete="address-level2"
          />
          <span className="field-error">{errors.city}</span>
        </div>

        <div className="field">
          <label htmlFor="state">Estado *</label>
          <select
            id="state"
            name="state"
            value={data.state}
            onChange={handleChange}
            className={errors.state ? 'invalid' : ''}
          >
            <option value="">Selecione…</option>
            {BRAZILIAN_STATES.map((uf) => (
              <option key={uf} value={uf}>{uf}</option>
            ))}
          </select>
          <span className="field-error">{errors.state}</span>
        </div>

        <span className="form-legend">4 · Sua vibe e seu acesso</span>

        <div className="field">
          <label htmlFor="interest">Interesse principal *</label>
          <select
            id="interest"
            name="interest"
            value={data.interest}
            onChange={handleChange}
            className={errors.interest ? 'invalid' : ''}
          >
            <option value="">Selecione…</option>
            {INTEREST_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <span className="field-hint">Define o que aparece primeiro no seu feed.</span>
          <span className="field-error">{errors.interest}</span>
        </div>

        <div className="field">
          <label htmlFor="password">Senha *</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Mínimo 8 caracteres"
            value={data.password}
            onChange={handleChange}
            className={errors.password ? 'invalid' : ''}
            autoComplete="new-password"
          />
          <div className="password-strength" aria-hidden="true">
            {[1, 2, 3, 4].map((level) => (
              <span
                key={level}
                className={
                  strength >= level
                    ? strength <= 2
                      ? 'on-weak'
                      : strength === 3
                        ? 'on-mid'
                        : 'on-strong'
                    : ''
                }
              />
            ))}
          </div>
          <span className="field-hint">Mínimo 8 caracteres, com maiúscula, número e símbolo.</span>
          <span className="field-error">{errors.password}</span>
        </div>

        <div className="field">
          <label htmlFor="confirmPassword">Confirmar senha *</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Repita a senha"
            value={data.confirmPassword}
            onChange={handleChange}
            className={errors.confirmPassword ? 'invalid' : ''}
            autoComplete="new-password"
          />
          <span className="field-error">{errors.confirmPassword}</span>
        </div>

        <label className="checkbox-row">
          <input
            type="checkbox"
            name="acceptTerms"
            checked={data.acceptTerms}
            onChange={handleChange}
          />
          <span>
            Li e aceito os <strong>termos de uso</strong> e a{' '}
            <strong>política de privacidade</strong> do My Hype. *
            {errors.acceptTerms && (
              <span className="field-error"> {errors.acceptTerms}</span>
            )}
          </span>
        </label>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Confirmar matrícula ⚡
          </button>
        </div>
      </div>
    </form>
  )
}
