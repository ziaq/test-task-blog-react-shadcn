import { updateProfile } from "../api/update-profile"
import { PROFILE_QUERY_KEY } from "../constants/query-keys"

import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useUpdateProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY })
    },
  })
}
