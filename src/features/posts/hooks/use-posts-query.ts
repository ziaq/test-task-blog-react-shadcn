import { getPosts } from "@/features/posts/api/get-posts"
import { POSTS_QUERY_KEY } from "@/features/posts/constants/query-keys"
import { GetUserPostsQueryDto } from "@/features/posts/dto/get-user-posts.query.schema"
import { useQuery } from "@tanstack/react-query"


export function usePostsQuery(params: GetUserPostsQueryDto) {
  return useQuery({
    queryKey: [...POSTS_QUERY_KEY, params],
    queryFn: () => getPosts(params),
  })
}
