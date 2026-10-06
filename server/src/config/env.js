import 'dotenv/config'
import { z } from 'zod'

const schema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.coerce.number().default(4000),
    CLIENT_URL: z.string().url(),
    DB_HOST: z.string().min(1),
    DB_PORT: z.coerce.number().default(3306),
    DB_USER: z.string().min(1),
    DB_PASSWORD: z.string(),
    DB_NAME: z.string().min(1),
    JWT_SECRET: z.string().min(32, 'JWT_SECRET debe tener al menos 32 caracteres'),
    JWT_EXPIRES_IN: z.string().default('7d'),
    ADMIN_EMAIL: z.string().email().optional(),
    ADMIN_PASSWORD: z.string().min(8, 'ADMIN_PASSWORD debe tener al menos 8 caracteres').optional(),
    ADMIN_FIRST_NAME: z.string().default('Admin'),
    ADMIN_LAST_NAME: z.string().default('TerraGym'),
})

const parsed = schema.safeParse(process.env)

if (!parsed.success) {
    console.error('Variables de entorno inválidas:')
    for (const issue of parsed.error.issues) {
        console.error(` - ${issue.path.join('.')}: ${issue.message}`)
    }
    process.exit(1)
}

export const env = parsed.data