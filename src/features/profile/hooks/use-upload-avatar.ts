import { useMutation, useQueryClient } from "@tanstack/react-query"
import { uploadAvatar } from "@/features/profile/api/upload-avatar"
import { UserResponseDto } from "@/features/profile/dto/user-response.schema"
import { PROFILE_QUERY_KEY } from "@/features/profile/constants/query-keys"

export function useUploadAvatar() {
  const queryClient = useQueryClient()

  return useMutation<UserResponseDto, Error, File>({
    mutationFn: uploadAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY })
    },
  })
}
