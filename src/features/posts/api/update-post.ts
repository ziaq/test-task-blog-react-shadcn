import { apiFetchWithAuth } from "@/lib/api/api-fetch-with-auth"
import { PostIdParamDto, postIdParamSchema } from "@/features/posts/dto/post-id.param.schema"
import { updatePostSchema, UpdatePostDto } from "@/features/posts/dto/update-post.schema"
import { postResponseSchema, PostResponseDto } from "@/features/posts/dto/post-response.schema"

type UpdatePostApiParams = {
  params: PostIdParamDto
  body: UpdatePostDto
  files?: File[]
}

export async function updatePost(
  input: UpdatePostApiParams
): Promise<PostResponseDto> {
  const { params, body, files } = input;

  const { id } = postIdParamSchema.parse(params)
  const validatedBody = updatePostSchema.parse(body)

  const formData = new FormData()

  if (validatedBody.text) {
    formData.append("text", validatedBody.text)
  }

  if (validatedBody.deleteImageIds) {
    formData.append("deleteImageIds", JSON.stringify(validatedBody.deleteImageIds))
  }

  files?.forEach((file) => formData.append("file", file))

  const response = await apiFetchWithAuth(`/posts/${id}`, {
    method: "PATCH",
    body: formData,
  })

  return postResponseSchema.parse(response)
}
