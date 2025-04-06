import { z } from 'zod';

export const postImageSchema = z.object({
  id: z.number(),
  filename: z.string(),
});

export const postResponseSchema = z
  .object({
    id: z.number(),
    text: z.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    images: z.array(postImageSchema),
  })
  .strict();

export type PostResponseDto = z.infer<typeof postResponseSchema>;
