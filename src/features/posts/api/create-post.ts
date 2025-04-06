import { apiFetchWithAuth } from "@/lib/api/api-fetch-with-auth"
import { PostResponseDto, postResponseSchema } from "@/features/posts/dto/post-response.schema"

export async function createPost(formData: FormData): Promise<PostResponseDto> {
  const response = await apiFetchWithAuth("/posts/create-post", {
    method: "POST",
    body: formData,
  })

  return postResponseSchema.parse(response)
}
