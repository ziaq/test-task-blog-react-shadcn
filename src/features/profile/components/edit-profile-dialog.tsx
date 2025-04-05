import { useState } from "react"
import type { User } from "../types"

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

import { useUpdateProfile } from "../hooks/use-update-profile"

type EditProfileDialogProps = {
  user: User
}

export const EditProfileDialog = ({ user }: EditProfileDialogProps) => {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<Omit<User, "id" | "avatar">>(extractEditableFields(user))

  const { mutate, isPending } = useUpdateProfile()

  function extractEditableFields(user: User) {
    const { id, avatar, ...rest } = user
    return rest
  }

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    mutate(formData)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Редактировать профиль</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактирование профиля</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="firstName">Имя</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastName">Фамилия</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="birthDate">Дата рождения</Label>
            <Input
              type="date"
              id="birthDate"
              value={formData.birthDate}
              onChange={(e) => handleChange("birthDate", e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Телефон</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="about">О себе</Label>
            <Textarea
              id="about"
              value={formData.about}
              onChange={(e) => handleChange("about", e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending ? "Сохраняем..." : "Сохранить"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
