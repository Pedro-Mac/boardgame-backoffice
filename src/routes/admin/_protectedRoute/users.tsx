import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/_protectedRoute/users')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/users"!</div>
}
