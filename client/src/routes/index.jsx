import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'
import ChangePasswordPage from '@/pages/ChangePasswordPage'
import LoginPage from '@/pages/LoginPage'
import HomePage from '@/pages/HomePage'
import NotFoundPage from '@/pages/NotFoundPage'
import { useAuth } from '@/hooks/useAuth'
import { HOME_BY_ROLE, ROLES } from '@/utils/roles'
import ProtectedRoute from './ProtectedRoute'
import RoleRoute from './RoleRoute'
import MembersPage from '@/pages/admin/MembersPage'
import TrainersPage from '@/pages/admin/TrainersPage'

// "/" manda a cada usuario a su inicio, o al login si no hay sesión
function RootRedirect() {
    const { user } = useAuth()
    return <Navigate to={user ? HOME_BY_ROLE[user.role] : '/login'} replace />
}

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route element={<ProtectedRoute />}>
                <Route path="/cambiar-password" element={<ChangePasswordPage />} />

                <Route element={<AppLayout />}>
                    <Route path="/" element={<RootRedirect />} />

                    <Route element={<RoleRoute roles={[ROLES.ADMIN]} />}>
                        <Route path="/admin" element={<HomePage />} />
                        <Route path="/admin/socios" element={<MembersPage />} />
                        <Route path="/admin/profesores" element={<TrainersPage />} />
                    </Route>
                    <Route element={<RoleRoute roles={[ROLES.PROFESOR]} />}>
                        <Route path="/profesor" element={<HomePage />} />
                    </Route>
                    <Route element={<RoleRoute roles={[ROLES.USUARIO]} />}>
                        <Route path="/socio" element={<HomePage />} />
                    </Route>
                </Route>
            </Route>

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}