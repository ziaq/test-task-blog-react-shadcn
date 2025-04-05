import { apiFetchWithAuth } from "@/lib/api/api-fetch-with-auth"
import { userResponseSchema, UserResponseDto } from "@/features/profile/dto/user-response.schema"
import { UpdateUserDto } from "@/features/profile/dto/update-user.schema"

export async function updateProfile(input: UpdateUserDto): Promise<UserResponseDto> {
  const response = await apiFetchWithAuth("/profile", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  })

  return userResponseSchema.parse(response)
}
