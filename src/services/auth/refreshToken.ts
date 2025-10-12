import type { Auth } from '@/store/auth'
import { fetchData } from '@/utils/fetchData'

export const refreshToken = async (): Promise<Auth | null> => {
  try {
    const token: Auth = await fetchData('/auth/refresh-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    return token
  } catch (error) {
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    })
    return null
  }
}
