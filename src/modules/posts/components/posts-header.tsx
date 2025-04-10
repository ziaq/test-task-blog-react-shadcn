import { memo } from 'react'

import { Spinner } from "../../../shared/components/ui"
import { CreatePostDialog } from "./create-post-dialog"
import { PostsSort } from './posts-section'
import { PostsSortSelect } from "./posts-sort-select"

type PostsHeaderProps = {
  sort: PostsSort
  isLoading: boolean
  handleSortChange: (value: PostsSort) => void
}

export const PostsHeaderComponent = ({ 
  sort, 
  isLoading, 
  handleSortChange 
}: PostsHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className='flex justify-center items-center space-x-2'>
        <PostsSortSelect value={sort} onChange={handleSortChange} />
        {isLoading && <Spinner />}
      </div>
      <CreatePostDialog />
    </div>
  )
}

export const PostsHeader = memo(PostsHeaderComponent)
