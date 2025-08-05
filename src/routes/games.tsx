import { getGames } from '@/services/games/getGames'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/games')({
  component: RouteComponent,
  loader: async () => {
    const res = await getGames()

    console.log(res)
    return res
  },
})

function RouteComponent() {
  return <div>Hello "/games"!</div>
}
