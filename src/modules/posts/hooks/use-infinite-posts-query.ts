import { useInfiniteQuery } from '@tanstack/react-query'

import { getPosts } from '../api/get-posts'
import { POSTS_QUERY_KEY } from '../constants/query-keys'
import { GetUserPostsQueryDto } from '../dto/get-user-posts.query.schema'

export function useInfinitePostsQuery(params: Omit<GetUserPostsQueryDto, 'offset'>) {
  return useInfiniteQuery({
    queryKey: [...POSTS_QUERY_KEY, params],

    queryFn: ({ pageParam = 0 }) => { 
      return getPosts({ ...params, offset: pageParam })
    },

    initialPageParam: 0,

    // return next value of pageParams (offset)
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === params.limit
        ? allPages.length * params.limit
        : undefined
    },
  })
}
