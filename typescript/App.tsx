import { useEffect, useState } from 'react'
import type { RegisteredUser } from '@/types'
import { Header } from '@/components/Header'
import { Carousel } from '@/components/Carousel'
import { Hero } from '@/components/Hero'
import { Categories } from '@/components/Categories'
import { Trending } from '@/components/Trending'
import { Portfolio } from '@/components/Portfolio'
import { EnrollSection } from '@/components/EnrollSection'
import { LoginModal } from '@/components/LoginModal'
import { Footer } from '@/components/Footer'

const STORAGE_KEY = 'myhype:users'
const SESSION_KEY = 'myhype:session'

function loadUsers(): RegisteredUser[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
  } catch {
    return []
  }
}

export default function App() {
  const [users, setUsers] = useState<RegisteredUser[]>(loadUsers)
  const [loggedUser, setLoggedUser] = useState<string | null>(
    () => sessionStorage.getItem(SESSION_KEY),
  )
  const [loginOpen, setLoginOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
  }, [users])

  function handleRegister(user: RegisteredUser) {
    setUsers((prev) => [...prev.filter((u) => u.email !== user.email), user])
  }

  function handleLogin(user: RegisteredUser) {
    sessionStorage.setItem(SESSION_KEY, user.fullName)
    setLoggedUser(user.fullName)
    setLoginOpen(false)
  }

  function handleLogout() {
    sessionStorage.removeItem(SESSION_KEY)
    setLoggedUser(null)
  }

  return (
    <>
      <div className="space-backdrop" aria-hidden="true">
        <div className="stars stars-far"></div>
        <div className="stars stars-mid"></div>
        <div className="stars stars-near"></div>
      </div>

      <Header
        onLoginClick={() => setLoginOpen(true)}
        loggedUser={loggedUser}
        onLogout={handleLogout}
      />
      <main>
        <Carousel />
        <Hero />
        <Categories />
        <Trending />
        <Portfolio />
        <EnrollSection onRegister={handleRegister} />
      </main>
      <Footer />

      {loginOpen && (
        <LoginModal
          users={users}
          onClose={() => setLoginOpen(false)}
          onLogin={handleLogin}
        />
      )}
    </>
  )
}
