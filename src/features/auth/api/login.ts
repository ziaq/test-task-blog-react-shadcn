import { loginSchema } from "@/features/auth/dto/login.schema"
import { LoginFormValues } from "@/features/auth/schemas/login-form.schema"
import { apiFetch } from "@/lib/api/api-fetch"
import { getFingerprint } from "@/lib/auth/fingerprint"
import { scheduleTokenRefresh } from "@/lib/auth/schedule-token-refresh"
import { accessTokenResponseSchema } from "@/lib/dto/access-token-response.schema"


export async function login(input: LoginFormValues): Promise<string> {
  const fingerprint = await getFingerprint()
  const body = loginSchema.parse({ ...input, fingerprint })

  const response = await apiFetch('/auth/login', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  const accessTokenResponse = accessTokenResponseSchema.parse(response)

  scheduleTokenRefresh()

  return accessTokenResponse.accessToken
}
