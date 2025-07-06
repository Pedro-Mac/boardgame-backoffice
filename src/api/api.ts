const DEFAULT_API_URL = 'https://api.tabletopburrow.com';

export async function fetchData(
  endpoint: string,
  options?: RequestInit,
  apiUrl: string = DEFAULT_API_URL
) {
  const url = `${apiUrl}${endpoint}`;
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Fetch error: ${response.statusText}`);
  }
  return response.json();
}
