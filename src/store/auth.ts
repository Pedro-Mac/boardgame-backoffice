import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface AuthState {
  user: {
    id: string
    email: string
    name: string
  } | null

  isLoading: boolean
  setLoading: (loading: boolean) => void
  setUser: (user: { id: string; email: string; name: string } | null) => void
}

export const useAuthStore = create<AuthState>()(
  devtools((set) => ({
    user: null,
    isLoading: false,

    setLoading: (loading: boolean) => set({ isLoading: loading }),
    setUser: (user: { id: string; email: string; name: string } | null) =>
      set({ user }),
  }))
)
