import { z } from 'zod';

export const registerSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    phone: z.string().min(5).optional(),
    birthDate: z.coerce.date().optional(),
    about: z.string().max(500).optional(),
  })
  .strict();

export type RegisterDto = z.infer<typeof registerSchema>;
