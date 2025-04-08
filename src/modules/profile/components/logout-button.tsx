import { useLogout } from '@/modules/auth'
import { Button } from '@/shared/components/ui'

export const LogoutButton = () => {
  const { mutate: logout, isPending } = useLogout()

  return (
    <Button variant="destructive" onClick={() => logout()} disabled={isPending}>
      {isPending ? "Logging out..." : "Logout"}
    </Button>
  )
}
