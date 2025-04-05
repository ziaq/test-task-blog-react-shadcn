import { apiFetch } from "@/lib/api/api-fetch"

export async function logout(): Promise<void> {
  await apiFetch<string>("/api/auth/logout", {
    method: "POST",
    withCredentials: true,
  })
}