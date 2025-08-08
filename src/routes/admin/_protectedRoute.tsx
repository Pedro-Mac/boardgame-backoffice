import { AppSidebar } from '@/components/AppSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { refreshToken } from '@/services/auth/refreshToken'
import { useAuthStore } from '@/store/auth'

import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/_protectedRoute')({
  component: ProtectedRoute,
  beforeLoad: async () => {
    const { setUser, user } = useAuthStore.getState()

    if (!user) {
      const data = await refreshToken()

      if (!data) {
        throw redirect({ to: '/auth/login' })
      }
      setUser({
        id: 'id',
        email: 'email',
        name: 'name',
      })
    }
  },
})

function ProtectedRoute() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  )
}
