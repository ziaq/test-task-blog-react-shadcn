import { z } from 'zod';

export const createPostSchema = z
  .object({
    text: z.string().min(1).max(10_000),
  })
  .strict();

export type CreatePostDto = z.infer<typeof createPostSchema>;
