import { useState, useMemo } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  updatePostSchema,
  UpdatePostDto,
} from "@/features/posts/dto/update-post.schema"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import { FileDropzone } from "@/components/form/file-dropzone"
import { PostResponseDto } from "@/features/posts/dto/post-response.schema"
import { useUpdatePost } from "@/features/posts/hooks/use-update-post"
import { env } from "@/lib/env"
import { X } from "lucide-react"

type EditPostFormProps = {
  post: PostResponseDto
  updatePost: ReturnType<typeof useUpdatePost>
}

export const EditPostForm = ({ post, updatePost }: EditPostFormProps) => {
  const [files, setFiles] = useState<File[]>([])
  const [deleteImageIds, setDeleteImageIds] = useState<number[]>([])

  const { mutate, isPending, error } = updatePost

  const form = useForm<UpdatePostDto>({
    resolver: zodResolver(updatePostSchema),
    defaultValues: {
      text: post.text,
    },
  })

  const remainingImages = useMemo(
    () => post.images.filter((img) => !deleteImageIds.includes(img.id)),
    [post.images, deleteImageIds]
  )

  const totalImagesCount = remainingImages.length + files.length
  const canUploadMore = totalImagesCount < 10

  const handleDrop = (acceptedFiles: File[]) => {
    if (!canUploadMore) return
    const availableSlots = 10 - remainingImages.length
    setFiles(acceptedFiles.slice(0, availableSlots))
  }

  const handleRemoveImage = (imageId: number) => {
    setDeleteImageIds((prev) => [...prev, imageId])
  }

  const onSubmit = (values: UpdatePostDto) => {
    mutate({
      params: { id: post.id },
      body: {
        ...values,
        deleteImageIds: deleteImageIds.length ? deleteImageIds : undefined,
      },
      files,
    })
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
          <FormLabel>Current Images</FormLabel>
          <div className="grid grid-cols-5 gap-2">
            {remainingImages.map((img) => (
              <div key={img.id} className="relative">
                <img
                  src={`${env.VITE_API_URL}/uploads/post-images/${img.filename}`}
                  alt="post"
                  className="w-full aspect-square object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(img.id)}
                  className="absolute top-0.5 right-0.5 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <FormLabel>Upload up to 10 images</FormLabel>
          <FileDropzone onDrop={handleDrop} maxFiles={10 - remainingImages.length} />
          {files.length > 0 && (
            <ul className="text-sm text-muted-foreground mt-2 pl-2 list-disc space-y-1">
              {files.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          )}
        </div>

        {error && (
          <p className="text-sm text-red-500 text-center">
            Failed to update post. Please try again.
          </p>
        )}

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? <Spinner size={20} /> : "Update Post"}
        </Button>
      </form>
    </Form>
  )
}
