import type { Auth } from '@/store/auth'
import { fetchData } from '@/utils/fetchData'

export const refreshToken = async (): Promise<Auth | null> => {
  try {
    const response = (await fetchData('/auth/refresh-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })) as Record<string, unknown>

    if (!response || typeof response !== 'object') {
      console.error('Invalid refresh token response: not an object')
      return null
    }

    if (!response.access_token || typeof response.access_token !== 'string') {
      console.error(
        'Invalid refresh token response: missing or invalid access_token'
      )
      return null
    }

    // Ensure all required fields are present
    const token: Auth = {
      access_token: response.access_token as string,
      expires_in: (response.expires_in as number) || 3600,
      refresh_token_expires_in:
        (response.refresh_token_expires_in as number) || 86400,
      token_type: (response.token_type as string) || 'Bearer',
    }

    return token
  } catch (error) {
    console.error('Refresh token error:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    })
    return null
  }
}
