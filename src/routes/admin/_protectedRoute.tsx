import { AppSidebar } from '@/components/AppSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { refreshToken } from '@/services/auth/refreshToken'
import { useAuthStore } from '@/store/auth'

import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/_protectedRoute')({
  component: ProtectedRoute,
  beforeLoad: async () => {
    const { setAuth, auth } = useAuthStore.getState()

    if (!auth) {
      const token = await refreshToken()

      if (!token) {
        throw redirect({ to: '/auth/login' })
      }
      setAuth(token)
    }
  },
  pendingComponent: () => <div>dasdhasidioasndoasndaios...</div>,
})

function ProtectedRoute() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full p-8">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  )
}
