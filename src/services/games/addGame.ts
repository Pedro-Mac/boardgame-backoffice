import { fetchData } from '@/utils/fetchData'
import type { AddGameRequest } from './types'

export const addGame = async (reqBody: AddGameRequest) => {
  const res = await fetchData('/games/', {
    method: 'POST',
    body: JSON.stringify(reqBody),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return res
}
