import { AlertCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
} from '@/shared/components/ui'

import { CreatePostDialog } from '../components/create-post-dialog'
import { PostsList } from '../components/posts-list'
import { PostsSortSelect } from '../components/posts-sort-select'
import { PostResponseDto } from '../dto/post-response.schema'
import { useDeletePost } from '../hooks/use-delete-post'
import { usePostsQuery } from '../hooks/use-posts-query'

const LIMIT = 5

export enum PostsSort {
  DESC = "DESC",
  ASC = "ASC",
}

export const PostsCard = () => {
  const [sort, setSort] = useState<PostsSort>(PostsSort.DESC)
  const [offset, setOffset] = useState(0)
  const [allPosts, setAllPosts] = useState<PostResponseDto[]>([])

  const {
    data: fetchedPosts,
    error,
    isFetching,
    isSuccess,
  } = usePostsQuery({ limit: LIMIT, offset, sort })

  const { mutate: deletePost } = useDeletePost()

  useEffect(() => {
    if (isSuccess && !isFetching) {
      setAllPosts((prev) => {
        return offset === 0 ? fetchedPosts : [...prev, ...fetchedPosts]
      })
    }
  }, [isFetching, isSuccess])

  const handleSortChange = (value: PostsSort) => {
    setSort(value)
    setOffset(0)
  }

  const handleLoadMore = () => {
    setOffset((prev) => prev + LIMIT)
  }

  return (
    <div className="max-w-2xl w-full mx-auto mt-8 space-y-6">
      <div className="flex items-center justify-between">
        <PostsSortSelect value={sort} onChange={handleSortChange} />
        <CreatePostDialog />
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="w-4 h-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Failed to load posts</AlertDescription>
        </Alert>
      )}

      {allPosts.length > 0 ? (
        <>
          <PostsList posts={allPosts} deletePost={deletePost} />
          {fetchedPosts && fetchedPosts.length === LIMIT && (
            <div className="flex justify-center pt-2">
              <Button onClick={handleLoadMore} disabled={isFetching}>
                Load more
              </Button>
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-muted-foreground text-sm py-6">
          You haven’t posted anything yet. Create your first post!
        </p>
      )}
    </div>
  )
}
