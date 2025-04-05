import { refreshAccessToken } from "@/lib/auth/refresh-token"
import { useAuthStore } from "@/store/auth-store"

let timeoutId: NodeJS.Timeout | null = null

export const scheduleTokenRefresh = () => {
  if (timeoutId) clearTimeout(timeoutId)

  const { setAccessToken, deleteAccessToken } = useAuthStore.getState()

  timeoutId = setTimeout(async () => {
    try {
      const token = await refreshAccessToken()
      setAccessToken(token)
      scheduleTokenRefresh()
    } catch {
      deleteAccessToken()
    }
  }, 14 * 60 * 1000)
}

export const cancelScheduleTokenRefresh = () => {
  if (timeoutId) clearTimeout(timeoutId)
  timeoutId = null
}
