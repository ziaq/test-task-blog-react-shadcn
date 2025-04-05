import { RegisterDto } from "@/features/auth/dto/register.schema"
import { userResponseSchema, UserResponseDto } from "@/features/profile/dto/user-response.schema"
import { apiFetch } from "@/lib/api/api-fetch"

export async function register(input: RegisterDto): Promise<UserResponseDto> {
  const data = await apiFetch('/auth/register', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  })

  return userResponseSchema.parse(data)
}
