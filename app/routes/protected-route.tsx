import { Outlet } from 'react-router';
import AppSidebar from '~/components/base/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar';

export default function ProtectedRoute() {
  return (
    <div>
      <p>ProtectedRoute</p>
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  );
}
