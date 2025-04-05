import { User } from "../types"

export async function fetchUserProfile(): Promise<User> {
  const response = await fetch("/api/profile", {
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error("Failed to fetch profile")
  }

  return response.json()
}