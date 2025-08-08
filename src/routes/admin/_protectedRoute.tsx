import { AppSidebar } from '@/components/AppSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { useAuthStore } from '@/store/auth'

import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/_protectedRoute')({
  component: ProtectedRoute,
  beforeLoad: async () => {
    const user = useAuthStore.getState().user
    if (!user) {
      throw redirect({ to: '/auth/login' })
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
