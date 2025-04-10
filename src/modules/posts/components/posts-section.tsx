import { useEffect, useState } from 'react'

import { Button, LoadErrorAlert } from '@/shared/components/ui'

import { PostResponseDto } from '../dto/post-response.schema'
import { useDeletePost } from '../hooks/use-delete-post'
import { useInfinitePostsQuery } from '../hooks/use-infinite-posts-query'
import { PostCard } from './post-card'
import { PostsHeader } from './posts-header'

export enum PostsSort {
  DESC = 'DESC',
  ASC = 'ASC',
}

const LIMIT = 5

export const PostsSection = () => {
  const [sort, setSort] = useState<PostsSort>(PostsSort.DESC)
  // Posts are cached in state to display while new ones are loaded due to the sorting change
  const [posts, setPosts] = useState<PostResponseDto[]>([])

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfinitePostsQuery({ limit: LIMIT, sort })

  const { mutate: deletePost } = useDeletePost()

  useEffect(() => {
    if (data?.pages.length) {
      const newPosts = data.pages.flat()
      setPosts(newPosts)
    }
  }, [data])

  if (error) {
    return <LoadErrorAlert message="Failed to load posts" />
  }

  return (
    <section className="max-w-2xl w-full mx-auto mt-8 space-y-6">
      <PostsHeader sort={sort} isLoading={isLoading} handleSortChange={setSort} />
      {posts.length > 0 ? (
        <>
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} deletePost={deletePost} />
            ))}
          </div>
          {hasNextPage && (
            <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage} className="block mx-auto">
              {isLoading ? 'Loading...' : 'Load more'}
            </Button>
          )}
        </>
      ) : (
        <p className="text-center text-muted-foreground text-sm py-6">
          You haven’t posted anything yet. Create your first post!
        </p>
      )}
    </section>
  )
}
