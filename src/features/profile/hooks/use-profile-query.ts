import { useQuery } from "@tanstack/react-query"
import { fetchUserProfile } from "../api/profile-api"
import { User } from "../types"

export function useProfileQuery() {
  return useQuery<User>({
    queryKey: ["profile"],
    queryFn: fetchUserProfile,
  })
}