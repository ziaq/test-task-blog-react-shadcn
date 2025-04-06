import { getProfile } from "../api/get-profile"
import { PROFILE_QUERY_KEY } from "../constants/query-keys"

import { useQuery } from "@tanstack/react-query"

export function useGetProfileQuery() {
  return useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: getProfile,
  })
}
