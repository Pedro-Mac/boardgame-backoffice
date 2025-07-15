import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Login from '../components/pages/Login';
import ProtectedRoute from '@/components/routes/ProtectedRoute';
import { useEffect } from 'react';
import { checkAuthStatus } from '@/redux/auth/slice';
import { useAppDispatch } from '@/redux/hooks';
import Home from '@/components/pages/Home';
import Games from '@/components/pages/Games';
import Users from '@/components/pages/Users';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: '/',
      Component: Login,
    },
    {
      path: '/login',
      Component: Login,
    },
    {
      Component: ProtectedRoute,
      children: [
        {
          path: '/home',
          Component: Home,
        },
        {
          path: '/games',
          Component: Games,
        },
        {
          path: '/users',
          Component: Users,
        },
      ],
    },
    {
      path: '*',
      element: <div>404 Not Found</div>,
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
