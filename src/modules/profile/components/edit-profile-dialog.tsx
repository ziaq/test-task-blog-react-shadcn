import { Pencil } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/shared/components/ui'
import { Dialog, DialogContent, DialogTrigger } from '@/shared/components/ui'

import { EditProfileForm } from '../components/edit-profile-form'
import { UserResponseDto } from '../dto/user-response.schema'

type Props = {
  user: UserResponseDto
}

export const EditProfileDialog = ({ user }: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-xs" size="sm">
          <Pencil className="mr-2 h-4" />
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent>
        <EditProfileForm actualUserData={user} />
      </DialogContent>
    </Dialog>
  )
}
