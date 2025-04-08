import { UserResponseDto, userResponseSchema } from '@/modules/profile'
import { apiFetch } from '@/shared/api'

import { RegisterDto } from '../dto/register.schema'

export async function register(input: RegisterDto): Promise<UserResponseDto> {
  const data = await apiFetch('/auth/register', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  })

  return userResponseSchema.parse(data)
}
