import { register } from "@/features/auth/api/register"
import { useMutation } from "@tanstack/react-query"

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
  })
}
