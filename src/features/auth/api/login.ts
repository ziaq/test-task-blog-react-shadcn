import { getFingerprint } from "@/lib/auth/fingerprint"
import { loginSchema } from "@/features/auth/dto/login.schema"
import { accessTokenResponseSchema } from "@/lib/dto/access-token-response.schema"
import { scheduleTokenRefresh } from "@/lib/auth/schedule-token-refresh"
import { apiFetch } from "@/lib/api/api-fetch"
import { LoginFormValues } from "@/features/auth/schemas/login-form.schema"


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
