import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import { deletePost } from '../api/delete-post'
import { POSTS_QUERY_KEY } from '../constants/query-keys'
import { PostIdParamDto } from '../dto/post-id.param.schema'
import { PostResponseDto } from '../dto/post-response.schema'

export function useDeletePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deletePost,

    onMutate: async ({ id }: PostIdParamDto) => {
      await queryClient.cancelQueries({ queryKey: POSTS_QUERY_KEY })

      const cachedQueries = queryClient.getQueriesData<InfiniteData<PostResponseDto[]>>(
        { queryKey: POSTS_QUERY_KEY }
      )

      // Update every cash with deleted post
      for (const [queryKey, data] of cachedQueries) {
        if (!data) continue

        const updatedPages = data.pages.map((page) =>
          page.filter((post) => post.id !== id)
        )

        queryClient.setQueryData(queryKey, {
          ...data,
          pages: updatedPages,
        })
      }

      return { previousQueries: cachedQueries }
    },

    onError: (_err, _variables, context) => {
      if (!context?.previousQueries) return

      for (const [queryKey, oldData] of context.previousQueries) {
        queryClient.setQueryData(queryKey, oldData)
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEY })
    },
  })
}
