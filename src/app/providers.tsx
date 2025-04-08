import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode } from "react"


import { configureApi } from "../shared/api"
import { useAuthStore } from "../modules/auth"
import { refreshAccessToken } from "../modules/auth/utils/refresh-token"

const queryClient = new QueryClient()

type AppProvidersProps = {
  children: ReactNode
}

configureApi({
  getAccessToken: () => useAuthStore.getState().accessToken,
  refreshToken: refreshAccessToken,
});

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
