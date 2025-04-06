import { UserResponseDto,userResponseSchema } from "@/features/profile/dto/user-response.schema"
import { apiFetchWithAuth } from "@/lib/api/api-fetch-with-auth"

export async function uploadAvatar(file: File): Promise<UserResponseDto> {
  const formData = new FormData()
  formData.append("file", file)

  const response = await apiFetchWithAuth("/profile/upload-avatar", {
    method: "POST",
    body: formData,
  })

  return userResponseSchema.parse(response)
}