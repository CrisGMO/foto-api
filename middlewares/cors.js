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
export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => 
  (req, res, next) => {
    const origin = req.headers.origin;

    if (!origin || acceptedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin || '*');
      res.setHeader('Access-Control-Allow-Credentials', 'true'); // 🔹 Importante para credenciales
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

      // Si es una solicitud OPTIONS (preflight), responde de inmediato
      if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
      }
    } else {
      return res.status(403).json({ message: `Not allowed by CORS: ${origin}` });
    }

    next();
  };


// export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
//   origin: (origin, callback) => {
//     console.log('Origin:', origin);
//     if (acceptedOrigins.includes(origin)) {
//       return callback(null, true)
//     }

//     if (!origin) {
//       return callback(null, true)
//     }

//     return callback(new Error('Not allowed by CORS'))
//   }
// })
