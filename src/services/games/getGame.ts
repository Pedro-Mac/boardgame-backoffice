import { fetchData } from '@/utils/fetchData'
import type { Game } from './types'

export const getGame = async (gameId: number): Promise<Game> => {
  if (!gameId || gameId <= 0) throw new Error('Invalid game ID')
  return fetchData(`/games/${gameId}`, { method: 'GET' })
}
