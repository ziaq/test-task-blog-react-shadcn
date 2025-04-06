import { useForm } from "react-hook-form"

import { DatePickerField } from "@/components/form/date-picker-field"
import { FormError } from "@/components/form/form-error"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RegisterDto,registerSchema } from "@/features/auth/dto/register.schema"
import { useRegister } from "@/features/auth/hooks/use-register"
import { zodResolver } from "@hookform/resolvers/zod"

export const RegisterForm = () => {
  const form = useForm<RegisterDto>({
    resolver: zodResolver(registerSchema),
  })

  const { mutate: register, isPending, isSuccess, error } = useRegister()

  const onSubmit = (data: RegisterDto) => {
    register(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                First name<span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Last name<span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email<span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Password<span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
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
              <FormControl>
                <Input {...field} />
              </FormControl>
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
              <FormControl>
              <Textarea {...field} rows={2} />
              </FormControl>
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
        {isSuccess && (
          <p className="text-sm text-green-600 text-center">
            Account created successfully! You can now log in
          </p>
        )}

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Creating account..." : "Register"}
        </Button>
      </form>
    </Form>
  )
}
