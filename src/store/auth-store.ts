import { create } from "zustand"
import { persist } from "zustand/middleware"

type AuthStore = {
  accessToken: string | null
  setAccessToken: (token: string) => void
  deleteAccessToken: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: null,
      setAccessToken: (token) => set({ accessToken: token }),
      deleteAccessToken: () => set({ accessToken: null })
    }),
    {
      name: "auth-store",
    }
  )
)
