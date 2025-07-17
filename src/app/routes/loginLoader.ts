import { fetchData } from '@/api/api';
import type { RootState } from '@/redux/store';
import { redirect } from 'react-router';

export const loginLoader = async (state: RootState) => {
  // You can add any loader logic here if needed

  try {
    if (state.auth.isAuthenticated) {
      return null; // Already authenticated
    }

    const res: { access_token: string } = await fetchData(
      `/auth/refresh-token`,
      {
        method: 'POST',
        credentials: 'include',
      }
    );

    if (!res || !res.access_token) {
      return redirect('/login');
    }

    return res;
  } catch (error) {
    console.error('Error during login loader:', error);
    return false;
  }
};
