import { Router } from 'express'
import { FotoController } from './fotos.js'

export const createFotoRouter = ({ fotoModel }) => {
  const fotoRouter = Router()
  console.log(fotoModel);
  
  

  const fotoController = new FotoController({ fotoModel })
  
  fotoRouter.delete('/delete/:id', fotoController.deleteById)
  fotoRouter.get('/', fotoController.getAll)
  fotoRouter.get('/count', fotoController.getCount)
  fotoRouter.post('/', fotoController.create)
  fotoRouter.delete('/deleteAll', fotoController.deleteAll)
  fotoRouter.get('/find/:id', fotoController.getById)
  fotoRouter.get('/last', fotoController.getLast)
  fotoRouter.get('/salon/:salon', fotoController.getByEvent)
  fotoRouter.delete('/deleteEvent/:salon', fotoController.deleteByEvent)

  return fotoRouter
}
