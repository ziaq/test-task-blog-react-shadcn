import {
  Avatar as UIAvatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar"
import { env } from "@/lib/env"

type AvatarProps = {
  fileName: string
  fallback: string
}

export const Avatar = ({ fileName, fallback }: AvatarProps) => {
   const imageUrl = `${env.VITE_API_URL}/uploads/avatars/${fileName}`

  return (
    <UIAvatar className="w-32 h-32">
      <AvatarImage src={imageUrl} alt="Аватар пользователя" />
      <AvatarFallback>{fallback}</AvatarFallback>
    </UIAvatar>
  )
}
