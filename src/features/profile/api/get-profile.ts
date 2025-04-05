import { apiFetchWithAuth } from "@/lib/api/api-fetch-with-auth"
import { userResponseSchema, UserResponseDto } from "../dto/user-response.schema"

export async function getProfile(): Promise<UserResponseDto> {
  const response = await apiFetchWithAuth("/profile")
  return userResponseSchema.parse(response)
}
