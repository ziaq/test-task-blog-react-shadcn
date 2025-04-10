import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode } from "react"

import { useAuthStore } from "../modules/auth"
import { refreshAccessToken } from "../modules/auth/utils/refresh-token"
import { configureApi } from "../shared/api"

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
