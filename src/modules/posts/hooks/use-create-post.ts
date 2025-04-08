import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createPost } from '../api/create-post'
import { POSTS_QUERY_KEY } from '../constants/query-keys'

export function useCreatePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEY })
    },
  })
}
