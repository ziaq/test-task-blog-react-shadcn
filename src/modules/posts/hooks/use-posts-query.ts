import { useQuery } from '@tanstack/react-query'

import { getPosts } from '../api/get-posts'
import { POSTS_QUERY_KEY } from '../constants/query-keys'
import { GetUserPostsQueryDto } from '../dto/get-user-posts.query.schema'


export function usePostsQuery(params: GetUserPostsQueryDto) {
  return useQuery({
    queryKey: [...POSTS_QUERY_KEY, params],
    queryFn: () => getPosts(params),
  })
}
