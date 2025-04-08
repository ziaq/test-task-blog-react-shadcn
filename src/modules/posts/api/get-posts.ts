import { apiFetchWithAuth } from '@/shared/api'

import { GetUserPostsQueryDto, getUserPostsQuerySchema } from '../dto/get-user-posts.query.schema'
import { PostsResponseDto, postsResponseSchema } from '../dto/posts-response.schema'

export async function getPosts(params: GetUserPostsQueryDto): Promise<PostsResponseDto> {
  const validatedParams = getUserPostsQuerySchema.parse(params)

  const searchParams = new URLSearchParams({
    limit: validatedParams.limit.toString(),
    offset: validatedParams.offset.toString(),
    sort: validatedParams.sort,
  }).toString()

  const response = await apiFetchWithAuth(`/posts/get-user-posts?${searchParams}`)

  return postsResponseSchema.parse(response)
}
