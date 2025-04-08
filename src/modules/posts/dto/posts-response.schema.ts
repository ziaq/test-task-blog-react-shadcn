import { z } from 'zod';

import { postResponseSchema } from './post-response.schema';

export const postsResponseSchema = z.array(postResponseSchema);

export type PostsResponseDto = z.infer<typeof postsResponseSchema>;
