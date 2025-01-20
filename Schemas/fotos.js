import { z } from 'zod'

const fotoSchema = z.object({
  foto: z.string().isOptional,
  mensaje: z.string().max(255)
})

export function validateFoto (input) {
  return fotoSchema.safeParse(input)
}

export function validatePartialFoto (input) {
  return fotoSchema.partial().safeParse(input)
}
