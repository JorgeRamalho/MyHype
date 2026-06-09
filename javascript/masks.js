// Utilitários em JavaScript puro — máscaras e validações de formulário.

/** Aplica máscara de telefone brasileiro: (11) 98765-4321 */
export function maskPhone(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 2) return digits.replace(/(\d{0,2})/, '($1')
  if (digits.length <= 6) return digits.replace(/(\d{2})(\d{0,4})/, '($1) $2')
  if (digits.length <= 10) return digits.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3')
  return digits.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3')
}

/** Aplica máscara de CPF: 123.456.789-00 */
export function maskCpf(value) {
  return value
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

/** Aplica máscara de CEP: 01310-100 */
export function maskCep(value) {
  return value
    .replace(/\D/g, '')
    .slice(0, 8)
    .replace(/(\d{5})(\d)/, '$1-$2')
}

/** Valida e-mail com expressão regular simples e segura. */
export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
}

/** Valida CPF pelo algoritmo oficial dos dígitos verificadores. */
export function isValidCpf(value) {
  const cpf = value.replace(/\D/g, '')
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false

  const check = (sliceLen) => {
    let sum = 0
    for (let i = 0; i < sliceLen; i++) {
      sum += Number(cpf[i]) * (sliceLen + 1 - i)
    }
    const rest = (sum * 10) % 11
    return (rest === 10 ? 0 : rest) === Number(cpf[sliceLen])
  }

  return check(9) && check(10)
}

/** Valida telefone brasileiro (10 ou 11 dígitos). */
export function isValidPhone(value) {
  const digits = value.replace(/\D/g, '')
  return digits.length === 10 || digits.length === 11
}

/**
 * Calcula a força da senha: 0 (vazia) a 4 (forte).
 * Critérios: tamanho >= 8, letra maiúscula, número, caractere especial.
 */
export function passwordStrength(value) {
  if (!value) return 0
  let score = 0
  if (value.length >= 8) score++
  if (/[A-Z]/.test(value)) score++
  if (/\d/.test(value)) score++
  if (/[^A-Za-z0-9]/.test(value)) score++
  return score
}

/** Gera um número de matrícula único: MH-2026-A1B2C3 */
export function generateMatricula() {
  const year = new Date().getFullYear()
  const random = Math.random().toString(36).slice(2, 8).toUpperCase()
  return `MH-${year}-${random}`
}
