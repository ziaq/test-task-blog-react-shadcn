import type { User } from "../types"

type InfoProps = {
  user: User
}

export const Info = ({ user }: InfoProps) => {
  return (
    <div>
      <h2 className="text-lg font-semibold">
        {user.firstName} {user.lastName}
      </h2>
      <p className="text-sm text-muted-foreground">
        Дата рождения: {user.birthDate}
      </p>
    </div>
  )
}