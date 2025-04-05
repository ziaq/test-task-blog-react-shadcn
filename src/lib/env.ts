import { z } from "zod"

const envSchema = z.object({
  VITE_API_URL: z.string().url(),
  VITE_DEV_MODE: z
    .string()
    .transform((val) => val === "true")
})

export const env = envSchema.parse(import.meta.env)
