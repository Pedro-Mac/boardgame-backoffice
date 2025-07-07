import { useAppDispatch } from '../../../redux/hooks';
import { handleLogin } from '@/redux/auth/slice';
import { useState } from 'react';

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const [isPending, setIsPending] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const formAction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setIsPending(true);
    try {
      const resultAction = await dispatch(handleLogin(formData));
      if (handleLogin.fulfilled.match(resultAction)) {
        setIsLoggedIn(true);
      } else {
        console.error('Login failed:', resultAction.payload);
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsPending(false);
    }
  };

  return {
    isLoggedIn,
    formAction,
    isPending,
  };
};
