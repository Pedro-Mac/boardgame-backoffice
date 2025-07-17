import { fetchData } from '@/api/api';
import type { RootState } from '@/redux/store';
import { redirect } from 'react-router';

export const protectedRouteLoader = async (state: RootState) => {
  try {
    if (state.auth.isAuthenticated) {
      return null; // Already authenticated, proceed
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

    return null;
  } catch {
    return redirect('/login');
  }
};
