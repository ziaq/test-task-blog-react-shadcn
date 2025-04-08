import { apiFetchWithAuth } from '@/shared/api'

import { UpdateUserDto } from '../dto/update-user.schema'
import { UserResponseDto, userResponseSchema } from '../dto/user-response.schema'

export async function updateProfile(input: UpdateUserDto): Promise<UserResponseDto> {
  const response = await apiFetchWithAuth("/profile", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  })

  return userResponseSchema.parse(response)
}
