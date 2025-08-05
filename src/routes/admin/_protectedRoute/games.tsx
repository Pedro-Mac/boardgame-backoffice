import { DataTable } from '@/components/DataTable'
import { getGames } from '@/services/games/getGames'
import type { Game, GameListResponse } from '@/services/games/types'
import { createFileRoute } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'

export const Route = createFileRoute('/admin/_protectedRoute/games')({
  component: RouteComponent,
  loader: async (): Promise<GameListResponse> => {
    const res: GameListResponse = await getGames()

    return res
  },
})

function RouteComponent() {
  const { games }: GameListResponse = Route.useLoaderData()

  const columns: ColumnDef<Game>[] = [
    {
      accessorKey: 'title',
      header: 'Title',
    },
    {
      accessorKey: 'description',
      header: 'Description',
    },
  ]

  return (
    <div>
      <h2 className="mb-2">Games</h2>
      <DataTable columns={columns} data={games} />
    </div>
  )
}
