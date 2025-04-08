import { apiFetchWithAuth } from '@/shared/api'

import { UserResponseDto, userResponseSchema } from '../dto/user-response.schema'

export async function uploadAvatar(file: File): Promise<UserResponseDto> {
  const formData = new FormData()
  formData.append("file", file)

  const response = await apiFetchWithAuth("/profile/upload-avatar", {
    method: "POST",
    body: formData,
  })

  return userResponseSchema.parse(response)
}