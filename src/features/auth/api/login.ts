import { getFingerprint } from "@/lib/auth/fingerprint"
import { loginSchema } from "@/features/auth/dto/login.schema"
import { AccessTokenResponseDto, accessTokenResponseSchema } from "@/lib/dto/access-token-response.schema"
import { scheduleTokenRefresh } from "@/lib/auth/schedule-token-refresh"
import { apiFetch } from "@/lib/api/api-fetch"

export async function login(email: string, password: string): Promise<string> {
  const fingerprint = await getFingerprint()

  const body = loginSchema.parse({ email, password, fingerprint })

  const response = await apiFetch<AccessTokenResponseDto>("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  const parsed = accessTokenResponseSchema.parse(response)

  scheduleTokenRefresh()

  return parsed.accessToken
}
