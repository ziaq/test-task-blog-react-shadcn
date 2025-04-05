import { useEffect } from "react"
import { refreshAccessToken } from "@/lib/auth/refresh-token"
import { scheduleTokenRefresh } from "@/lib/auth/schedule-token-refresh"
import { useAuthStore } from "@/store/auth-store"

export const AuthBootstrap = () => {
  useEffect(() => {
    const { accessToken, setAccessToken, openAuthModal } = useAuthStore.getState()

    if (!accessToken) {
      refreshAccessToken()
        .then((newToken) => {
          setAccessToken(newToken)
          scheduleTokenRefresh()
        })
        .catch(() => {
          openAuthModal()
        })
    }
  }, [])

  return null
}
