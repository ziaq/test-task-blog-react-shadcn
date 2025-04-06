import { apiFetch } from "@/lib/api/api-fetch"
import { getFingerprint } from "@/lib/auth/fingerprint"
import { accessTokenResponseSchema } from "@/lib/dto/access-token-response.schema"
import { refreshTokenSchema } from "@/lib/dto/refresh-token.schema"
import { ApiError } from "@/lib/errors/api-error"
import { useAuthStore } from "@/store/auth-store"

export async function refreshAccessToken(): Promise<void> {
  const fingerprint = await getFingerprint()
  const body = refreshTokenSchema.parse({ fingerprint })

  const { setAccessToken, deleteAccessToken } = useAuthStore.getState();

  try {
    const response = await apiFetch("/auth/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      body: JSON.stringify(body),
    })

    const { accessToken } = accessTokenResponseSchema.parse(response)

    setAccessToken(accessToken)

  } catch {
    deleteAccessToken()
    throw new ApiError(401, "Unauthorized and refresh failed")
  }
}
