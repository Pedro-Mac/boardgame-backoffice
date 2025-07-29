import { fetchData } from '@/utils/fetchData'

export const refreshToken = async (): Promise<{
  access_token: string
} | null> => {
  try {
    const token: { access_token: string } = await fetchData(
      '/auth/refresh-token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }
    )

    console.log('Token refreshed:', token)
    return token
  } catch (error) {
    console.error('Error refreshing token:', error)
    return null
  }
}
