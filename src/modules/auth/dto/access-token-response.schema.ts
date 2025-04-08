import { z } from 'zod';

export const accessTokenResponseSchema = z.object({
  accessToken: z.string(),
}).strict();

export type AccessTokenResponseDto = z.infer<typeof accessTokenResponseSchema>;