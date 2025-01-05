import { Router } from 'express'
import { FotoController } from './fotos.js'

export const createFotoRouter = ({ fotoModel }) => {
  const fotoRouter = Router()

  const fotoController = new FotoController({ fotoModel })
  
  fotoRouter.get('/', fotoController.getAll)
  fotoRouter.get('/cantidad', fotoController.getCount)
  fotoRouter.post('/', fotoController.create)
  fotoRouter.delete('/deleteAll', fotoController.deleteAll)
  fotoRouter.delete('/delete/:id', fotoController.deleteById)
  fotoRouter.get('/:id', fotoController.getById)

  return fotoRouter
}
