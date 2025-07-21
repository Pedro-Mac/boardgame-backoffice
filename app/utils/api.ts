export const getUrl = (endpoint: string) => {
  let baseUrl = import.meta.env.VITE_API_URL;
  if (!baseUrl) {
    throw new Error('VITE_API_URL is not defined in the environment variables');
  }

  if (!baseUrl.endsWith('/')) {
    baseUrl += '/';
  }

  if (endpoint.startsWith('/')) {
    return baseUrl + endpoint.slice(1);
  }

  return baseUrl + endpoint;
};

export const fetchData = async (
  endpoint: string,
  options: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }
) => {
  const url = getUrl(endpoint);
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
