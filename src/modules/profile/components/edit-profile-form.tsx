import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { DatePickerField } from '@/shared/components/form'
import { FormError } from '@/shared/components/form'
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from '@/shared/components/ui'

import { UpdateUserDto, updateUserSchema } from '../dto/update-user.schema'
import { UserResponseDto } from '../dto/user-response.schema'
import { useUpdateProfile } from '../hooks/use-update-profile'
import { mapUserToUpdateDto } from '../utils/map-user-to-update-dto'

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
            <DatePickerField field={field} label="Birth date" />
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
