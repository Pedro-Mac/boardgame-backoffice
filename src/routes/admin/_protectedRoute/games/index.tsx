import { DataTable } from '@/components/DataTable'
import { PageHeader } from '@/components/ui/page-header'
import { getGames } from '@/services/games/getGames'
import type { Game, GameListResponse } from '@/services/games/types'
import { createFileRoute, Outlet } from '@tanstack/react-router'
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
    // {
    //   id: 'actions',
    //   cell: () => (
    //     <DataTableDropdown
    //       items={[
    //         { link: './edit/$gameId', title: 'Edit' },
    //         { link: './delete/$gameId', title: 'Delete', params: {} },
    //       ]}
    //     />
    //   ),
    // },
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
      <PageHeader title="Games" />
      <DataTable columns={columns} data={games} actions={tableActions} />
      <Outlet />
    </div>
  )
}
