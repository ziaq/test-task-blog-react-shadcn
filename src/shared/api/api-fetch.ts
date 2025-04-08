import { env } from "@/shared/config/env"
import { ApiError } from "@/shared/errors/api-error"
import { NetworkError } from "@/shared/errors/network-error"

import { getAccessToken } from "./api-config"

interface ApiFetchOptions extends RequestInit {
  auth?: boolean
  withCredentials?: boolean
  fullUrl?: boolean
}

export async function apiFetch(
  input: string,
  init: ApiFetchOptions = {}
): Promise<unknown> {
  try {
    const headers = new Headers(init.headers)

    if (init.auth) {
      const token = getAccessToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }
    }

    const url = init.fullUrl ? input : `${env.VITE_API_URL}${input}`

    const res = await fetch(url, {
      ...init,
      headers,
      credentials: init.withCredentials ? "include" : undefined,
    })

    if (!res.ok) throw new ApiError(res.status, "Request failed")
    if (res.status === 204) return null

    return await res.json()

  } catch (error) {
    if (error instanceof ApiError) throw error
    throw new NetworkError()
  }
}