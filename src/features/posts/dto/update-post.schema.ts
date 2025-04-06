import { z } from 'zod';

export const updatePostSchema = z
  .object({
    text: z.string().min(1).max(10_000).optional(),
    deleteImageIds: z
      .union([
        z.coerce.number(),
        z.array(z.coerce.number()),
      ])
      .optional(),
  })
  .strict();

export type UpdatePostDto = z.infer<typeof updatePostSchema>;
