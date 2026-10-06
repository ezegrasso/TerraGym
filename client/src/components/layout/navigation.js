import { LayoutDashboard, Users, UserCog } from 'lucide-react'

export const NAV_BY_ROLE = {
    ADMIN: [
        { label: 'Inicio', to: '/admin', icon: LayoutDashboard },
        { label: 'Socios', to: '/admin/socios', icon: Users },
        { label: 'Profesores', to: '/admin/profesores', icon: UserCog },
    ],
    PROFESOR: [{ label: 'Inicio', to: '/profesor', icon: LayoutDashboard }, { label: 'Profesores', to: '/admin/profesores', icon: UserCog }],
    USUARIO: [{ label: 'Inicio', to: '/socio', icon: LayoutDashboard }],
}