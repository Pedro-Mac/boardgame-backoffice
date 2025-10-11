import { fetchData } from '@/utils/fetchData'

export const refreshToken = async (): Promise<string | null> => {
  try {
    const token: string = await fetchData('/auth/refresh-token', {
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
