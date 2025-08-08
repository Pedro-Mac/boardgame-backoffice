import { PageHeader } from '@/components/ui/page-header'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/_protectedRoute/users')({
  component: RouteComponent,
  loader: async () => {
    return null
  },
})

function RouteComponent() {
  return (
    <div>
      <PageHeader title="Users" />
    </div>
  )
}
