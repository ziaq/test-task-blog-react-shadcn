import { updatePost } from "../api/update-post"
import { POSTS_QUERY_KEY } from "../constants/query-keys"
import { PostIdParamDto } from "../dto/post-id.param.schema"
import { PostResponseDto } from "../dto/post-response.schema"
import { UpdatePostDto } from "../dto/update-post.schema"

import { useMutation, useQueryClient } from "@tanstack/react-query"

type UpdatePostMutationArgs = {
  params: PostIdParamDto
  body: UpdatePostDto
  files?: File[]
}

export function useUpdatePost() {
  const queryClient = useQueryClient()

  return useMutation<PostResponseDto, Error, UpdatePostMutationArgs>({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEY })
    },
  })
}
