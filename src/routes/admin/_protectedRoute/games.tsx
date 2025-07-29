import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/_protectedRoute/games')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/games"!</div>
}
