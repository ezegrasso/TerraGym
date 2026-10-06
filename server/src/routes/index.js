import { Router } from 'express'
import { pool } from '../config/db.js'
import { sendSuccess } from '../utils/response.js'

const router = Router()

// Health check: lo usarán Render y nuestras pruebas. Es trivial, por eso va inline.
router.get('/health', async (req, res, next) => {
    try {
        await pool.query('SELECT 1')
        sendSuccess(res, { status: 'ok', db: 'ok' })
    } catch (err) {
        next(err)
    }
})

export default router