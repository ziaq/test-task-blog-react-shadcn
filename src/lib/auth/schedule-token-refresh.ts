import { refreshAccessToken } from "@/lib/auth/refresh-token"
import { useAuthStore } from "@/store/auth-store"

let timeoutId: NodeJS.Timeout | null = null

export const scheduleTokenRefresh = () => {
  if (timeoutId) clearTimeout(timeoutId)

  timeoutId = setTimeout(async () => {
    try {
      const token = await refreshAccessToken()
      useAuthStore.getState().setAccessToken(token)
      scheduleTokenRefresh()
    } catch {
      useAuthStore.getState().clear()
      useAuthStore.getState().openAuthModal()
    }
  }, 14 * 60 * 1000)
}

export const cancelScheduleTokenRefresh = () => {
  if (timeoutId) clearTimeout(timeoutId)
  timeoutId = null
}
