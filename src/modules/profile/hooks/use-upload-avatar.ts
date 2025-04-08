import { useMutation, useQueryClient } from '@tanstack/react-query'

import { uploadAvatar } from '../api/upload-avatar'
import { PROFILE_QUERY_KEY } from '../constants/query-keys'
import { UserResponseDto } from '../dto/user-response.schema'

export function useUploadAvatar() {
  const queryClient = useQueryClient()

  return useMutation<UserResponseDto, Error, File>({
    mutationFn: uploadAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY })
    },
  })
}
