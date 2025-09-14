import { DataTable } from '@/components/DataTable'
import Pagination from '@/components/pagination'
import { PageHeader } from '@/components/ui/page-header'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'

import { getGames } from '@/services/games/getGames'
import type { Game, GameListResponse } from '@/services/games/types'
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'

export const Route = createFileRoute('/admin/_protectedRoute/games/')({
  component: RouteComponent,
  validateSearch, // declared below
  loaderDeps: ({ search: { offset, limit } }) => ({ offset, limit }),

  loader, // declared below
  pendingComponent: () => <div>Loading protected route...</div>,
  pendingMs: 0,
})

function validateSearch(search: Record<string, unknown>) {
  return {
    limit: Number(search.limit) || 10,
    offset: Number(search.offset) || 0,
  }
}

async function loader({
  deps: { offset, limit },
}: {
  deps: { offset: number; limit: number }
}): Promise<GameListResponse & { limit: number; offset: number }> {
  if (!limit) limit = 10
  if (!offset) offset = 0
  const res: GameListResponse = await getGames(limit, offset)

  return { ...res, limit, offset }
}

function RouteComponent() {
  const {
    games,
    total,
    limit,
    offset,
  }: GameListResponse & { limit: number; offset: number } =
    Route.useLoaderData()

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

      <Pagination limit={limit} offset={offset} />
      <Select value={typeof limit === 'number' ? limit.toString() : '10'}>
        <SelectTrigger className="w-[72px]">
          <SelectValue placeholder={limit} />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup className="w-[72px]">
            <Link from="." to="." search={{ limit: 10, offset }}>
              <SelectItem value="10" className="w-[72px]">
                10
              </SelectItem>
            </Link>
            <Link from="." to="." search={{ limit: 25, offset }}>
              <SelectItem value="25" className="w-[72px]">
                25
              </SelectItem>
            </Link>
            <Link from="." to="." search={{ limit: 50, offset }}>
              <SelectItem value="50" className="w-[72px]">
                50
              </SelectItem>
            </Link>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Outlet />
    </div>
  )
}
