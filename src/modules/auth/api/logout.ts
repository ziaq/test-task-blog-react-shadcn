import { apiFetch } from "@/shared/api"

export async function logout(): Promise<void> {
  await apiFetch('/auth/logout', {
    method: "POST",
    withCredentials: true,
  })
}
