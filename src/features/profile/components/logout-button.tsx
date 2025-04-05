import { Button } from "@/components/ui/button"
import { useLogout } from "@/features/auth/hooks/use-logout"

export const LogoutButton = () => {
  const { mutate: logout, isPending } = useLogout()

  return (
    <Button variant="destructive" onClick={() => logout()} disabled={isPending}>
      {isPending ? "Logging out..." : "Logout"}
    </Button>
  )
}
