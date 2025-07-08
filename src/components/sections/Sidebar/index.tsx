import {
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  Sidebar as SidebarUi,
} from '@/components/ui/sidebar';
import { useSidebar } from './useSidebar';
import { Link } from 'react-router';

const Sidebar = () => {
  const { sidebarItems } = useSidebar();

  return (
    <SidebarUi>
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {sidebarItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link to={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </SidebarUi>
  );
};

export default Sidebar;
