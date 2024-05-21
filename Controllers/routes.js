import { Router } from 'express'
import { FotoController } from './fotos.js'

export const createFotoRouter = ({ fotoModel }) => {
  const fotoRouter = Router()

  const fotoController = new FotoController({ fotoModel })
  
  fotoRouter.get('/', fotoController.getAll)
  fotoRouter.post('/', fotoController.create)
  fotoRouter.delete('/deleteAll', fotoController.deleteAll)

  return fotoRouter
}
