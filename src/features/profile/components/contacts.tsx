import type { User } from "../types"

type ContactsProps = {
  user: User
}

export const Contacts = ({ user }: ContactsProps) => {
  return (
    <div className="space-y-1 text-sm text-muted-foreground">
      <p>
        <span className="font-medium text-foreground">Email:</span> {user.email}
      </p>
      <p>
        <span className="font-medium text-foreground">Телефон:</span> {user.phone}
      </p>
    </div>
  )
}