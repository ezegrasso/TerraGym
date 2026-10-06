import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { api } from '@/services/api'

export default function App() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['health'],
    queryFn: async () => (await api.get('/health')).data,
  })

  return (
    <main className="min-h-screen grid place-items-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>TerraGym</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground" role="status">
            {isLoading && 'Conectando con la API...'}
            {isError && 'No se pudo conectar con la API.'}
            {data && `API: ${data.data.status} · Base de datos: ${data.data.db}`}
          </p>
          <Button
            onClick={() => {
              refetch()
              toast.success('Verificando conexión')
            }}
          >
            Reintentar
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}