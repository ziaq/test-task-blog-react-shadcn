import { GetUserPostsQueryDto, getUserPostsQuerySchema } from "@/features/posts/dto/get-user-posts.query.schema"
import { PostsResponseDto,postsResponseSchema } from "@/features/posts/dto/posts-response.schema"
import { apiFetchWithAuth } from "@/lib/api/api-fetch-with-auth"

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
