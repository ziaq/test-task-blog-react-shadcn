import { z } from "zod"

import { loginSchema } from "@/modules/auth/dto/login.schema"

export const loginFormSchema = loginSchema.omit({ fingerprint: true })

export type LoginFormValues = z.infer<typeof loginFormSchema>