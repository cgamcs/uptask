import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db'
import projectRoutes from './routes/projectRouter'

dotenv.config({ quiet: true })

connectDB()

const app = express()

// Routes
app.use('/api/projects', projectRoutes)

export default app