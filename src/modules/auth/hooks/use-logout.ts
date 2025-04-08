import { useMutation } from "@tanstack/react-query"

import { logout } from '../api/logout'
import { useAuthStore } from '../store/auth-store'
import { cancelScheduleTokenRefresh } from '../utils/schedule-token-refresh'

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
