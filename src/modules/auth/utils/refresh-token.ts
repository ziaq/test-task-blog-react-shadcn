import { apiFetch } from '@/shared/api'
import { ApiError } from '@/shared/errors'

import { accessTokenResponseSchema } from '../dto/access-token-response.schema'
import { refreshTokenSchema } from '../dto/refresh-token.schema'
import { useAuthStore } from '../store/auth-store'
import { getFingerprint } from '../utils/fingerprint'

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
