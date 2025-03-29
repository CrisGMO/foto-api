import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'https://auth-api-green-pi.vercel.app',
  'https://stream-pix.vercel.app',
  'http://localhost:8080',
  'http://localhost:1234',
  'http://localhost:5173',
  'http://localhost:3000',
  'https://foto-api.vercel.app',
  'https://foto-proyeccion.vercel.app',
  'https://foto-proyeccion-git-main-crisgmos-projects.vercel.app',
  'https://streampix.site'
]

// || origin.startsWith("http://localhost")
export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: (origin, callback) => {
    console.log('Origin:', origin);
    if (acceptedOrigins.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
})
