import { z } from 'zod'

const envSchema = z.object({
  EXPO_PUBLIC_API_BASE_URL: z
    .string()
    .min(1, 'Missing EXPO_PUBLIC_API_BASE_URL in env'),
})

export const env = envSchema.parse({
  EXPO_PUBLIC_API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL,
})

