import { AuthDialog } from "@/modules/auth"
import HomePage from "@/pages/home"

import { AppProviders } from "./providers"

const App = () => {
  return (
    <AppProviders>
      <AuthDialog />
      <HomePage />
    </AppProviders>
  )
}

export default App