import type { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';
import Sidebar from '../sections/Sidebar';
import { SidebarProvider } from '../ui/sidebar';
import { useProtectedRoute } from './useProtectedRoute';

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useSelector(
    (state: RootState) => state.auth
  );

  const { getTitle } = useProtectedRoute();

  if (isLoading) {
    return <div>Loading...</div>; // You can replace this with a spinner or loading component
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  return (
    <SidebarProvider>
      <Sidebar />
      <div className='px-12 py-8 w-full min-h-screen'>
        <h2 className='scroll-m-20  pb-2 text-3xl font-semibold tracking-tight text-left first:mt-0'>
          {getTitle()}
        </h2>
        <main>
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ProtectedRoute;
