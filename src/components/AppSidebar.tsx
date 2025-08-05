import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Button } from './ui/button'
import { logoutUser } from '@/services/auth/logout'
import { useNavigate, Link } from '@tanstack/react-router'
import { useAuthStore } from '@/store/auth'

const sidebarItems = [
  {
    title: 'Games',
    url: '/admin/games',
  },
  {
    title: 'Users',
    url: '/admin/users',
  },
  {
    title: 'Roles',
    url: '/admin/roles',
  },
  {
    title: 'Permissions',
    url: '/admin/permissions',
  },
  {
    title: 'Settings',
    url: '/admin/settings',
  },
]

export function AppSidebar() {
  const navigate = useNavigate()
  const { setUser } = useAuthStore((state) => state)

  const handleLogout = async () => {
    // Implement logout logic here, e.g., clear auth tokens, redirect to login page, etc.
    console.log('Logout clicked')
    try {
      await logoutUser()
      setUser(null) // Clear user state
      navigate({ to: '/' })
    } catch (error) {
      console.error('Logout failed', error)
    }
  }
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>{item.title}</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleLogout()
          }}
        >
          <Button
            variant="destructive"
            className="w-full cursor-pointer"
            type="submit"
          >
            Logout
          </Button>
        </form>
      </SidebarFooter>
    </Sidebar>
  )
}
