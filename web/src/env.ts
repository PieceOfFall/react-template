import { z } from 'zod'

const envSchema = z.object({
  VITE_API_BASE_URL: z.string().min(1, 'Missing VITE_API_BASE_URL in env'),
})

export const env = envSchema.parse({
  VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
})

