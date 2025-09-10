import { fetchData } from '@/utils/fetchData'
import type { Game, GameListResponse } from './types'

export const getGames = async (
  limit?: number,
  offset?: number
): Promise<GameListResponse> => {
  const res: { games: Game[] } = await fetchData(
    `/games/?limit=${limit && limit > 0 ? limit : 10}&offset=${offset && offset > 0 ? offset : 0}`,
    { method: 'GET' }
  )
  console.log({ res })
  return res
}
