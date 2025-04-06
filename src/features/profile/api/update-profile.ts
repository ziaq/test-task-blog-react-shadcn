import { UpdateUserDto } from "@/features/profile/dto/update-user.schema"
import { UserResponseDto,userResponseSchema } from "@/features/profile/dto/user-response.schema"
import { apiFetchWithAuth } from "@/lib/api/api-fetch-with-auth"

export async function updateProfile(input: UpdateUserDto): Promise<UserResponseDto> {
  const response = await apiFetchWithAuth("/profile", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  })

  return userResponseSchema.parse(response)
}
