import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getAuthUser } from '@/services/auth/getAuthUser'
import { loginUser } from '@/services/auth/login'
import { useAuthStore } from '@/store/auth'
import { useUserStore } from '@/store/user'
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/auth/login')({
  component: RouteComponent,
  loader: async () => {
    // This can be used to check if the user is already logged in
    const token = useAuthStore.getState().auth
    if (token) {
      throw redirect({ to: '/admin/games' })
    }
  },
})

function RouteComponent() {
  const { isAuthLoading, setAuthLoading, setAuth } = useAuthStore(
    (state) => state
  )
  const { setUser } = useUserStore((state) => state)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setAuthLoading(true)

    const token = await loginUser(email, password)
    const user = await getAuthUser(token.access_token)
    if (!user) {
      setAuthLoading(false)
      // Handle error (e.g., show a message to the user)
      return
    }

    setAuth(token)
    setUser(user)
    setAuthLoading(false)
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
        <Button variant="secondary" disabled={isAuthLoading}>
          Submit
        </Button>
      </form>
    </main>
  )
}
