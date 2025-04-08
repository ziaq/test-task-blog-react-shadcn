import { z } from 'zod';

export const updateUserSchema = z
  .object({
    firstName: z.string().min(1).max(100).optional(),
    lastName: z.string().min(1).max(100).optional(),
    phone: z.string().max(100).optional(),
    birthDate: z.coerce.date().optional(),
    email: z.string().email().optional(),
    about: z.string().max(1000).optional(),
  })
  .strict();

export type UpdateUserDto = z.infer<typeof updateUserSchema>;
