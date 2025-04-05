import { create } from "zustand"
import { persist } from "zustand/middleware"

type AuthStore = {
  accessToken: string | null
  showAuthModal: boolean
  setAccessToken: (token: string) => void
  clear: () => void
  openAuthModal: () => void
  closeAuthModal: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: null,
      showAuthModal: false,
      setAccessToken: (token) => set({ accessToken: token }),
      clear: () => set({ accessToken: null }),
      openAuthModal: () => set({ showAuthModal: true }),
      closeAuthModal: () => set({ showAuthModal: false }),
    }),
    {
      name: "auth-store",
    }
  )
)
