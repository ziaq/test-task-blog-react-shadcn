import { apiFetchWithAuth } from '@/shared/api'

import { PostResponseDto, postResponseSchema } from '../dto/post-response.schema'

export async function createPost(formData: FormData): Promise<PostResponseDto> {
  const response = await apiFetchWithAuth("/posts/create-post", {
    method: "POST",
    body: formData,
  })

  return postResponseSchema.parse(response)
}
