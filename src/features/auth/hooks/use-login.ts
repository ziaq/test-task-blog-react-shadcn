import { login } from "@/features/auth/api/login"
import { useAuthStore } from "@/store/auth-store"
import { useMutation } from "@tanstack/react-query"

export const useLogin = () => {
  const { setAccessToken } = useAuthStore.getState()

  return useMutation({
    mutationFn: login,
    onSuccess: (token) => setAccessToken(token),
  })
}