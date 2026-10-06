import { Outlet } from 'react-router-dom'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import AppSidebar from './AppSidebar'

export default function AppLayout() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                {/* Barra superior: en mobile muestra el botón que abre el sidebar */}
                <header className="flex h-14 items-center gap-2 border-b px-4">
                    <SidebarTrigger aria-label="Abrir o cerrar menú" />
                </header>
                <main className="flex-1 p-4 md:p-6">
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}