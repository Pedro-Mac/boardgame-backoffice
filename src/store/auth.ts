import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface AuthState {
  auth?: Auth | null
  isAuthLoading: boolean
  setAuth: (token: Auth | null) => void
  setAuthLoading: (loading: boolean) => void
}

export interface Auth {
  access_token: string
  expires_in: number
  refresh_token_expires_in: number
  token_type: string
}

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      auth: undefined,
      isAuthLoading: false,
      setAuthLoading: (loading: boolean) => set({ isAuthLoading: loading }),
      setAuth: (token: Auth | null) => {
        console.log('useAuthStore.setAuth called with:', token)

        // Validate token structure if not null
        if (token !== null) {
          if (!token.access_token || typeof token.access_token !== 'string') {
            console.error(
              'Invalid auth token: missing or invalid access_token',
              token
            )
            return
          }
          if (typeof token.expires_in !== 'number' || token.expires_in <= 0) {
            console.warn('Invalid expires_in, using default', token.expires_in)
            token.expires_in = 3600
          }
        }

        set({ auth: token })
        console.log('useAuthStore state after setAuth:', {
          auth: token,
          isLoading: false,
        })
      },
    }),
    { name: 'auth-store' }
  )
)
