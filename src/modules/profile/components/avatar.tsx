import {
  Avatar as UIAvatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui'
import { env } from '@/shared/config/env'

type AvatarProps = {
  fileName: string
  fallback: string
}

export const Avatar = ({ fileName, fallback }: AvatarProps) => {
   const imageUrl = `${env.VITE_API_URL}/uploads/avatars/${fileName}`

  return (
    <UIAvatar className="w-32 h-32">
      <AvatarImage src={imageUrl} alt="Аватар пользователя" className="object-cover" />
      <AvatarFallback>{fallback}</AvatarFallback>
    </UIAvatar>
  )
}
