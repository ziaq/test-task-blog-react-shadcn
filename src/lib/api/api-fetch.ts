import { ApiError } from "@/lib/errors/api-error"
import { NetworkError } from "@/lib/errors/network-error"
import { useAuthStore } from "@/store/auth-store"

interface ApiFetchOptions extends RequestInit {
  auth?: boolean
  withCredentials?: boolean
}

export async function apiFetch<T>(
  input: RequestInfo,
  init: ApiFetchOptions = {}
): Promise<T> {
  try {
    const headers = new Headers(init.headers)

    if (init.auth) {
      const token = useAuthStore.getState().accessToken
      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }
    }

    const res = await fetch(input, {
      ...init,
      headers,
      credentials: init.withCredentials ? "include" : undefined,
    })

    if (!res.ok) {
      throw new ApiError(res.status, "Request failed")
    }

    return await res.json()
  } catch (error) {
    if (error instanceof ApiError) throw error
    throw new NetworkError()
  }
}
