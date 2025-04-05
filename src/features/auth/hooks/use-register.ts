import { useMutation } from "@tanstack/react-query"
import { register } from "@/features/auth/api/register"
import { RegisterDto } from "@/features/auth/dto/register.schema"

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterDto) => register(data),
  })
}
