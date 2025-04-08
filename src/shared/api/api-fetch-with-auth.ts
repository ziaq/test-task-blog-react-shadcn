import { apiFetch } from "@/shared/api/api-fetch"
import { ApiError } from "@/shared/errors/api-error"

import { runRefreshToken } from "./api-config";

export async function apiFetchWithAuth(
  input: string,
  init?: RequestInit
): Promise<unknown> {
  try {
    return await apiFetch(input, { ...init, auth: true })

  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      await runRefreshToken()
      return await apiFetch(input, { ...init, auth: true })
    }

    throw error
  }
}
