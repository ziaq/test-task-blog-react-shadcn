import { UserResponseDto } from "@/features/profile/dto/user-response.schema"

type ContactsProps = {
  user: UserResponseDto
}

export const Contacts = ({ user }: ContactsProps) => {
  return (
    <ul className="text-sm space-y-1">
      {user.phone && <li>📞 {user.phone}</li>}
      {user.birthDate && (
        <li>
          🎂 {new Date(user.birthDate).toLocaleDateString("ru-RU", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </li>
      )}
    </ul>
  )
}
