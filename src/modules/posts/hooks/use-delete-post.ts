import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deletePost } from '../api/delete-post'
import { POSTS_QUERY_KEY } from '../constants/query-keys'

export function useDeletePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEY })
    },
  })
}