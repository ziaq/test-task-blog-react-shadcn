import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import HomePage from "@/pages/home"
import { AuthBootstrap } from "@/features/auth/components/auth-bootstrap"
import { AuthModal } from "@/features/auth/components/auth-modal"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthBootstrap />
      <AuthModal />
      <HomePage />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App