import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/_protectedRoute/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/_protectedRoute/settings"!</div>
}
