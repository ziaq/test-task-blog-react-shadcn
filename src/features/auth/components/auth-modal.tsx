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

export const AuthModal = () => {
  const { showAuthModal, closeAuthModal } = useAuthStore.getState();

  const [tab, setTab] = useState<"login" | "register">("login")

  return (
    <Dialog open={showAuthModal} onOpenChange={closeAuthModal}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {tab === "login" ? "Login to your account" : "Create an account"}
          </DialogTitle>
        </DialogHeader>

        <Tabs value={tab} onValueChange={(value) => setTab(value as "login" | "register")}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <LoginForm />
          </TabsContent>

          <TabsContent value="register">
            <RegisterForm />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
