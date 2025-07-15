import Games from '@/components/pages/Games';
import Home from '@/components/pages/Home';
import Login from '@/components/pages/Login';
import NotFound from '@/components/pages/NotFound';
import ProtectedRoute from '@/components/routes/ProtectedRoute';
import { Users } from 'lucide-react';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
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
    Component: NotFound,
  },
]);
