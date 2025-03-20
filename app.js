import express, { json } from 'express'; 
import { createFotoRouter } from './Controllers/routes.js';
import { corsMiddleware } from './middlewares/cors.js';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';


// después
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createApp = ({ fotoModel }) => {
  const app = express()
  const PORT = process.env.PORT ?? 3000

  app.use(json())
  app.use(corsMiddleware())
  app.disable('x-powered-by')

  app.use('/api/fotos', createFotoRouter({ fotoModel }))
  console.log("dbModel in server.js: ");
  console.log(fotoModel);
  // app.use('/', (req, res) => {
  //   res.sendFile(path.join(__dirname, '/Views/index.html'));
  // })
  

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })
}
