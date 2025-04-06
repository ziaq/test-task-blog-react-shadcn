import { z } from 'zod';

export const postIdParamSchema = z
  .object({
    id: z.coerce.number().int().positive(),
  })
  .strict();

export type PostIdParamDto = z.infer<typeof postIdParamSchema>;
