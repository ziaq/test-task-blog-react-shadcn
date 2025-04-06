import { z } from 'zod';

export const getUserPostsQuerySchema = z
  .object({
    limit: z.coerce.number().int().min(1).max(100),
    offset: z.coerce.number().int().min(0),
    sort: z.enum(['ASC', 'DESC']),
  })
  .strict();

export type GetUserPostsQueryDto = z.infer<typeof getUserPostsQuerySchema>;
