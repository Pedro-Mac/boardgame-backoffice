import { fetchData } from '@/utils/fetchData';
import { redirect } from '@tanstack/react-router';

export const refreshToken = async () => {
  const token = await fetchData('/auth/refresh-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  console.log('Token refreshed:', token);

  if (token) {
    throw redirect({ to: '/games' });
  }
};
