import { apiFetch } from "@/lib/api/api-fetch"
import { refreshAccessToken } from "@/lib/auth/refresh-token"
import { useAuthStore } from "@/store/auth-store"
import { ApiError } from "@/lib/errors/api-error"

export async function apiFetchWithAuth(
  input: string,
  init?: RequestInit
): Promise<unknown> {
  const { setAccessToken, deleteAccessToken } = useAuthStore.getState()

  try {
    return await apiFetch(input, { ...init, auth: true })

  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      try {
        const newToken = await refreshAccessToken()
        setAccessToken(newToken)

        return await apiFetch(input, { ...init, auth: true })

      } catch {
        deleteAccessToken()
        throw new ApiError(401, "Unauthorized and refresh failed")
      }
    }

    throw error
  }
}
