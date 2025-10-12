import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { loginUser } from '@/services/auth/login'
import { refreshToken } from '@/services/auth/refreshToken'
import { useAuthStore } from '@/store/auth'
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: Index,
  beforeLoad: async () => {
    const user = useAuthStore.getState().auth
    const { setAuth } = useAuthStore.getState()
    if (!user) {
      const token = await refreshToken()
      console.log('refreshed token', token)

      if (!token) {
        throw redirect({ to: '/auth/login' })
      }
      setAuth(token)
      throw redirect({ to: '/admin/games' })
    } else {
      if (user) {
        throw redirect({ to: '/admin/games' })
      }
    }
  },
})

function Index() {
  const { isLoading, setLoading, setAuth } = useAuthStore((state) => state)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    const token = await loginUser(email, password)

    setAuth(token)
    setLoading(false)
    navigate({ to: '/admin/games' })
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case 'email':
        setEmail(event.target.value)
        break
      case 'password':
        setPassword(event.target.value)
        break
      default:
        break
    }
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          className="mb-2"
          name="email"
          value={email}
          onChange={handleInputChange}
        />
        <Input
          type="password"
          placeholder="Password"
          className="mb-2"
          name="password"
          value={password}
          onChange={handleInputChange}
        />
        <Button variant="secondary" disabled={isLoading}>
          Submit
        </Button>
      </form>
    </main>
  )
}
