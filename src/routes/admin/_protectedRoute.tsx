import { AppSidebar } from '@/components/AppSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { refreshToken } from '@/services/auth/refreshToken'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/_protectedRoute')({
  component: ProtectedRoute,
  loader: async () => {
    const token = await refreshToken()

    if (!token) {
      throw redirect({ to: '/auth/login' })
    }

    return null
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
