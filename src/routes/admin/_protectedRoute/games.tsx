import { DataTable } from '@/components/DataTable'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { PageHeader } from '@/components/ui/page-header'
import { getGames } from '@/services/games/getGames'
import type { Game, GameListResponse } from '@/services/games/types'
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from '@radix-ui/react-dropdown-menu'
import { createFileRoute, Link } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'

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
    {
      id: 'actions',
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 cursor-pointer hover:bg-gray-100 focus-visible:shadow-none focus-visible:outline-none focus-visible: border-none"
            >
              {/* <span className="sr-only">Open menu</span> */}
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-white shadow-md p-2 rounded"
          >
            <DropdownMenuItem className="px-2 py-1 focus:outline-none hover:bg-gray-50 rounded mb-1 cursor-pointer">
              <Link to="./edit">Edit</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="px-2 py-1 focus:outline-none hover:bg-gray-50 rounded">
              <Link to="./delete">Delete</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  return (
    <div>
      <PageHeader title="Games" />
      <DataTable columns={columns} data={games} />
    </div>
  )
}
