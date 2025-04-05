import {
  Avatar as UIAvatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar"

type AvatarProps = {
  fileName: string
  fallback: string
}

export const Avatar = ({ fileName, fallback }: AvatarProps) => {
  return (
    <UIAvatar className="w-16 h-16">
      <AvatarImage src={`/uploads/avatars/${fileName}`} alt="Аватар пользователя" />
      <AvatarFallback>{fallback}</AvatarFallback>
    </UIAvatar>
  )
}
