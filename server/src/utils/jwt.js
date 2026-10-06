import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'

export const COOKIE_NAME = 'terragym_token'

export function signToken(userId) {
    return jwt.sign({ sub: userId }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN })
}

export function verifyToken(token) {
    return jwt.verify(token, env.JWT_SECRET) // lanza error si es inválido o expiró
}

// En producción: SameSite=None + Secure (front y back en dominios distintos).
// En desarrollo: Lax, porque localhost:5173 y localhost:4000 son el mismo "sitio".
export function cookieOptions() {
    const isProd = env.NODE_ENV === 'production'
    return {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? 'none' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días, alineado con JWT_EXPIRES_IN
        path: '/',
    }
}