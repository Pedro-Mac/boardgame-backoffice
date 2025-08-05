import { fetchData } from '@/utils/fetchData'
import type { Game, GameListResponse } from './types'

export const getGames = async (): Promise<GameListResponse> => {
  const res: { games: Game[] } = await fetchData('/games/', { method: 'GET' })
  console.log({ res })
  return res
}
