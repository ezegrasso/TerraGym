import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Dumbbell } from 'lucide-react'
import { toast } from 'sonner'
import PasswordInput from '@/components/shared/PasswordInput'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/useAuth'
import { getErrorMessage } from '@/services/api'
import { HOME_BY_ROLE } from '@/utils/roles'

const schema = z.object({
    email: z.string().trim().min(1, 'Ingresá tu email').email('El email no es válido'),
    password: z.string().min(1, 'Ingresá tu contraseña'),
    remember: z.boolean(),
})

export default function LoginPage() {
    const { user, login } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: { email: '', password: '', remember: false },
    })

    // Si ya hay sesión, no tiene sentido mostrar el login
    if (user) return <Navigate to={HOME_BY_ROLE[user.role]} replace />

    async function onSubmit(values) {
        try {
            const loggedUser = await login(values)
            if (loggedUser.mustChangePassword) {
                navigate('/cambiar-password', { replace: true })
            } else {
                navigate(location.state?.from?.pathname ?? HOME_BY_ROLE[loggedUser.role], { replace: true })
            }
        } catch (error) {
            toast.error(getErrorMessage(error))
        }
    }

    return (
        <main className="grid min-h-screen place-items-center bg-muted/40 p-4">
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-2 grid size-12 place-items-center rounded-xl bg-primary text-primary-foreground">
                        <Dumbbell className="size-6" aria-hidden="true" />
                    </div>
                    <CardTitle className="text-2xl">TerraGym</CardTitle>
                    <CardDescription>Ingresá con tu cuenta</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                autoComplete="username"
                                aria-invalid={!!errors.email}
                                aria-describedby={errors.email ? 'email-error' : undefined}
                                {...register('email')}
                            />
                            {errors.email && (
                                <p id="email-error" role="alert" className="text-sm text-destructive">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Contraseña</Label>
                            <PasswordInput
                                id="password"
                                autoComplete="current-password"
                                aria-invalid={!!errors.password}
                                aria-describedby={errors.password ? 'password-error' : undefined}
                                {...register('password')}
                            />
                            {errors.password && (
                                <p id="password-error" role="alert" className="text-sm text-destructive">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <div className="flex items-start gap-2">
                            <Controller
                                name="remember"
                                control={control}
                                render={({ field }) => (
                                    <Checkbox
                                        id="remember"
                                        checked={field.value}
                                        onCheckedChange={(checked) => field.onChange(checked === true)}
                                        aria-describedby="remember-hint"
                                        className="mt-0.5"
                                    />
                                )}
                            />
                            <div className="grid gap-1 leading-none">
                                <Label htmlFor="remember" className="cursor-pointer">
                                    Mantener la sesión iniciada en este dispositivo
                                </Label>
                                <p id="remember-hint" className="text-xs text-muted-foreground">
                                    Usalo solo en tu celular o computadora personal.
                                </p>
                            </div>
                        </div>

                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? 'Ingresando...' : 'Ingresar'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </main>
    )
}