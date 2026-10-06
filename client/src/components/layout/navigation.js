import { LayoutDashboard, Users } from 'lucide-react'

export const NAV_BY_ROLE = {
    ADMIN: [
        { label: 'Inicio', to: '/admin', icon: LayoutDashboard },
        { label: 'Socios', to: '/admin/socios', icon: Users },
    ],
    PROFESOR: [{ label: 'Inicio', to: '/profesor', icon: LayoutDashboard }],
    USUARIO: [{ label: 'Inicio', to: '/socio', icon: LayoutDashboard }],
}