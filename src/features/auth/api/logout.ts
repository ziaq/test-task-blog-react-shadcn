import { apiFetch } from "@/lib/api/api-fetch"

export async function logout(): Promise<void> {
  await apiFetch('/auth/logout', {
    method: "POST",
    withCredentials: true,
  })
}