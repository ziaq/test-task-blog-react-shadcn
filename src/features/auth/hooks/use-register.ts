import { useMutation } from "@tanstack/react-query"
import { register } from "@/features/auth/api/register"

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
  })
}
