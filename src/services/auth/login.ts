import type { User } from '@/types/user';
import { fetchData } from '@/utils/fetchData';

export const loginUser = async (
  email: string,
  password: string
): Promise<User> => {
  return fetchData('/auth/backoffice/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  });
};
