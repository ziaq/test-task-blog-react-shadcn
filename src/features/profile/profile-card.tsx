import { useGetProfileQuery } from "./hooks/use-get-profile-query"
import { Avatar } from "./components/avatar"
import { Info } from "./components/info"
import { Contacts } from "./components/contacts"
import { EditProfileDialog } from "./components/edit-profile-dialog"

import { Card, CardContent, CardHeader } from "@/components/ui/card"

export const ProfileCard = () => {
  const { data: user, isLoading, error } = useGetProfileQuery()

  if (isLoading) return <div className="text-center mt-4">Загрузка...</div>
  if (error || !user) return <div className="text-center mt-4 text-red-500">Ошибка загрузки профиля</div>

  return (
    <Card className="max-w-2xl mx-auto mt-6">
      <CardHeader className="flex items-center gap-4">
        <Avatar fileName={user.avatar ?? ''} fallback={user.firstName[0] + user.lastName[0]} />
        <Info user={user} />
      </CardHeader>
      <CardContent>
        <p className="mb-4">{user.about}</p>
        <Contacts user={user} />
        <div className="mt-4">
          <EditProfileDialog user={user} />
        </div>
      </CardContent>
    </Card>
  )
}
