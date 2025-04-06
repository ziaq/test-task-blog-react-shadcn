import { apiFetch } from "@/lib/api/api-fetch"
import { refreshAccessToken } from "@/lib/auth/refresh-token"
import { ApiError } from "@/lib/errors/api-error"

export async function apiFetchWithAuth(
  input: string,
  init?: RequestInit
): Promise<unknown> {
  try {
    return await apiFetch(input, { ...init, auth: true })

  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      await refreshAccessToken()
      return await apiFetch(input, { ...init, auth: true })
    }

    throw error
  }
}
