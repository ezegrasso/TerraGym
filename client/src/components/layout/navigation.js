import { CreditCard, IdCard, LayoutDashboard, Receipt, Tags, UserCog, Users, Dumbbell, ClipboardList, ClipboardCheck } from 'lucide-react'

export const NAV_BY_ROLE = {
    ADMIN: [
        { label: 'Inicio', to: '/admin', icon: LayoutDashboard },
        { label: 'Socios', to: '/admin/socios', icon: Users },
        { label: 'Profesores', to: '/admin/profesores', icon: UserCog },
        { label: 'Membresías', to: '/admin/membresias', icon: CreditCard },
        { label: 'Pagos', to: '/admin/pagos', icon: Receipt },
        { label: 'Planes', to: '/admin/planes', icon: Tags },
        { label: 'Ejercicios', to: '/ejercicios', icon: Dumbbell },
        { label: 'Plantillas', to: '/plantillas', icon: ClipboardList },
        { label: 'Socios y rutinas', to: '/socios-rutinas', icon: ClipboardCheck },
    ],
    PROFESOR: [{ label: 'Inicio', to: '/profesor', icon: LayoutDashboard }, { label: 'Ejercicios', to: '/ejercicios', icon: Dumbbell, label: 'Plantillas', to: '/plantillas', icon: ClipboardList }, { label: 'Socios y rutinas', to: '/socios-rutinas', icon: ClipboardCheck }],

    USUARIO: [
        { label: 'Inicio', to: '/socio', icon: LayoutDashboard },
        { label: 'Mi membresía', to: '/socio/membresia', icon: IdCard },
        { label: 'Mi rutina', to: '/socio/rutina', icon: Dumbbell },
    ],
}