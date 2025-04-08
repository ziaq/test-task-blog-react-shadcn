import { apiFetchWithAuth } from '@/shared/api'

import { PostIdParamDto, postIdParamSchema } from '../dto/post-id.param.schema'

export async function deletePost(params: PostIdParamDto): Promise<void> {
  const { id } = postIdParamSchema.parse(params)

  await apiFetchWithAuth(`/posts/${id}`, {
    method: "DELETE",
  })
}
