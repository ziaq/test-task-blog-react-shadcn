import { useQuery } from "@tanstack/react-query"

import { getProfile } from "../api/get-profile"
import { PROFILE_QUERY_KEY } from "../constants/query-keys"

export function useGetProfileQuery() {
  return useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: getProfile,
  })
}
