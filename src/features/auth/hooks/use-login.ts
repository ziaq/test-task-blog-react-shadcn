import { useMutation } from "@tanstack/react-query"
import { login } from "@/features/auth/api/login"
import { LoginDto } from "@/features/auth/dto/login.schema"
import { useAuthStore } from "@/store/auth-store"

export const useLogin = () => {
  const { setAccessToken, closeAuthModal } = useAuthStore.getState()

  return useMutation({
    mutationFn: ({ email, password }: LoginDto) => login(email, password),
    onSuccess: (token) => {
      setAccessToken(token)
      closeAuthModal()
    },
  })
}