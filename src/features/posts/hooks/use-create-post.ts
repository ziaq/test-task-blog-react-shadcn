import { createPost } from "@/features/posts/api/create-post"
import { POSTS_QUERY_KEY } from "@/features/posts/constants/query-keys"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useCreatePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEY })
    },
  })
}
