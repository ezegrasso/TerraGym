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
import MembershipsPage from '@/pages/admin/MembershipsPage'
import PlansPage from '@/pages/admin/PlansPage'
import PaymentsPage from '@/pages/admin/PaymentsPage'
import MyMembershipPage from '@/pages/member/MyMembershipPage'
import ExercisesPage from '@/pages/ExercisesPage'
import TemplateEditorPage from '@/pages/TemplateEditorPage'
import TemplatesPage from '@/pages/TemplatesPage'
import MemberPlansPage from '@/pages/MemberPlansPage'
import PlanEditorPage from '@/pages/PlanEditorPage'
import MyPlanPage from '@/pages/member/MyPlanPage'



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
                        <Route path="/admin/membresias" element={<MembershipsPage />} />
                        <Route path="/admin/planes" element={<PlansPage />} />
                        <Route path="/admin/pagos" element={<PaymentsPage />} />

                    </Route>
                    <Route element={<RoleRoute roles={[ROLES.PROFESOR]} />}>
                        <Route path="/profesor" element={<HomePage />} />
                    </Route>
                    <Route element={<RoleRoute roles={[ROLES.USUARIO]} />}>
                        <Route path="/socio" element={<HomePage />} />
                        <Route path="/socio/membresia" element={<MyMembershipPage />} />
                        <Route path="/socio/rutina" element={<MyPlanPage />} />
                    </Route>
                    <Route element={<RoleRoute roles={[ROLES.ADMIN, ROLES.PROFESOR]} />}>
                        <Route path="/ejercicios" element={<ExercisesPage />} />
                        <Route path="/plantillas" element={<TemplatesPage />} />
                        <Route path="/plantillas/nueva" element={<TemplateEditorPage />} />
                        <Route path="/plantillas/:id" element={<TemplateEditorPage />} />
                        <Route path="/socios-rutinas" element={<MemberPlansPage />} />
                        <Route path="/socios-rutinas/rutina/:id" element={<PlanEditorPage />} />
                        <Route path="/socios-rutinas/:memberId/nueva" element={<PlanEditorPage />} />
                        <Route path="/socios-rutinas/:memberId/rutina/:id" element={<PlanEditorPage />} />
                    </Route>
                </Route>

            </Route>

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}