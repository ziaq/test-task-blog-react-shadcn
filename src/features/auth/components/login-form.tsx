import { useForm } from "react-hook-form"

import { loginFormSchema, LoginFormValues } from "../schemas/login-form.schema"

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
import { useLogin } from "@/features/auth/hooks/use-login"
import { zodResolver } from "@hookform/resolvers/zod"

export const LoginForm = () => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
  })

  const { mutate: login, isPending, error } = useLogin()

  const onSubmit = (data: LoginFormValues) => {
    login(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

        <FormError
          error={error}
          statusMessages={{
            401: "Invalid credentials",
          }}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Logging in..." : "Login"}
        </Button>
      </form>
    </Form>
  )
}
