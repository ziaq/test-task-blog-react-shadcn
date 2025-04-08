import { z } from 'zod';

export const userResponseSchema = z
  .object({
    id: z.number(),
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    phone: z.string().nullable(),
    birthDate: z.coerce.date().nullable(),
    about: z.string().nullable(),
    avatar: z.string().nullable(),
  })
  .strict();

export type UserResponseDto = z.infer<typeof userResponseSchema>;
