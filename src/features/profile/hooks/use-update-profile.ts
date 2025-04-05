import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProfile } from "../api/update-profile"
import type { UpdateProfileDto } from "../api/update-profile"

export function useUpdateProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateProfileDto) => updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] })
    },
  })
}