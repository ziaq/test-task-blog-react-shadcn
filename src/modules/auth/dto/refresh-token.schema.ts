import { z } from 'zod';

export const refreshTokenSchema = z
  .object({
    fingerprint: z.string(),
  })
  .strict();

export type RefreshTokenDto = z.infer<typeof refreshTokenSchema>;
