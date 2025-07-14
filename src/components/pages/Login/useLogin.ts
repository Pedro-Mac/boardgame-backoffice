import { useAppDispatch } from '../../../redux/hooks';
import { handleLogin } from '@/redux/auth/slice';
import type { RootState } from '@/redux/store';
import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

export const useLogin = () => {
  const { isAuthenticated, isLoading } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  const formAction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const resultAction = await dispatch(handleLogin(formData));
      if (handleLogin.fulfilled.match(resultAction)) {
        navigate('/home');
      } else {
        console.error('Login failed:', resultAction.payload);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return {
    isAuthenticated,
    formAction,
    isLoading,
  };
};
