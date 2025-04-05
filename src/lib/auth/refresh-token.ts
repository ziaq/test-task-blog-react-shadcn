import { getFingerprint } from "@/lib/auth/fingerprint"
import { refreshTokenSchema } from "@/lib/dto/refresh-token.schema"
import { accessTokenResponseSchema } from "@/lib/dto/access-token-response.schema"
import { scheduleTokenRefresh } from "@/lib/auth/schedule-token-refresh"
import { apiFetch } from "@/lib/api/api-fetch"

export async function refreshAccessToken(): Promise<string> {
  const fingerprint = await getFingerprint()
  const body = refreshTokenSchema.parse({ fingerprint })

  const data = await apiFetch<unknown>("/api/auth/refresh", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
    body: JSON.stringify(body),
  })

  const parsed = accessTokenResponseSchema.parse(data)

  scheduleTokenRefresh()
  return parsed.accessToken
}
