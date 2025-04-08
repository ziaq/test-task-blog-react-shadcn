import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/shared/components/ui'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui'

import { CreatePostForm } from '../components/create-post-form'
import { useCreatePost } from '../hooks/use-create-post'

export const CreatePostDialog = () => {
  const [open, setOpen] = useState(false)
  const createPost = useCreatePost()

  useEffect(() => {
    if (createPost.isSuccess) {
      setOpen(false)
    }
  }, [createPost.isSuccess])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="secondary" className="border border-border shadow-sm transition-shadow h-9">
          <Plus className="w-4 h-4 mr-2" />
          Add Post
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
        </DialogHeader>
        <CreatePostForm createPost={createPost} />
      </DialogContent>
    </Dialog>
  )
}

