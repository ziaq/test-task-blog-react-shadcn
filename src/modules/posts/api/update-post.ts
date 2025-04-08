import { apiFetchWithAuth } from '@/shared/api'

import { PostIdParamDto, postIdParamSchema } from '../dto/post-id.param.schema'
import { PostResponseDto, postResponseSchema } from '../dto/post-response.schema'
import { UpdatePostDto, updatePostSchema } from '../dto/update-post.schema'

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
