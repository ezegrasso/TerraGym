import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import { env } from './config/env.js'
import routes from './routes/index.js'
import { notFound, errorHandler } from './middlewares/errorHandler.js'

const app = express()

// Render está detrás de un proxy: necesario para cookies Secure y rate limiting
app.set('trust proxy', 1)

app.use(helmet())
app.use(cors({ origin: env.CLIENT_URL, credentials: true }))
app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'))
app.use(express.json({ limit: '1mb' }))
app.use(cookieParser())

app.use('/api', routes)

app.use(notFound)
app.use(errorHandler)

export default app