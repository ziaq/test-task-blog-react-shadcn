import { useQuery } from "@tanstack/react-query"
import { getPosts } from "@/features/posts/api/get-posts"
import { GetUserPostsQueryDto } from "@/features/posts/dto/get-user-posts.query.schema"
import { POSTS_QUERY_KEY } from "@/features/posts/constants/query-keys"


export function usePostsQuery(params: GetUserPostsQueryDto) {
  return useQuery({
    queryKey: [...POSTS_QUERY_KEY, params],
    queryFn: () => getPosts(params),
  })
}
