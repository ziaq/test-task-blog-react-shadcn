import { useState } from "react"
import { useAuthStore } from "@/store/auth-store"
import { LoginForm } from "@/features/auth/components/login-form"
import { RegisterForm } from "@/features/auth/components/register-form"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"

enum AuthTab {
  Login = "login",
  Register = "register",
}

export const AuthDialog = () => {
  const { accessToken } = useAuthStore();

  const [tab, setTab] = useState<AuthTab>(AuthTab.Login)

  return (
    <Dialog open={!accessToken}>
      <DialogContent className="max-w-md" hideClose>
        <DialogHeader>
          <DialogTitle className="text-center">
            {tab === AuthTab.Login ? "Login to your account" : "Create an account"}
          </DialogTitle>
        </DialogHeader>

        <Tabs value={tab} onValueChange={(value) => setTab(value as AuthTab)}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value={AuthTab.Login}>
            <LoginForm />
          </TabsContent>

          <TabsContent value={AuthTab.Register}>
            <RegisterForm />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
