import { Router } from 'express'
import { FotoController } from './fotos.js'

export const createFotoRouter = ({ fotoModel }) => {
  const fotoRouter = Router()

  const fotoController = new FotoController({ fotoModel })
  
  fotoRouter.get('/', fotoController.getAll)
  fotoRouter.get('/:id', fotoController.getById)
  fotoRouter.get('/count', fotoController.getCount)
  fotoRouter.post('/', fotoController.create)
  fotoRouter.delete('/delete/:id', fotoController.deleteById)
  fotoRouter.delete('/deleteAll', fotoController.deleteAll)

  return fotoRouter
}
