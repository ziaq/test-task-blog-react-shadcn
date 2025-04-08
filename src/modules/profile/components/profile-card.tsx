import { AlertCircle } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/shared/components/ui/alert'
import { Card, CardContent, CardHeader } from '@/shared/components/ui/card'
import { Spinner } from '@/shared/components/ui/spinner'

import { Avatar } from '../components/avatar'
import { Contacts } from '../components/contacts'
import { EditProfileDialog } from '../components/edit-profile-dialog'
import { Info } from '../components/info'
import { UploadAvatarDialog } from '../components/upload-avatar-dialog'
import { useGetProfileQuery } from '../hooks/use-get-profile-query'

export const ProfileCard = () => {
  const { data: user, isLoading, error } = useGetProfileQuery()

  if (isLoading || !user) {
    return (
      <div className="flex justify-center items-center h-[200px]">
        <Spinner size={32} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-6">
        <Alert variant="destructive">
          <AlertCircle className="h-5 w-5" />
          <AlertTitle>Ошибка</AlertTitle>
          <AlertDescription>
            Не удалось загрузить профиль. Попробуйте позже.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <Card className="max-w-2xl w-full mx-auto mt-6">
      <CardHeader className="flex items-center gap-4">
        <Avatar
          fileName={user.avatar ?? ""}
          fallback={user.firstName[0] + user.lastName[0]}
        />
        <Info user={user} />
      </CardHeader>
      <div className="ml-2 flex flex-col gap-2 w-[140px]">
        <UploadAvatarDialog />
        <EditProfileDialog user={user} />
      </div>
      <CardContent className="space-y-4">
        {user.about && (
          <p className="text-muted-foreground whitespace-pre-wrap">
            {user.about}
          </p>
        )}
        <Contacts user={user} />
      </CardContent>
    </Card>
  )
}
