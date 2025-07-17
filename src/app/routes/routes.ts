import Games from '@/components/pages/Games';
import Home from '@/components/pages/Home';
import Login from '@/components/pages/Login';
import NotFound from '@/components/pages/NotFound';
import ProtectedRoute from '@/components/routes/ProtectedRoute';
import { Users } from 'lucide-react';
import { createBrowserRouter } from 'react-router';
import { loginLoader } from './loginLoader';
import { store } from '@/redux/store';
import { protectedRouteLoader } from './protectedRouteLoader';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Login,
  },
  {
    path: '/login',
    Component: Login,
    loader: () => loginLoader(store.getState()),
  },
  {
    Component: ProtectedRoute,
    loader: () => protectedRouteLoader(store.getState()),
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
    Component: NotFound,
  },
]);
