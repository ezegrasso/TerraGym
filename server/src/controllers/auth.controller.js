import * as authService from '../services/auth.service.js'
import { COOKIE_NAME, cookieOptions, signToken } from '../utils/jwt.js'
import { sendSuccess } from '../utils/response.js'

export async function login(req, res, next) {
    try {
        const user = await authService.login(req.body.email, req.body.password)
        res.cookie(COOKIE_NAME, signToken(user.id), cookieOptions())
        sendSuccess(res, authService.toPublicUser(user), 'Sesión iniciada')
    } catch (err) {
        next(err)
    }
}

export function logout(req, res) {
    // clearCookie necesita las mismas opciones (menos maxAge) con las que se creó
    const { maxAge, ...opts } = cookieOptions()
    res.clearCookie(COOKIE_NAME, opts)
    sendSuccess(res, null, 'Sesión cerrada')
}

export function me(req, res) {
    sendSuccess(res, authService.toPublicUser(req.user))
}

export async function changePassword(req, res, next) {
    try {
        await authService.changePassword(req.user.id, req.body.currentPassword, req.body.newPassword)
        sendSuccess(res, null, 'Contraseña actualizada')
    } catch (err) {
        next(err)
    }
}