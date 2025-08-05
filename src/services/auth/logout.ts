import type { User } from '@/types/user'
import { fetchData } from '@/utils/fetchData'

export const logoutUser = async (): Promise<User> => {
  return fetchData('/auth/backoffice/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
}
