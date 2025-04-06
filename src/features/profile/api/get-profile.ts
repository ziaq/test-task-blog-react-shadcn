import { UserResponseDto,userResponseSchema } from "../dto/user-response.schema"

import { apiFetchWithAuth } from "@/lib/api/api-fetch-with-auth"

export async function getProfile(): Promise<UserResponseDto> {
  const response = await apiFetchWithAuth("/profile")
  return userResponseSchema.parse(response)
}
