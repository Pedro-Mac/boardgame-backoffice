import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface AuthState {
  auth: Auth | null
  isLoading: boolean
  setAuth: (token: Auth | null) => void
  setLoading: (loading: boolean) => void
}

export interface Auth {
  access_token: string
  expires_in: number
  refresh_token_expires_in: number
  token_type: string
}

export const useAuthStore = create<AuthState>()(
  devtools((set) => ({
    auth: null,
    isLoading: false,
    setLoading: (loading: boolean) => set({ isLoading: loading }),
    setAuth: (token: Auth | null) => set({ auth: token }),
  }))
)
