import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const STATUSES = {
    active: {
        label: 'Activo',
        className: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
    },
    inactive: { label: 'Inactivo', className: 'bg-muted text-muted-foreground' },
}

export default function StatusBadge({ status, className }) {
    const config = STATUSES[status]
    if (!config) return null
    return (
        <Badge variant="secondary" className={cn('border-transparent', config.className, className)}>
            {config.label}
        </Badge>
    )
}