import { createFileRoute, useNavigate } from '@tanstack/react-router'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { deleteGame } from '@/services/games/deleteGame'
import { useState } from 'react'

export const Route = createFileRoute(
  '/admin/_protectedRoute/games/$gameId/delete'
)({
  component: RouteComponent,
})

function RouteComponent() {
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)
  const params = Route.useParams()
  const navigate = useNavigate()

  const handleDeleteGame = async () => {
    try {
      setIsDeleteLoading(true)
      await deleteGame(params.id)
      navigate({ to: '/admin/games' })
    } finally {
      setIsDeleteLoading(false)
    }
  }

  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete {params.gameId} </DialogTitle>
        </DialogHeader>

        <Button onClick={handleDeleteGame} disabled={isDeleteLoading}>
          Delete
        </Button>
      </DialogContent>
    </Dialog>
  )
}
