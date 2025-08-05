import { getGames } from '@/services/games/getGames'
import type { GameListResponse } from '@/services/games/types'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/_protectedRoute/games')({
  component: RouteComponent,
  loader: async (): Promise<GameListResponse> => {
    const res: GameListResponse = await getGames()

    return res
  },
})

function RouteComponent() {
  const { games }: GameListResponse = Route.useLoaderData()

  console.log('Games:', games)

  return (
    <div>
      <h2 className="mb-2">Games</h2>

      <ul>
        {games.map((game) => (
          <li key={game.id}>
            {game.title} - {game.description}
          </li>
        ))}
      </ul>
    </div>
  )
}
