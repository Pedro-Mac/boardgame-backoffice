import { createFileRoute } from '@tanstack/react-router'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export const Route = createFileRoute('/admin/_protectedRoute/games/add')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add game</DialogTitle>
          <DialogDescription>Add game</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
