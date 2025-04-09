import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { Trash } from 'lucide-react'

import { Button, Card, CardContent, CardHeader } from '@/shared/components/ui'
import { env } from '@/shared/config/env'

import { EditPostDialog } from '../components/edit-post-dialog'
import { PostIdParamDto } from '../dto/post-id.param.schema'
import { PostResponseDto } from '../dto/post-response.schema'

type PostsListProps = {
  posts: PostResponseDto[]
  deletePost: (params: PostIdParamDto) => void
}

export const PostsList = ({ posts, deletePost }: PostsListProps) => {
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Card key={post.id}>
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-sm text-muted-foreground">
              {format(post.createdAt, "d MMMM yyyy, HH:mm", { locale: ru })}
            </p>
            <div className="flex items-center gap-2">
              <EditPostDialog post={post} />
              <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:text-red-600"
                onClick={() => deletePost({ id: post.id })}
              >
                <Trash className="w-4 h-4" />
                <span className="sr-only">Delete post</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="whitespace-pre-wrap">{post.text}</p>
            {post.images.length > 0 && (
              <div className="flex flex-wrap justify-center gap-4">
                {post.images.map((image) => (
                  <img
                    key={image.id}
                    src={`${env.VITE_API_URL}/uploads/post-images/${image.filename}`}
                    alt="Post image"
                    className="w-[calc(25%-1rem)] max-w-[200px] rounded-md object-cover"
                    loading="lazy"
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
