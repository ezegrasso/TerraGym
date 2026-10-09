import { CreditCard, IdCard, LayoutDashboard, Receipt, Tags, UserCog, Users } from 'lucide-react'

export const NAV_BY_ROLE = {
    ADMIN: [
        { label: 'Inicio', to: '/admin', icon: LayoutDashboard },
        { label: 'Socios', to: '/admin/socios', icon: Users },
        { label: 'Profesores', to: '/admin/profesores', icon: UserCog },
        { label: 'Membresías', to: '/admin/membresias', icon: CreditCard },
        { label: 'Pagos', to: '/admin/pagos', icon: Receipt },
        { label: 'Planes', to: '/admin/planes', icon: Tags },
    ],
    PROFESOR: [{ label: 'Inicio', to: '/profesor', icon: LayoutDashboard }],
    USUARIO: [
        { label: 'Inicio', to: '/socio', icon: LayoutDashboard },
        { label: 'Mi membresía', to: '/socio/membresia', icon: IdCard },
    ],
}