/** Tipos compartilhados do portal My Hype. */

export interface Category {
  id: string
  emoji: string
  name: string
  caption: string
}

export interface TrendItem {
  id: string
  tag: string
  emoji: string
  title: string
  text: string
  author: string
  readTime: string
}

export interface EnrollmentData {
  fullName: string
  birthDate: string
  cpf: string
  email: string
  phone: string
  cep: string
  city: string
  state: string
  interest: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
}

export interface RegisteredUser {
  matricula: string
  fullName: string
  email: string
  phone: string
  password: string
  interest: string
  createdAt: string
}
