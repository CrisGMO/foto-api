import { z } from 'zod'

const fotoSchema = z.object({
  foto: z.string().isNullable,
  mensaje: z.string().max(255).isOptional
})

export function validateFoto (input) {
  return fotoSchema.safeParse(input)
}

export function validatePartialFoto (input) {
  return fotoSchema.partial().safeParse(input)
}
