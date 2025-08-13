import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/admin/_protectedRoute/games/$gameId/edit'
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>bbb</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
