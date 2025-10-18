import { fetchData } from '@/utils/fetchData'
import type { AddGameRequest } from './types'

export const addGame = async (reqBody: AddGameRequest, token: string) => {
  const res = await fetchData('/games/', {
    method: 'POST',
    body: JSON.stringify(reqBody),
    token,
  })

  return res
}
