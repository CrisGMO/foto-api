import express, { json } from 'express' // require -> commonJS
import { createFotoRouter } from './Controllers/routes.js'
import { corsMiddleware } from './middlewares/cors.js'
import 'dotenv/config'

// después
export const createApp = ({ fotoModel }) => {
  const app = express()
  app.use(json())
  app.use(corsMiddleware())
  app.disable('x-powered-by')

  app.use('/api/fotos', createFotoRouter({ fotoModel }))

  const PORT = process.env.PORT ?? 3000

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })
}
