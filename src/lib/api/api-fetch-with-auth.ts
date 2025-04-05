import { apiFetch } from "@/lib/api/api-fetch"
import { refreshAccessToken } from "@/lib/auth/refresh-token"
import { useAuthStore } from "@/store/auth-store"
import { ApiError } from "@/lib/errors/api-error"

export async function apiFetchWithAuth<T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const authStore = useAuthStore.getState()

  try {
    return await apiFetch<T>(input, { ...init, auth: true })

  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      try {
        const newToken = await refreshAccessToken()
        authStore.setAccessToken(newToken)

        return await apiFetch<T>(input, { ...init, auth: true })

      } catch {
        authStore.clear()
        authStore.openAuthModal()
        throw new ApiError(401, "Unauthorized and refresh failed")
      }
    }

    throw error
  }
}
