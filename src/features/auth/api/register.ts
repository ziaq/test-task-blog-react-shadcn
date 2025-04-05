import { registerSchema, RegisterDto } from "@/features/auth/dto/register.schema"
import { userResponseSchema, UserResponseDto } from "@/features/profile/dto/user-response.schema"
import { apiFetch } from "@/lib/api/api-fetch"

export async function register(input: RegisterDto): Promise<UserResponseDto> {
  const validatedInput = registerSchema.parse(input)

  const data = await apiFetch<UserResponseDto>(`${import.meta.env.VITE_API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(validatedInput),
  })

  return userResponseSchema.parse(data)
}
