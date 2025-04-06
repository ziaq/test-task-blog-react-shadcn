import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { updateUserSchema, UpdateUserDto } from "@/features/profile/dto/update-user.schema"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { DatePickerField } from "@/components/form/date-picker-field"
import { useUpdateProfile } from "../hooks/use-update-profile"
import { useState } from "react"
import { FormError } from "@/components/form/form-error"
import { UserResponseDto } from "@/features/profile/dto/user-response.schema"
import { mapUserToUpdateDto } from "@/features/profile/utils/map-user-to-update-dto"

type EditProfileFormProps = {
  actualUserData: UserResponseDto
}

export const EditProfileForm = ({ actualUserData }: EditProfileFormProps) => {
  const form = useForm<UpdateUserDto>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: mapUserToUpdateDto(actualUserData)
  })

  const [isUpdated, setIsUpdated] = useState(false)

  const { mutate: update, isPending, error } = useUpdateProfile()

  const onSubmit = (values: UpdateUserDto) => {
    update(values, {
      onSuccess: () => setIsUpdated(true),
    })
  }

  if (isUpdated) {
    return (
      <p className="font-semibold text-center">
        ✅ Profile updated successfully. You can close this window
      </p>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl><Input type="email" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <DatePickerField field={field} label="Birth date" disabledFuture />
          )}
        />
        <FormField
          control={form.control}
          name="about"
          render={({ field }) => (
            <FormItem>
              <FormLabel>About</FormLabel>
              <FormControl><Textarea rows={2} {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormError
          error={error}
          statusMessages={{
            409: "Email is already in use",
          }}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Saving..." : "Save changes"}
        </Button>
      </form>
    </Form>
  )
}
