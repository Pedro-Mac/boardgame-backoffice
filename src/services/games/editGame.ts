import { fetchData } from '@/utils/fetchData'
import type { EditGameRequest } from './types'

export const editGame = async (
  gameId: number,
  reqBody: Partial<EditGameRequest>,
  token: string
) => {
  const res = await fetchData(`/games/${gameId}`, {
    method: 'PATCH',
    body: JSON.stringify(reqBody),
    token,
  })

  return res
}
