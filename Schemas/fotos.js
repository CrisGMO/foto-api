import { z } from 'zod'

const fotoSchema = z.object({
  foto: z.string().url()
})

export function validateFoto (input) {
  return fotoSchema.safeParse(input)
}

export function validatePartialFoto (input) {
  return fotoSchema.partial().safeParse(input)
}
