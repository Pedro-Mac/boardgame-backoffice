import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/admin/_protectedRoute/games/$gameId/delete',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/_protectedRoute/games/gameId/delete"!</div>
}
