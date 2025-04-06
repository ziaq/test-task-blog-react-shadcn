import { apiFetchWithAuth } from "@/lib/api/api-fetch-with-auth"
import { PostIdParamDto, postIdParamSchema } from "@/features/posts/dto/post-id.param.schema"

export async function deletePost(params: PostIdParamDto): Promise<void> {
  const { id } = postIdParamSchema.parse(params)

  await apiFetchWithAuth(`/posts/${id}`, {
    method: "DELETE",
  })
}
