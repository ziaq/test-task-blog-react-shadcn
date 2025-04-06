import { UserResponseDto } from "@/features/profile/dto/user-response.schema"

type InfoProps = {
  user: UserResponseDto
}

export const Info = ({ user }: InfoProps) => {
  return (
    <div className="ml-2">
      <h2 className="text-xl font-semibold">
        {user.firstName} {user.lastName}
      </h2>
      <p className="text-muted-foreground text-sm">{user.email}</p>
    </div>
  )
}
