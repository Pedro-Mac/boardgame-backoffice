// import type { RootState } from '@/redux/store';
// import { useSelector } from 'react-redux';
import { Outlet } from 'react-router';
import Sidebar from '../sections/Sidebar';
import { SidebarContent, SidebarProvider } from '../ui/sidebar';
import { useProtectedRoute } from './useProtectedRoute';

const ProtectedRoute = () => {
  const { getTitle } = useProtectedRoute();

  return (
    <SidebarProvider>
      <Sidebar />
      <div className='px-12 py-8 w-full min-h-screen'>
        <h2 className='scroll-m-20  pb-2 text-3xl font-semibold tracking-tight text-left first:mt-0'>
          {getTitle()}
        </h2>
        <main>
          <SidebarContent>
            <Outlet />
          </SidebarContent>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ProtectedRoute;
