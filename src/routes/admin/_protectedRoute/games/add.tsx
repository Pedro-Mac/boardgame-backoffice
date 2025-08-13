import { createFileRoute } from '@tanstack/react-router'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import AddGameForm from '@/components/forms/AddGameForm'

export const Route = createFileRoute('/admin/_protectedRoute/games/add')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add game</DialogTitle>
        </DialogHeader>
        <AddGameForm />
      </DialogContent>
    </Dialog>
  )
}
