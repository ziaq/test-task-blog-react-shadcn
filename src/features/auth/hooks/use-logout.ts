import { logout } from "@/features/auth/api/logout"
import { cancelScheduleTokenRefresh } from "@/lib/auth/schedule-token-refresh"
import { useAuthStore } from "@/store/auth-store"
import { useMutation } from "@tanstack/react-query"

export const useLogout = () => {
  const { deleteAccessToken } = useAuthStore.getState()

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      cancelScheduleTokenRefresh()
      deleteAccessToken()
    },
  })
}
