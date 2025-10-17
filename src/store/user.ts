import type { AuthUser } from '@/services/auth/getAuthUser'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface UserState {
  authUser: AuthUser | null
  isAuthUserLoading: boolean

  setAuthUserLoading: (loading: boolean) => void
  setUser: (user: AuthUser | null) => void
}

export const useUserStore = create<UserState>()(
  devtools(
    (set) => ({
      authUser: null,
      isAuthUserLoading: false,

      setUserLoading: (loading: boolean) => set({ isAuthUserLoading: loading }),
      setUser: (authUser: AuthUser | null) => {
        console.log('useUserStore.setUser called with:', authUser)
        set({ authUser })
        console.log('useUserStore state after setUser:', {
          authUser,
          isLoading: false,
        })
      },
    }),
    { name: 'user-store' }
  )
)
