import { createFileRoute, useNavigate } from '@tanstack/react-router'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import GameForm from '@/components/forms/GameForm'

export const Route = createFileRoute('/admin/_protectedRoute/games/add')({
  component: RouteComponent,
})

function RouteComponent() {
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
        <DialogHeader>
          <DialogTitle>Add game</DialogTitle>
        </DialogHeader>
        <GameForm submissionType="create" />
      </DialogContent>
    </Dialog>
  )
}
