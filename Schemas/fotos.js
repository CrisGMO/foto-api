import { z } from 'zod'

const fotoSchema = z.object({
  usuario: z.string().optional(),
  foto: z.string().optional(),
  mensaje: z.string().max(255).optional(),
  url: z.string().optional(),
  extension: z.string().optional(),	
  salon: z.string().optional()
})

export function validateFoto (input) {
  return fotoSchema.safeParse(input)
}

export function validatePartialFoto (input) {
  return fotoSchema.partial().safeParse(input)
}
