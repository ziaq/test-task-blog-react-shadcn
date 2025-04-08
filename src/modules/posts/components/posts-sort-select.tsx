import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui'

import { PostsSort } from '../components/posts-card'

type Props = {
  value: PostsSort
  onChange: (value: PostsSort) => void
}

export const PostsSortSelect = ({ value, onChange }: Props) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[140px] bg-secondary text-secondary-foreground hover:bg-secondary/90 border border-border shadow-sm px-4 py-2 rounded-md mb-[2px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={PostsSort.DESC}>Newest first</SelectItem>
        <SelectItem value={PostsSort.ASC}>Oldest first</SelectItem>
      </SelectContent>
    </Select>
  )
}
