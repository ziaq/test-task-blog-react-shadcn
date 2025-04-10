import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { FileDropzone } from '@/shared/components/form'
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Spinner,
  Textarea,
} from '@/shared/components/ui'

import { type CreatePostDto,createPostSchema } from '../dto/create-post.schema'
import { useCreatePost } from '../hooks/use-create-post'

type Props = {
  createPost: ReturnType<typeof useCreatePost>['mutate']
  isPending: boolean
  error: ReturnType<typeof useCreatePost>['error']
}

export const CreatePostForm = ({ 
  createPost, 
  isPending, 
  error, 
}: Props) => {
  const [files, setFiles] = useState<File[]>([])

  const form = useForm<CreatePostDto>({
    resolver: zodResolver(createPostSchema),
  })

  const handleDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles)
  }

  const onSubmit = (values: CreatePostDto) => {
    const formData = new FormData()
    formData.append("text", values.text)

    files.forEach((file) => {
      formData.append("file", file)
    })

    createPost(formData)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Post Text</FormLabel>
              <FormControl>
                <Textarea rows={4} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormLabel>Upload up to 10 images</FormLabel>
          <FileDropzone onDrop={handleDrop} maxFiles={10} />

          {files.length > 0 && (
            <ul className="text-sm text-muted-foreground space-y-1 mt-2 pl-2 list-disc">
              {files.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          )}
        </div>

        {error && (
          <p className="text-sm text-red-500 text-center">
            Failed to create post. Please try again.
          </p>
        )}

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? <Spinner size={20} /> : "Publish Post"}
        </Button>
      </form>
    </Form>
  )
}
