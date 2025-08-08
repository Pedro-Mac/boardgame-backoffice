import { DataTable } from '@/components/DataTable'
import { PageHeader } from '@/components/ui/page-header'
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
  pendingComponent: () => <div>Loading protected route...</div>,
  pendingMs: 0,
})

function RouteComponent() {
  const { games }: GameListResponse = Route.useLoaderData()

  const columns: ColumnDef<Game>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'title',
      header: 'Title',
    },
    {
      accessorKey: 'description',
      header: 'Description',
    },
    {
      accessorKey: 'min_players',
      header: 'Min Players',
    },
    { accessorKey: 'max_players', header: 'Max Players' },
    { accessorKey: 'price', header: 'Price' },
  ]

  return (
    <div>
      <PageHeader title="Games" />
      <DataTable columns={columns} data={games} />
    </div>
  )
}
