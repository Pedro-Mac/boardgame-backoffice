import { DataTable } from '@/components/DataTable'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/ui/page-header'
import { getGames } from '@/services/games/getGames'
import type { Game, GameListResponse } from '@/services/games/types'
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'

export const Route = createFileRoute('/admin/_protectedRoute/games/')({
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

  const tableActions = [
    {
      link: './$gameId/edit',
      title: 'Edit',
      param: 'gameId',
    },
    {
      link: './$gameId/delete',
      title: 'Delete',
      param: 'gameId',
    },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <PageHeader title="Games" />
        <Link
          to="./add"
          className="cursor-pointer text-white bg-emerald-900 rounded px-3 py-2 hover:bg-emerald-700 h-8 flex items-center justify-center"
        >
          Add game
        </Link>
      </div>
      <DataTable columns={columns} data={games} actions={tableActions} />
      <Outlet />
    </div>
  )
}
