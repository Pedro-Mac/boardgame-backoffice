export const fetchData = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  let baseUrl: string = 'https://api.tabletopburrow.com'
  if (url.includes('https')) {
    baseUrl = url
  } else {
    baseUrl += url.startsWith('/') ? url : `/${url}`
  }

  try {
    const response = await fetch(baseUrl, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: T = await response.json()

    return data
  } catch (error) {
    console.error('Fetch error details:', {
      url: baseUrl,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    })
    throw error
  }
}
