import { loginSchema } from "@/features/auth/dto/login.schema"
import { z } from "zod"

export const loginFormSchema = loginSchema.omit({ fingerprint: true })

export type LoginFormValues = z.infer<typeof loginFormSchema>