import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/_protectedRoute/games/$gameId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
