import { useState } from "react"
import { Pencil } from "lucide-react" 
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { EditProfileForm } from "@/features/profile/components/edit-profile-form"
import { UserResponseDto } from "@/features/profile/dto/user-response.schema"

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
