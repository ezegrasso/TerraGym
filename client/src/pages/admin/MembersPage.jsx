import { useCallback, useEffect, useState } from 'react'
import { KeyRound, MoreHorizontal, Pencil, Plus, Power, Users } from 'lucide-react'
import { toast } from 'sonner'
import UserFormSheet from '@/components/forms/UserFormSheet'
import PageHeader from '@/components/layout/PageHeader'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import EmptyState from '@/components/shared/EmptyState'
import Pagination from '@/components/shared/Pagination'
import SearchInput from '@/components/shared/SearchInput'
import StatusBadge from '@/components/shared/StatusBadge'
import TempPasswordDialog from '@/components/shared/TempPasswordDialog'
import DataTable from '@/components/tables/DataTable'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useUserMutations, useUsers } from '@/hooks/useUsers'
import { getErrorMessage } from '@/services/api'

const PAGE_SIZE = 10

function RowActions({ user, onEdit, onToggle, onReset }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Acciones para ${user.firstName} ${user.lastName}`}
                >
                    <MoreHorizontal aria-hidden="true" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => onEdit(user)}>
                    <Pencil aria-hidden="true" /> Editar
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => onReset(user)}>
                    <KeyRound aria-hidden="true" /> Restablecer contraseña
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onSelect={() => onToggle(user)}
                    className={user.isActive ? 'text-destructive focus:text-destructive' : undefined}
                >
                    <Power aria-hidden="true" /> {user.isActive ? 'Desactivar' : 'Activar'}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default function MembersPage() {
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [page, setPage] = useState(1)
    const [sheet, setSheet] = useState({ open: false, user: null })
    const [credentials, setCredentials] = useState(null) // { user, password, reset }
    const [confirm, setConfirm] = useState(null) // { type: 'toggle' | 'reset', user }

    const { setStatus, resetPassword } = useUserMutations()

    const { data, isLoading, isError, refetch } = useUsers({
        role: 'USUARIO',
        search: search || undefined,
        isActive: statusFilter === 'all' ? undefined : statusFilter,
        page,
        limit: PAGE_SIZE,
    })

    const handleSearch = useCallback((value) => {
        setSearch(value)
        setPage(1)
    }, [])

    // Si se desactiva el último elemento de la última página, volver a una página válida
    const totalPages = data?.pagination.totalPages ?? 1
    useEffect(() => {
        if (data && page > totalPages) setPage(Math.max(1, totalPages))
    }, [data, page, totalPages])

    const hasFilters = !!search || statusFilter !== 'all'

    async function handleConfirm() {
        const { type, user } = confirm
        try {
            if (type === 'reset') {
                const { temporaryPassword } = await resetPassword.mutateAsync(user.id)
                setConfirm(null)
                setCredentials({ user, password: temporaryPassword, reset: true })
            } else {
                await setStatus.mutateAsync({ id: user.id, isActive: !user.isActive })
                toast.success(user.isActive ? 'Socio desactivado' : 'Socio activado')
                setConfirm(null)
            }
        } catch (error) {
            toast.error(getErrorMessage(error))
        }
    }

    const columns = [
        {
            header: 'Socio',
            cell: (u) => (
                <div>
                    <p className="font-medium">
                        {u.lastName}, {u.firstName}
                    </p>
                    <p className="text-xs text-muted-foreground">{u.email}</p>
                </div>
            ),
        },
        { header: 'DNI', cell: (u) => u.dni ?? '—' },
        { header: 'Teléfono', cell: (u) => u.phone ?? '—' },
        {
            header: 'Estado',
            cell: (u) => <StatusBadge status={u.isActive ? 'active' : 'inactive'} />,
        },
        {
            header: 'Acciones',
            srOnly: true,
            className: 'w-12 text-right',
            cell: (u) => (
                <RowActions
                    user={u}
                    onEdit={(user) => setSheet({ open: true, user })}
                    onToggle={(user) => setConfirm({ type: 'toggle', user })}
                    onReset={(user) => setConfirm({ type: 'reset', user })}
                />
            ),
        },
    ]

    const renderCard = (u) => (
        <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 space-y-1">
                <p className="font-medium">
                    {u.lastName}, {u.firstName}
                </p>
                <p className="truncate text-xs text-muted-foreground">{u.email}</p>
                <p className="text-xs text-muted-foreground">
                    DNI: {u.dni ?? '—'} · Tel: {u.phone ?? '—'}
                </p>
                <StatusBadge status={u.isActive ? 'active' : 'inactive'} />
            </div>
            <RowActions
                user={u}
                onEdit={(user) => setSheet({ open: true, user })}
                onToggle={(user) => setConfirm({ type: 'toggle', user })}
                onReset={(user) => setConfirm({ type: 'reset', user })}
            />
        </div>
    )

    const isReset = confirm?.type === 'reset'
    const deactivating = confirm?.type === 'toggle' && confirm.user.isActive

    return (
        <>
            <PageHeader
                title="Socios"
                description="Alta, edición y estado de los socios del gimnasio."
                actions={
                    <Button onClick={() => setSheet({ open: true, user: null })}>
                        <Plus aria-hidden="true" /> Nuevo socio
                    </Button>
                }
            />

            <div className="mb-4 flex flex-wrap gap-3">
                <SearchInput
                    value={search}
                    onChange={handleSearch}
                    placeholder="Buscar por nombre, email o DNI"
                    label="Buscar socios"
                    className="w-full sm:max-w-sm"
                />
                <Select
                    value={statusFilter}
                    onValueChange={(v) => {
                        setStatusFilter(v)
                        setPage(1)
                    }}
                >
                    <SelectTrigger className="w-full sm:w-44" aria-label="Filtrar por estado">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="true">Activos</SelectItem>
                        <SelectItem value="false">Inactivos</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <DataTable
                columns={columns}
                rows={data?.items}
                getRowId={(u) => u.id}
                renderCard={renderCard}
                isLoading={isLoading}
                isError={isError}
                onRetry={refetch}
                empty={
                    <EmptyState
                        icon={Users}
                        title={hasFilters ? 'No se encontraron socios' : 'Todavía no hay socios'}
                        description={
                            hasFilters
                                ? 'Probá con otra búsqueda o cambiá el filtro.'
                                : 'Creá el primer socio para empezar.'
                        }
                        action={
                            !hasFilters && (
                                <Button onClick={() => setSheet({ open: true, user: null })}>
                                    <Plus aria-hidden="true" /> Nuevo socio
                                </Button>
                            )
                        }
                    />
                }
            />

            <Pagination
                page={page}
                totalPages={totalPages}
                total={data?.pagination.total ?? 0}
                onPageChange={setPage}
            />

            <UserFormSheet
                open={sheet.open}
                onOpenChange={(open) => setSheet((s) => ({ ...s, open }))}
                role="USUARIO"
                roleLabel="socio"
                user={sheet.user}
                onCreated={({ user, temporaryPassword }) =>
                    setCredentials({ user, password: temporaryPassword, reset: false })
                }
            />

            <TempPasswordDialog credentials={credentials} onClose={() => setCredentials(null)} />

            <ConfirmDialog
                open={!!confirm}
                onOpenChange={(open) => !open && setConfirm(null)}
                title={
                    isReset
                        ? '¿Restablecer la contraseña?'
                        : deactivating
                            ? '¿Desactivar este socio?'
                            : '¿Activar este socio?'
                }
                description={
                    isReset
                        ? 'Se genera una contraseña temporal nueva y la actual deja de funcionar. Tendrá que cambiarla al ingresar.'
                        : deactivating
                            ? 'No podrá iniciar sesión ni registrar ingresos. Sus datos se conservan y podés reactivarlo cuando quieras.'
                            : 'Podrá volver a iniciar sesión.'
                }
                confirmLabel={isReset ? 'Restablecer' : deactivating ? 'Desactivar' : 'Activar'}
                destructive={deactivating}
                loading={setStatus.isPending || resetPassword.isPending}
                onConfirm={handleConfirm}
            />
        </>
    )
}