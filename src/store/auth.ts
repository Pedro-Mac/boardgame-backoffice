import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface AuthState {
  authToken: string | null
  isLoading: boolean
  setLoading: (loading: boolean) => void
  setAuthToken: (token: string | null) => void
}

export const useAuthStore = create<AuthState>()(
  devtools((set) => ({
    authToken: null,
    isLoading: false,
    setLoading: (loading: boolean) => set({ isLoading: loading }),
    setAuthToken: (token: string | null) => set({ authToken: token }),
  }))
)
