import { NavLink, useNavigate } from 'react-router-dom'
import { ChevronsUpDown, Dumbbell, LogOut } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
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
import { useAuth } from '@/hooks/useAuth'
import { ROLE_LABELS } from '@/utils/roles'
import { NAV_BY_ROLE } from './navigation'

export default function AppSidebar() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const items = NAV_BY_ROLE[user.role] ?? []

    async function handleLogout() {
        await logout()
        navigate('/login', { replace: true })
    }

    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex items-center gap-2 px-2 py-1.5">
                    <div className="grid size-8 place-items-center rounded-md bg-primary text-primary-foreground">
                        <Dumbbell className="size-4" aria-hidden="true" />
                    </div>
                    <span className="text-lg font-semibold tracking-tight">TerraGym</span>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.to}>
                                    <NavLink to={item.to} end>
                                        {({ isActive }) => (
                                            <SidebarMenuButton asChild isActive={isActive}>
                                                <span>
                                                    <item.icon aria-hidden="true" />
                                                    {item.label}
                                                </span>
                                            </SidebarMenuButton>
                                        )}
                                    </NavLink>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton size="lg" aria-label="Menú de usuario">
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-medium">
                                            {user.firstName} {user.lastName}
                                        </span>
                                        <span className="truncate text-xs text-muted-foreground">
                                            {ROLE_LABELS[user.role]}
                                        </span>
                                    </div>
                                    <ChevronsUpDown className="size-4" aria-hidden="true" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="top" align="start" className="w-56">
                                <DropdownMenuItem onSelect={handleLogout}>
                                    <LogOut aria-hidden="true" />
                                    Cerrar sesión
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}