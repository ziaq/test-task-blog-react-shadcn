import { apiFetchWithAuth } from '@/shared/api'

import { UserResponseDto, userResponseSchema } from '../dto/user-response.schema'

export async function getProfile(): Promise<UserResponseDto> {
  const response = await apiFetchWithAuth("/profile")
  return userResponseSchema.parse(response)
}
