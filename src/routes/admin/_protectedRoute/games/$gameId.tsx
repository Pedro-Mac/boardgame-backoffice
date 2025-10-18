import { getGame } from '@/services/games/getGame'
import type { Game } from '@/services/games/types'
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/_protectedRoute/games/$gameId')({
  component: RouteComponent,
  loader,
})

async function loader({
  params: { gameId },
}: {
  params: { gameId: string }
}): Promise<Game> {
  console.log('Loading game with ID:', gameId)
  return getGame(gameId ? Number(gameId) : 0)
}

function RouteComponent() {
  const {
    title,
    description,
    min_players,
    max_players,
    price,
    duration,
    is_available,
  } = Route.useLoaderData() as Awaited<ReturnType<typeof loader>>
  return (
    <div>
      <div>
        <Link to={`./edit`}>Edit</Link>
      </div>
      <p>Title: {title}</p>
      <p>Description: {description}</p>
      <p>Min Players: {min_players}</p>
      <p>Max Players: {max_players}</p>
      <p>Price: {price}</p>
      <p>Duration: {duration}</p>
      <p>Available: {is_available ? 'Yes' : 'No'}</p>

      <Outlet />
    </div>
  )
}
