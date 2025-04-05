import type { User } from "../types"

export type UpdateProfileDto = Partial<Omit<User, "id" | "avatar">>

export async function updateProfile(data: UpdateProfileDto): Promise<User> {
  const res = await fetch("/api/profile", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    throw new Error("Ошибка при обновлении профиля")
  }

  return res.json()
}