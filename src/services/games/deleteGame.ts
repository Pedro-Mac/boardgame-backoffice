import { fetchData } from '@/utils/fetchData'

export const deleteGame = async (gameId: string, token: string) => {
  return await fetchData(`/games/${gameId}`, {
    method: 'DELETE',
    token,
  })
}
