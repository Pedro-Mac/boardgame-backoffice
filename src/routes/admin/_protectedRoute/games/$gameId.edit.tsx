import GameForm from '@/components/forms/GameForm'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { getGame } from '@/services/games/getGame'
import type { Game } from '@/services/games/types'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/admin/_protectedRoute/games/$gameId/edit'
)({
  component: RouteComponent,
  loader,
  pendingComponent: () => (
    <Dialog defaultOpen>
      <DialogContent>
        <div>My first div while loading</div>
      </DialogContent>
    </Dialog>
  ),
})

async function loader({
  params: { gameId },
}: {
  params: { gameId: string }
}): Promise<Game> {
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
  const navigate = useNavigate()
  return (
    <Dialog
      defaultOpen
      onOpenChange={(open: boolean) => {
        if (!open) {
          navigate({
            to: '/admin/games/',
            search: { limit: 10, offset: 0 },
          })
        }
      }}
    >
      <DialogContent>
        <DialogDescription>Edit game details</DialogDescription>
        <DialogHeader>
          <DialogTitle>Edit</DialogTitle>
        </DialogHeader>

        <GameForm
          title={title}
          description={description}
          min_players={min_players}
          max_players={max_players}
          price={price}
          duration={Number(duration.replace(' minutes', ''))}
          is_available={is_available ? 'available' : 'not_available'}
          submissionType="edit"
        />
      </DialogContent>
    </Dialog>
  )
}
