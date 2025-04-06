import { deletePost } from "@/features/posts/api/delete-post"
import { POSTS_QUERY_KEY } from "@/features/posts/constants/query-keys"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useDeletePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEY })
    },
  })
}