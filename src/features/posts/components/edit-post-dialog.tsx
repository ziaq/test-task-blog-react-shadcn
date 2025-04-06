import { Pencil } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { EditPostForm } from "@/features/posts/components/edit-post-form"
import { PostResponseDto } from "@/features/posts/dto/post-response.schema"
import { useUpdatePost } from "@/features/posts/hooks/use-update-post"

type EditPostDialogProps = {
  post: PostResponseDto
}

export const EditPostDialog = ({ post }: EditPostDialogProps) => {
  const [open, setOpen] = useState(false)
  const updatePost = useUpdatePost()

  useEffect(() => {
    if (updatePost.isSuccess) {
      setOpen(false)
    }
  }, [updatePost.isSuccess])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="w-4 h-4" />
          <span className="sr-only">Edit Post</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
        </DialogHeader>
        <EditPostForm post={post} updatePost={updatePost} />
      </DialogContent>
    </Dialog>
  )
}
