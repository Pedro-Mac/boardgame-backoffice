import { fetchData } from '@/utils/fetchData'

export interface AuthUser {
  id: string
  name: string
  createdAt: string
}

export const getAuthUser = async (token: string) => {
  try {
    const response: AuthUser = await fetchData('/auth/me', {
      method: 'GET',
      token,
    })

    return response as AuthUser | null
  } catch (error) {
    console.error('Error fetching auth user:', error)
    return null
  }
}
